kindpakketApp.directive('popupModal', [
    'ContactFormService',
    'FormBuilderService',
    function(
        ContactFormService,
        FormBuilderService
    ) {
        return {
            restrict: 'A',
            templateUrl: './tpl/directives/popup-modal.html',
            replace: true,
            transclude: true,
            scope: {
                modal: "="
            },
            link: function($scope, iElm, iAttrs, controller) {
                $scope.$watch('modal', function(n, o ,s) {
                    console.log(n);
                });
            }
        };
    }
]);