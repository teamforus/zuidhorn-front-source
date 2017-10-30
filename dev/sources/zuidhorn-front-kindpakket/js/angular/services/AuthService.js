kindpakketApp.service('AuthService', [
    'ApiRequest',
    'CredentialsService',
    function(
        ApiRequest,
        CredentialsService
    ) {
        return new(function() {
            apiRequest = ApiRequest;

            this.sendSignInToken = function(email) {
                return ApiRequest.post('/user/send-token', {
                    email: email
                });
            };

            this.signInByToken = function(token) {
                return ApiRequest.post('/user/sign-in', {
                    token: token
                });
            };

            this.activateVoucher = function(voucher, values) {
                return ApiRequest.post('/voucher/' + voucher + '/activate', values);
            };

            this.activateVoucherToken = function(activation_token) {
                return ApiRequest.post('/voucher/activate-token', {
                    activation_token: activation_token
                });
            };

            this.signOut = function(values) {
                CredentialsService.set(null);
            };

            this.getUser = function() {
                return ApiRequest.get('/user');
            };

            this.getVoucher = function() {
                return ApiRequest.get('/user/voucher');
            };

            this.getQrCode = function() {
                return ApiRequest.get('/user/voucher/qr-code');
            };

            this.sendQrCodeEmail = function() {
                return ApiRequest.post('/user/voucher/email');
            };

            this.getTransactions = function() {
                return ApiRequest.get('/user/voucher/transactions');
            };
        });
    }
]);