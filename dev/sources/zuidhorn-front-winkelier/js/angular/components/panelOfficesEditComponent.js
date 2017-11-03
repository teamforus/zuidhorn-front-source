shopkeeperApp.component('panelOfficesEditComponent', {
    templateUrl: './tpl/pages/panel/offices-edit.html',
    controller: [
        '$q',
        '$rootScope',
        '$state',
        '$filter',
        '$stateParams',
        '$scope',
        'AuthService',
        'CategoryService',
        'OfficeService',
        'FormBuilderService',
        'CredentialsService',
        function(
            $q,
            $rootScope,
            $state,
            $filter,
            $stateParams,
            $scope,
            AuthService,
            CategoryService,
            OfficeService,
            FormBuilderService,
            CredentialsService
        ) {
            var ctrl = this;
            var input;

            ctrl.form = {};
            ctrl.form.office = FormBuilderService.build();

            var unwatcher = $rootScope.$watch('user', function(user) {
                if (!user)
                    return;

                init();
                unwatcher();
            });

            var init = function() {
                var promises = [];

                var map = {
                    office: 0,
                };

                promises[map.office] = $q(function(resolve, reject) {
                    OfficeService.getOffice($stateParams.id).then(
                        function(response) {
                            resolve(response.data);
                        });
                });

                $q.all(promises).then(function(promises) {
                    var office = promises[map.office];

                    ctrl.office = office;
                    ctrl.schedule_options = {};
                    ctrl.schedule_options['none'] = 'Rustdag';

                    for (var i = 0; i < 24; i++) {
                        var hour = (i <= 9 ? '0' : '') + i;

                        ctrl.schedule_options[hour + ':00'] = hour + ':00';
                        ctrl.schedule_options[hour + ':30'] = hour + ':30';
                    }

                    [0, 1, 2, 3, 4, 5, 6].forEach(function(week_day) {
                        if (typeof office.schedules[week_day] == 'undefined') {
                            office.schedules[week_day] = {
                                start_time: [5, 6].indexOf(week_day) != -1 ? '09:00' : 'none',
                                end_time: [5, 6].indexOf(week_day) != -1 ? '17:00' : 'none'
                            };
                        } else {
                            if (!office.schedules[week_day].start_time)
                                office.schedules[week_day].start_time = 'none';
                            
                            if (!office.schedules[week_day].end_time)
                                office.schedules[week_day].end_time = 'none';
                        }
                    });

                    // fill profile form values
                    ctrl.form.office.fillValues(
                        office, ["email", "phone", "address", 'schedules']);
                    
                    ctrl.changeScheduleStart = function(schedules, week_day) {
                        try {
                            if (schedules[week_day].start_time == 'none')
                                return schedules[week_day].end_time = 'none';

                            var int_start = $filter('timeToInt')(
                                schedules[week_day].start_time);

                            var int_end = $filter('timeToInt')(
                                schedules[week_day].end_time);

                            if ((int_start > int_end) || (schedules[week_day].end_time == 'none'))
                                schedules[week_day].end_time = schedules[week_day].start_time;
                        } catch (e) {
                            schedules[week_day].start_time = '09:00';
                            schedules[week_day].end_time = '17:00';
                        }
                    };

                    // submit form to api
                    ctrl.submitForm = function(e, form) {
                        e && e.preventDefault() && e.stopPropagation();

                        if (form.is_locked)
                            return;

                        form.lock();

                        OfficeService.update(office.id, form.values).then(
                            function() {
                                $scope.$emit('user:sync');
                                $state.go('panel-offices');

                                form.reset().unlock();
                            },
                            function(response) {
                                form.fillErrors(response.data).unlock();
                            }
                        );
                    };

                    ctrl.selectPhoto = function(e) {
                        e && e.preventDefault() && e.stopPropagation();

                        input = document.createElement('input');
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "image/*");

                        input.addEventListener('change', function(e) {
                            OfficeService.updatePhoto(
                                office.id,
                                e.target.files[0]
                            ).then(function(response) {
                                OfficeService.getOffice($stateParams.id).then(function(response) {
                                    ctrl.office = response.data;
                                });
                            });
                        });

                        input.click();
                    }

                    ((function(schedules) {
                        for (var i = schedules.length - 1; i >= 0; i--) {
                            ctrl.changeScheduleStart(schedules, i);
                        }
                    })(ctrl.form.office.values.schedules));
                });
            };
        }
    ]
});