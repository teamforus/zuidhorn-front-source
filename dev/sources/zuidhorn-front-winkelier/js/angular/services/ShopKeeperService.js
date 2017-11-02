shopkeeperApp.service('ShopKeeperService', [
    '$http',
    '$q',
    'ApiRequest',
    function(
        $http,
        $q,
        ApiRequest
    ) {
        return {
            getShopKeeper: function() {
                return ApiRequest.get('/categories');
            },
            getShopKeeperCategories: function() {
                return ApiRequest.get('/shop-keepers/categories');
            },
            update: function(values) {
                values._method = "PUT";

                return ApiRequest.post('/shop-keepers', values);
            },
            updatePhoto: function(image) {
                var formData = new FormData();

                formData.append('image', image);
                formData.append('_method', 'PUT');

                return ApiRequest.post('/shop-keepers/image', formData, {
                    'Content-Type': undefined
                });
            }
        };
    }
]);