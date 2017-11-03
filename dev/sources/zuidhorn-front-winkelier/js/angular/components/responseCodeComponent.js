shopkeeperApp.component('responseCodeComponent', {
    templateUrl: './tpl/pages/response-code.html',
    controller: [
        '$rootScope',
        '$state',
        '$scope',
        'CredentialsService',
        function(
            $rootScope,
            $state,
            $scope,
            CredentialsService
        ) {
            var ctrl = this;
            
            ctrl.$state = $state;
        }
    ]
});