# Validate.js - The fast way

This is an example of an easy way to validate forms with JavaScript writing HTML data attributes. This code use [RequireJS](http://requirejs.org), [jQuery validate library](http://jqueryvalidation.org/), [MaskedInput plugin](http://digitalbush.com/projects/masked-input-plugin/) and the [MaskMoney plugin](https://github.com/plentz/jquery-maskmoney). It also has a placeholder fallback for Internet Explorer.

This code works as a RequireJS module as seen in [usage](#usage).

## Requirements
These are the basic requirements for your application:
* ```Git```
* ```bower v1.3+```
* ```node v0.10+```

Note: The JS dependencies, like RequireJS and jQuery, will be installed with bower.

## Install && Run
0. Clone the source from github: 

        git clone https://github.com/marcelonaegeler/validate.git
        
0. Go to `validate`:

		cd validate
		
0. Download dependencies by bower:

		bower install
		
0. Install the node http-server:

		npm i http-server -g
		
0. Start node server:

		http-server

0. Open the browser and go to localhost:

		127.0.0.1:8080

## Usage
0. If you use RequireJS for modular applications, you can set an attribute in body and get it int the `main.js` file:
		
		`<body data-require="validate">`

0. Include the RequireJS file in the end of the HTML file, calling the `main.js`:
		
		<script data-main="javascripts/main.js" src="vendor/requirejs/require.js"></script>

0. Add the datasets (`data-*`) and required attribute in your HTML fields ([Available attributes and datasets](#available-attributes-and-datasets)):
		
		<input type="text" name="email" id="email" required data-email="true" >

## Available attributes and datasets
The following attributes and datasets can be used in your code:

0. Attributes:

		required: [Optional] Set the field as required.


0. Datasets (Set in the `form` tag):

		data-validate="true": [Required] Turn the validation on (true) or off (false or don't set it) in this form;

		data-submit="function": [Optional] Submit handler, when the form is sucessfully validated, this function is called (can be used to send your form via AJAX);


0. Datasets (These are all optional. Set in the tags inside the form, like `input`, `select`...):

		data-email="true": Validate email;

		data-cpf="true": Validate CPF;

		data-cnpj="true": Validate CNPJ;

		data-remote="object": Do a request (AJAX) with the info in the "object" to validate in a external file;

		data-equal-to="#element": Make this field equal to the one passed in "#id";

		data-money="true": Set a money mask in this input;

		data-mask="mask": Set a mask in this input. Ex.: "mask" can be "phone" for phone masks, "99/99/9999" for dates. See [Masked input](http://digitalbush.com/projects/masked-input-plugin/).


## Todos
* Include `data-message` attribute for custom messages.


***
		
Made with love by [Marcelo A Naegeler](https://twitter.com/marcelonaegeler)!