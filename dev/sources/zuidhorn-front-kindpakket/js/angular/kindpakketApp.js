var kindpakketApp = angular.module('kindpakketApp', ['ui.router']);

kindpakketApp.config(['ApiRequestProvider', function(ApiRequestProvider) {
    ApiRequestProvider.setHost(env_data.apiUrl);
}]);

kindpakketApp.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    if (env_data.html5Mode.enable)
        $locationProvider.html5Mode(true);

    $stateProvider
        .state({
            url: '/',
            name: 'landing',
            component: 'landingComponent',
            data: {
                title: "Home"
            }
        });

    // Profile
    $stateProvider
        .state({
            url: '/account',
            name: 'account',
            component: 'accountViewComponent',
            data: {
                title: "Account"
            }
        });

    $stateProvider
        .state({
            url: '/activate-voucher/{activation_token}',
            name: 'activate-voucher',
            controller: ['$scope', '$state', '$rootScope', 'AuthService', 'CredentialsService', function($scope, $state, $rootScope, AuthService, CredentialsService) {
                console.log($state.params.activation_token);
                AuthService.activateVoucherToken($state.params.activation_token)
                    .then(function(response) {
                        CredentialsService.set(response.data);
                        $state.go('landing');
                        $rootScope.credentials = CredentialsService.get();
                    }, function(response) {
                        alert(response.data.message);
                        $state.go('landing');
                    });
            }]
        });

    $stateProvider
        .state({
            url: '/sign-in/{token}',
            name: 'sign-in',
            controller: ['$scope', '$state', '$rootScope', 'AuthService', 'CredentialsService', function($scope, $state, $rootScope, AuthService, CredentialsService) {
                AuthService.signInByToken($state.params.token)
                    .then(function(response) {
                        CredentialsService.set(response.data);
                        $rootScope.credentials = CredentialsService.get();
                        $state.go('landing');
                    }, function(response) {
                        alert(JSON.stringify(response.data, null, '    '));
                        $state.go('landing');
                    });
            }]
        });
}]);

if (!env_data.html5Mode.enable)
    if (!document.location.hash)
        document.location.hash = '#!/';