oauth2App.component('signUpComponent', {
    templateUrl: './tpl/pages/sign-up.html',
    controller: [
        '$scope',
        '$state',
        'AuthService',
        'FormBuilderService',
        'CredentialsService',
        function(
            $scope,
            $state,
            AuthService,
            FormBuilderService,
            CredentialsService
        ) {
            var ctrl = this;

            ctrl.form = FormBuilderService.build();

            ctrl.usePreset = function(e) {
                e.preventDefault() & e.stopPropagation();

                ctrl.form.values.name = "R. Minds";
                ctrl.form.values.kvk_number = "69097488";
                ctrl.form.values.iban = "MD87MO2259ASV72028867100";
            };

            ctrl.submit = function(e) {
                e.preventDefault() & e.stopPropagation();
                
                if (ctrl.form.submited)
                    return false;

                ctrl.form.resetErrors();
                ctrl.form.submited = true;

                AuthService.signUp(ctrl.form.values).then(function(response) {
                    CredentialsService.set(response.data);
                    ctrl.form.reset();
                    $state.go('panel');

                    $scope.$emit('auth:sign-up');
                }, function(response) {
                    ctrl.form.submited = false;
                    ctrl.form.errors = response.data;
                });
            };
        }
    ]
});