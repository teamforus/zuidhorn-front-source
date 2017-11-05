var shopkeeperApp = angular.module('shopkeeperApp', ['ui.router']);

shopkeeperApp.config(['ApiRequestProvider', function(ApiRequestProvider) {
    ApiRequestProvider.setHost(env_data.apiUrl);
}]);

shopkeeperApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {
    if (env_data.html5Mode.enable)
        $locationProvider.html5Mode(true);

    // For any unmatched url, send to 404
    $urlRouterProvider.otherwise('/404');

    $stateProvider
        .state({
            url: '/',
            name: 'welcome',
            component: 'landingComponent',
            data: {
                title: "Home"
            }
        })
        .state({
            url: '/sign-out',
            name: 'sign-out',
            controller: ['$scope', '$state', 'AuthService', function($scope, $state, AuthService) {
                AuthService.signOut();
                $state.go('welcome');

                $scope.$emit('auth:sign-out');
            }]
        });

    // Profile
    $stateProvider
        .state({
            url: '/profile/edit',
            name: 'profile-edit',
            component: 'panelProfileEditComponent',
            data: {
                title: "Edit Profile"
            }
        })

    // Offices crud
    $stateProvider
        .state({
            url: '/panel/offices',
            name: 'panel-offices',
            component: 'panelOfficesComponent',
            data: {
                title: "Offices"
            }
        })
        .state({
            url: '/panel/offices/create',
            name: 'panel-offices-create',
            component: 'panelOfficesCreateComponent',
            data: {
                title: "Add office"
            }
        })
        .state({
            url: '/panel/offices/:id/edit',
            name: 'panel-offices-edit',
            component: 'panelOfficesEditComponent',
            data: {
                title: "Edit office"
            },
            params: {
                id: null
            }
        });

    // Transactions crud
    $stateProvider
        .state({
            url: '/panel/transactions',
            name: 'panel-transactions',
            component: 'panelTransactionsComponent',
            data: {
                title: "Transactions"
            }
        });

    // Transactions crud
    $stateProvider
        .state({
            url: '/access-denied',
            name: 'access-denied',
            component: 'responseCodeComponent',
            data: {
                icon: 'icon-access.png',
                title: "Toegang geweigerd",
                title_bg: 'ACCESS DENIED',
                desc: "U bent niet geautoriseerd om deze pagina te bekijken.",
            }
        });

    // Transactions crud
    $stateProvider
        .state({
            url: '/404',
            name: '404',
            component: 'responseCodeComponent',
            data: {
                icon: 'icon-404.png',
                title: "Oeps... 404",
                title_bg: 'PAGE NOT FOUND',
                desc: "De pagina die u zoekt is niet gevonden.",
            }
        });
}]);

if (!env_data.html5Mode.enable)
    if (!document.location.hash)
        document.location.hash = '#!/';