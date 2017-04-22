
(function () {
    "use strict";
    angular
        .module("common.services")
        .factory("productResource",
                 ["$resource",
                  "appSettings",
                  productResource]);

    function productResource($resource, appSettings)
    {
        //return $resource(appSettings.serverPath + "/api/products/:productId");
        //return $resource(appSettings.serverPath + "/api/products/:search");

        return $resource(appSettings.serverPath + "/api/products/:productId", null,
                         {
                             'update': {method : 'PUT'}
                         });
    }

}());