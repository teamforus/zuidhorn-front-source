shopkeeperApp.service('ContactFormService', [
    '$http',
    '$q',
    'ApiRequest',
    function(
        $http,
        $q,
        ApiRequest
    ) {
        return new(function() {
            this.submitForm = function(values) {
                return ApiRequest.post('/../client/contact-form', values);
            };
        });
    }
]);