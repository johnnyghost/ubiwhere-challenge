define([
    'jquery',
    'underscore',
    'backbone',
    'collections/userCollection',
    'views/item',
    'text!templates/user/list.html'
], function ($, _, Backbone, UserCollection, UserItemView, listTemplate) {

    return Backbone.View.extend({

        // Element
        el: $('#container'),

        // Template
        userTemplate : _.template(listTemplate),

        //Events
        events: {
            'click .users .remove-btn': '_removeButtonClick',
            'mouseenter .users .remove-btn': '_buttonHover',
            'mouseout .users .remove-btn': '_buttonOut',
            'click .header .add-btn': '_addButtonClick',
            'mouseenter .header .add-btn': '_buttonHover',
            'mouseout .header .add-btn': '_buttonOut',

        },

        /**
         * Constructor.
         *
         * @param  {Element} container A container where to append the view
         */
        initialize: function(container) {

            _.bindAll(this, 'render', '_buildUserItem', '_addButtonClick');

            this.$el.html(this.userTemplate);

            // Instantiate the project collection and bind the success and the error
            if (!this.userCollection) {

                this.userCollection = new UserCollection();
                // this.userCollection.getUsers();

                this.userCollection.bind('getUsers:fetch_success', this._buildUserItem);
                this.userCollection.bind('response:fetch_success', this.render);
                this.userCollection.bind('response:fetch_error', this._fireErrorNotification);
            }
        },

        /**
         * This render the template with the respective data.
         */
        render: function () {

            this.userCollection.getUsers();

            return this;
        },

        /**
         * Parse the users and render an item.
         *
         * @param {object} userse The users collection
         */
        _buildUserItem: function (users) {

            var usersEl = $(this.el).find('.users'),
                users = users.users
                i = 0;

            if (users.length > 0) {

                // Empty the container
                usersEl.empty();

                for (var i = users.length - 1; i >= 0; i--) {
                    usersEl.append(new UserItemView({
                        user: users[i],
                        index: i
                    }).render().el);
                };
            } else {
                this._inputActive();
            }
        },

        /**
         * Click event for the remove button.
         *
         * @param  {Object} event The event
         */
        _removeButtonClick: function(event) {

            var removeEl = $(event.target),
                liEl = removeEl.closest('li'),
                id = liEl.attr('data-index'),
                that = this;

            liEl.find('.user .name').html('Deleting').css('color', 'white');
            liEl.find('.user .avatar').hide();

            liEl.css({'background-color': '#E74C3C'}, 300)
                .delay(1000)
                .animate({
                    'height': '0',
                    'padding-top': '0',
                    'padding-bottom': '0'
                }, 50, function () {
                that.userCollection.deleteUser(id);
            })

            removeEl.hide();
        },

        /**
         * Mouse enter event for the remove button.
         *
         * @param  {Object} event The event
         */
        _buttonHover: function(event) {

            $(event.target).addClass('hover');
        },

        /**
         * Mouse out event for the remove button.
         *
         * @param  {Object} event The event
         */
        _buttonOut: function(event) {

            $(event.target).removeClass('hover');
        },

        /**
         * Mouse click event for the add button.
         *
         * @param  {Object} event The event
         */
        _addButtonClick: function (event) {

            var addEl = $(event.target),
                insertEl = addEl.closest('#container').find('.insert-user'),
                inputEl = insertEl.find('.add-input'),
                that = this;

            if (!inputEl.hasClass('active')) {
                this._inputActive();
            } else {

                insertEl.animate({'margin-top': '-55px'}, 200);
                inputEl.removeClass('active');
                inputEl.off('keypress');
            }
        },

        /**
         * Activate the input.
         *
         */
        _inputActive: function () {

            var insertEl = this.$el.find('.insert-user'),
                inputEl = insertEl.find('.add-input'),
                that = this;

            inputEl.focus();

            inputEl.on('keypress', function (event) {
                if(event.which === 13) {
                    var name = $(this).val();
                    that.userCollection.saveUser(name);
                    insertEl.animate({'margin-top': '-55px'}, 200);
                    inputEl.val('');
                    inputEl.removeClass('active');
                    inputEl.off('keypress');
                }
            })

            insertEl.animate({'margin-top': 0}, 300);
            inputEl.addClass('active');
        }
    });

});

