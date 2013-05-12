// Application Controller
define([
    'jquery',
    'underscore',
    'backbone',
    'views/user'
], function ($, _, Backbone, UserView) {

    var AppRouter = Backbone.Router.extend({

        /**
         * Object with the all the routes for the user.
         *
         * @type {Object}
         */
        routes: {

            ""   : "homeAction",
            "*actions" : "defaultAction"
        },


        /**
         * Executes the home action.
         */
        homeAction: function (user) {

            var userView = new UserView();

            userView.render();
        },

        /**
         * Executes the default action.
         * This is executed when is not a known route.
         *
         * @param  {String} actions The name of the action
         */
        defaultAction: function (actions) {
            console.warn('Don´t exist no route with the name:', actions);
        }
    }),


    /**
     * Constructor.
     */
    initialize = function () {
        var app_router = new AppRouter();

        Backbone.history.start();
        Backbone.emulateJSON = true;
        Backbone.emulateHTTP = true;
    };

    return {
        initialize: initialize
    };
});
