define([
    'underscore',
    'backbone',
    'models/user'
], function (_, Backbone, User) {

    return  Backbone.Collection.extend({

        // Reference to this collection's model.
        model: User,

        /**
         * Constructor.
         */
        initialize: function () {},

        /**
         * Builds the url.
         * The property title is for the cases that the resource needs do delete or update.
         *
         * @return {String} The complete url
         */
        url: 'http://api-ubiwhere-challenge.hp.af.cm/users',

        /**
         * Is the method that is called by Backbone
         * whenever a collection's models are returned by the server.
         *
         * @param  {Object} response Raw object response
         *
         * @return {Object}
         */
        parse: function (response) {

            return response;
        },

        /**
         * Is the function that Backbone calls every time it attempts to read or save a model to the server.
         *
         * @param  {String} method  The CRUD method ("create", "read", "update", or "delete")
         * @param  {Object} model   The model to be saved (or collection to be read)
         * @param  {Object} options Success and error callbacks, and all other jQuery request options
         * @return {Object}
         */
        sync: function (method, model, options) {

            options.timeout = 10000;
            options.dataType = "json";

            if ('POST' === options.type) {
                options.contentType = 'application/x-www-form-urlencoded';
            }

            return Backbone.sync(method, model, options);
        },

        /**
         * Get the all users.
         *
         */
        getUsers: function () {

            var self = this;

            this.fetch({
                url: this.url + '.json',
                cache: false,
                success: function (users, response) {
                    if(response.data) {
                        self.trigger('getUsers:fetch_success', response.data);
                    }
                },

                error: function (users, response) {

                    self.trigger('response:fetch_error', {
                        status: response.status,
                        statusText: response.statusText,
                        'collection': 'users'
                    });
                }
            });
        },

        /**
         * Save a user.
         *
         * @param {String} username The user name to be saved
         */
        saveUser: function (username) {
            var self = this;
            this.fetch({
                data: { username: username },
                type: 'POST',

                // Success callback
                success: function () {
                    self.trigger('response:fetch_success');
                },

                // Error callback
                error: function (users, response) {
                    self.trigger('response:fetch_error', {
                        status: response.status,
                        statusText: response.statusText,
                        'collection': 'users'
                    });
                }
            });
        },

        /**
         * Delete a user.
         *
         * @param {String} user_id The user to delete
         */
        deleteUser: function (user_id) {

            var self = this;

            this.fetch({
                type: 'DELETE',
                url: this.url + '/' + user_id + '.json' ,

                // Success callback
                success: function () {
                    self.trigger('response:fetch_success');
                },

                // Error callback
                error: function (users, response) {
                    self.trigger('response:fetch_error', {
                        status: response.status,
                        statusText: response.statusText,
                        'collection': 'users'
                    });
                }
            });
        }
    });

});
