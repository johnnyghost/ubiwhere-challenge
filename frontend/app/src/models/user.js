define([
    'underscore',
    'backbone'
], function (_, Backbone) {

    return Backbone.Model.extend({

        /**
         * Contructor.
         */
        initialize: function () {},

        /**
         * Builds the url root.
         *
         * @return {String} The complete url
         */
        urlRoot: '',

        // Default attributes for the package.
        defaults: {
            username: ''
        }
    });
});