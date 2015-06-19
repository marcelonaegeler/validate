var config = {paths: {}, shim: {}};
  
config.paths = {
  jquery: '../vendor/jquery/jquery.min'
  , migrate: '../vendor/jquery-migrate/jquery-migrate.min'
  , validation: '../vendor/jquery-validation/dist/jquery.validate.min'
  , additionalMethods: '../vendor/jquery-validation/dist/jquery.validate.min'
  , maskedInput: '../vendor/jquery.maskedinput/dist/jquery.maskedinput.min'
  , maskMoney: '../vendor/jquery-maskmoney/dist/jquery.maskMoney.min'
}

config.shim = {
  jquery: {
    exports: '$'
  }
  , migrate: {
    deps: [
      'jquery'
    ]
  }
  , validation: {
  	deps: [
      'jquery'
      , 'migrate'
    ]
  }
  , additionalMethods: {
    deps: [
      'jquery'
      , 'validation'
    ]
  }
  , maskedInput: {
  	deps: [
      'jquery'
      , 'migrate'
    ]
  }
  , maskMoney: {
    deps: [
      'jquery'
    ]
  }
};

// Set config
require.config(config);

// Get the required modules from body's 'data-require'
var modules = document.getElementsByTagName('body')[0].dataset.require.split(',');
var requireModules = [];
for(var module in modules) {
	requireModules.push(modules[module].trim());
}

require(requireModules);