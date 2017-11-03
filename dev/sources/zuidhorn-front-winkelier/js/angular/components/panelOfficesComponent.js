shopkeeperApp.component('panelOfficesComponent', {
    templateUrl: './tpl/pages/panel/offices.html',
    controller: [
        '$rootScope',
        '$state',
        '$scope',
        '$timeout',
        'OfficeService',
        function(
            $rootScope,
            $state,
            $scope,
            $timeout,
            OfficeService
        ) {
            var ctrl = this;
            
            ctrl.$onInit = function() {
                OfficeService.getOffices().then(function(response) {
                    ctrl.offices = response.data;
                }, console.log);

                ctrl.deleteOffice = function(e, id) {
                    e && (e.preventDefault() & e.stopPropagation());

                    OfficeService.delete(id).then(function(response) {
                        ctrl.$onInit();
                    }, function() {
                        ctrl.$onInit();
                    })
                }
            };
        }
    ]
});