define([
    'jquery',
    'underscore',
    'backbone',
    'text!templates/user/item.html'
], function ($, _, Backbone, userItemTemplate) {

    return Backbone.View.extend({

        // Class name.
        tagName: 'li',

        // Cache the template function for a single item.
        template: _.template(userItemTemplate),

        /**
         * Constructor.
         *
         * @return {[type]} [description]
         */
        initialize: function (model) {
            _.bindAll(this, 'render');

            this.user = model.user;
            this.id = model.user.id;
            this.index = model.index;
        },

        /**
         * This allows to render the template with the respective data.
         *
         * @param {String} name The name
         */
        render: function () {

            var el = $(this.el);

            el.attr('data-index', this.id);

            if ((this.index % 2) === 0 ) {
                el.addClass('even');
            }
            el.append(this.template(this.user));

            return this;
        }
    });

});