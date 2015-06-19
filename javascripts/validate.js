define(
	'validate'
	, [
  	'validation'
		, 'maskedInput'
		, 'maskMoney'
  ]
  , function() {
    extendValidate();
    
    var elemento = document.createElement('input'); 
    if(!('placeholder' in elemento))
      placeholderFallback();

    var forms = document.getElementsByTagName('form');
    for(var form in forms) {
      if((!parseInt(form) && parseInt(form) != 0) || forms[form].dataset.validate != 'true')
        continue;

      var config = {}
        , rules = {}
        , messages = {}
        ;

      // Error classes for bootstrap
      config.highlight = function(element) {
        $(element).parent().addClass('has-error');
      };
      config.unhighlight = function(element) {
        $(element).parent().removeClass('has-error');
      };
      // Remove HTML5 validation
      forms[form].setAttribute('novalidate', 'true');
      // Add submit function
      if(forms[form].dataset.submit) {
        config.submitHandler = eval(forms[form].dataset.submit);
      }
      // Build the rules based on the HTML elements
      for(var element in forms[form].elements) {
        if(!parseInt(element) && parseInt(element) != 0)
          continue;

        var element = forms[form].elements[element];
        var rule = {};
        
        // Search the required attribute, if exists
        for(var attribute in element.attributes) {
          if(!parseInt(attribute) && parseInt(attribute) != 0)
            continue;

          var attribute = element.attributes[attribute];
          if(attribute.name == 'required') {
            rule[attribute.name] = true;
          }
        }

        var dataset = element.dataset;
        for(var data in dataset) {
          
          if(data == 'email' || data == 'cpf' || data == 'cnpj' || data == 'equalTo')
            rule[data] = dataset[data];
          
          else if(data == 'remote')
            rule[data] = eval(dataset[data]);

          else if(data == 'mask')
            mask(element, dataset[data]);

          else if(data == 'money')
            maskMoney(element);
        }

        rules[element.name] = rule;
      }

      for(var key in rules) {
        messages[key] = {};
        for(var attr in rules[key]) {
          messages[key][attr] = window.formMessages[attr];
        }
      }

      config.rules = rules;
      config.messages = messages;
      
      $(forms[form]).validate(config);

    }
  }
);

/*
* Validation Additional method for CPF
*/
function extendValidate() {
  $.validator.addMethod("cpf", function (value, element) {
    value = $.trim(value);

    cpf = value.replace('.', '').replace('.', '').replace('-', '');

    while (cpf.length < 11) cpf = "0" + cpf;
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    for (i = 0; i < 11; i++) {
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11 - x }
    b = 0;
    c = 11;
    for (y = 0; y < 10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11 - x; }
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return this.optional(element) || false;
    return this.optional(element) || true;
  }, "Informe um CPF válido.");

  $.validator.addMethod("cnpj", function (cnpj, element) {
    cnpj = $.trim(cnpj);
 
    // DEIXA APENAS OS NÚMEROS
    cnpj = cnpj.replace('/', '').replace('.', '').replace('.', '').replace('-', '');
 
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
 
    if (cnpj.length < 14 && cnpj.length < 15)
      return this.optional(element) || false;
    for (i = 0; i < cnpj.length - 1; i++) {
      if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
        digitos_iguais = 0;
        break;
      }
    }
 
    if (!digitos_iguais) {
      tamanho = cnpj.length - 2
      numeros = cnpj.substring(0, tamanho);
      digitos = cnpj.substring(tamanho);
      soma = 0;
      pos = tamanho - 7;

      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0))
        return this.optional(element) || false;

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
          pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1))
        return this.optional(element) || false;

      return this.optional(element) || true;
    } else
      return this.optional(element) || false;
  }, "Informe um CNPJ válido.");
}

/*
* jQuery maskedinput
*/
function mask(el, strMask) {
  if(strMask == 'phone') {
    $(el).focusout(function(){
      var phone, element;
      element = $(this);
      element.unmask();
      phone = element.val().replace(/\D/g, '');
      if(phone.length > 10) {
          element.mask("(99) 99999-999?9");
      } else {
          element.mask("(99) 9999-9999?9");
      }
    }).trigger('focusout');
  } else {
    $(el)
      .unmask()
      .mask(strMask);
  }
}

/*
* jQuery MaskMoney
*/
function maskMoney(element) {
  $(element).maskMoney({
    thousands: '.'
    , decimal: ','
    , precision: 2
  });
}

/*
* Placeholder fallback for browser like IE
*/
function placeholderFallback() {
  $('[placeholder]').each(function() {
    var text = this.getAttribute('placeholder');
    this.setAttribute('placeholder', '');

    if(!this.value)
      this.value = text;

    this.addEventListener('focus', function() {
      if(this.value && this.value == text)
        this.value = '';
    });
    this.addEventListener('focusout', function() {
      if(!this.value)
        this.value = text;
    });
  });
}

/*
* Error messages - Support languages?
*/
var invalidMessages = {
  pt_br: {
    required: "Campo obrigatório."
    , email: "Email inválido."
    , equalTo: "Os campos devem ser iguais."
    , cpf: 'CPF inválido.'
    , cnpj: 'CNPJ inválido.'
    , remote: 'Usuário não encontrado.'
  }
  , en_us: {
    required: "Required fields."
    , email: "Invalid email."
    , equalTo: "The fields must be equals."
    , cpf: 'Invalid CPF.'
    , cnpj: 'Invalid CNPJ.'
    , remote: 'User not found.'
  }
};

var setLang = typeof LANG != 'undefined' ? LANG : 'pt_br';

window.formMessages = {
  required: invalidMessages[setLang].required
  , email: invalidMessages[setLang].email
  , equalTo: invalidMessages[setLang].equalTo
  , cpf: invalidMessages[setLang].cpf
  , remote: invalidMessages[setLang].remote
};