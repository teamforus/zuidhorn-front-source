shopkeeperApp.directive('googleAddress', [function() {
    return {
        restrict: 'A',
        replace: true,
        transclude: true,
        scope: true,
        link: function($scope, iElm, iAttrs, controller) {
            function initAutocomplete() {
                // Create the autocomplete object, restricting the search to geographical
                // location types.
                autocomplete = new google.maps.places.Autocomplete(
                    /** @type {!HTMLInputElement} */
                    iElm[0], {
                        types: ['geocode']
                    });

                // When the user selects an address from the dropdown, populate the address
                // fields in the form.
                $(iElm[0]).bind('keydown', function(event) {
                    if (event.keyCode == 13) {
                        event.preventDefault();
                        return false;
                    }
                });
            }

            initAutocomplete();
        }
    };
}]);