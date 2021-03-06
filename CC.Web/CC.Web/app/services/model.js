﻿(function () {
    'use strict';

    var serviceId = 'model';

    // TODO: replace app with your module name
    angular.module('app').factory(serviceId, model);

    function model() {
        // Define the functions and properties to reveal.
        var service = {
            configureMetadataStore: configureMetadataStore
        };

        return service;

        function configureMetadataStore(metadataStore) {
            //TODO: register session (model) - tags
            //TODO: register person - fullname
            //TODO: register timeslot - name
            registerPerson(metadataStore);
            registerSession(metadataStore);
            registerTimeSlot(metadataStore);
            
        }

        //#region Internal Methods

        function registerPerson(metadataStore) {
            metadataStore.registerEntityTypeCtor('Person', Person);

            function Person() { }

            Object.defineProperty(Person.prototype, 'fullName', {
                get: function () {
                    var fn = this.firstName;
                    var ln = this.lastName;
                    return ln ? fn + ' ' + ln : fn;
                }
            });
        }

        function registerSession(metadataStore) {
            metadataStore.registerEntityTypeCtor('Session', Session);

            function Session() { }

            Object.defineProperty(Session.prototype, 'tagsFormatted', {
                get: function () {
                    return this.tags ? this.tags.replace(/\|/g, ', ') : this.tags;
                },
                set: function(value) {
                    this.tags = value.replace(/\, /g, '|');
                }
            });
        }

        function registerTimeSlot(metadataStore) {
            metadataStore.registerEntityTypeCtor('TimeSlot', TimeSlot);

            function TimeSlot() { }

            Object.defineProperty(TimeSlot.prototype, 'name', {
                get : function() {
                    //formatted dates
                    var start = this.start;
                    var value = moment.utc(start).format('ddd hh:mm a');
                    return value;
                }
            });
        }

        //#endregion
    }
})();