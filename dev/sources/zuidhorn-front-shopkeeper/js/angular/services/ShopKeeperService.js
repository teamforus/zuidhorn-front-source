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
            getShopKeeperCategories: function(id) {
                return ApiRequest.get('/shop-keepers/' + id + '/categories');
            },
            update: function(id, values) {
                values._method = "PUT";

                return ApiRequest.post('/shop-keepers/' + id, values);
            },
            updatePhoto: function(id, image) {
                var formData = new FormData();

                formData.append('image', image);
                formData.append('_method', 'PUT');

                return ApiRequest.post('/shop-keepers/' + id + '/image', formData, {
                    'Content-Type': undefined
                });
            }
        };
    }
]);