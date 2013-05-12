require.config({
	paths: {
		"jquery": "../vendor/jquery/jquery",
		"underscore": "../vendor/underscore-amd/underscore",
		"backbone": "../vendor/backbone-amd/backbone",
		"text": "../vendor/requirejs-text/text",
		"templates": '../assets/templates'
	},
	urlArgs: 'bust=' + (+new Date())
});

require(['application'], function (App) {
    App.initialize();
});