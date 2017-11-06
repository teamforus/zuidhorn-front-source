shopkeeperApp.directive('googleAddress', [
    '$q',
    function(
        $q
    ) {
        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: {
                ngModel: '='
            },
            link: function($scope, iElm, iAttrs, controller) {
                function initAutocomplete() {
                    // Create the autocomplete object, restricting the search to geographical
                    // location types.
                    autocomplete = new google.maps.places.Autocomplete(
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

                    google.maps.event.addListener(autocomplete, 'place_changed', function(e) {
                        $scope.$apply(function() {
                            $scope.ngModel = iElm[0].value;
                        });
                    });
                }

                initAutocomplete();
            }
        };
    }
]);