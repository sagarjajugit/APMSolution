
(function () {

    "use strict";

    angular
    .module("productManagement")
    .controller("PriceAnalyticsCtrl",
                ["$scope",
                 "passProduct",
                 "productService",
                 "$filter",
                PriceAnalyticsCtrl])

    function PriceAnalyticsCtrl($scope,passProduct, productService, $filter)
    {
        $scope.title = "Price Analytics";

        // Computed property
        for (var i = 0; i < passProduct.length; i++) {
            passProduct[i].marginPercent =
                productService.calculateMarginPercent(passProduct[i].price,
                                                        passProduct[i].cost);
            passProduct[i].marginAmount =
                productService.calculateMarginAmount(passProduct[i].price,
                                                        passProduct[i].cost);
        }

        var orderedProductsAmount = $filter("orderBy")(passProduct, "marginAmount");
        var filteredProductsAmount = $filter("limitTo")(orderedProductsAmount, 5);

        var chartDataAmount = [];
        for (var i = 0; i < filteredProductsAmount.length; i++) {
            chartDataAmount.push({
                x: filteredProductsAmount[i].productName,
                y: [filteredProductsAmount[i].cost,
                    filteredProductsAmount[i].price,
                    filteredProductsAmount[i].marginAmount]
            });
        }

        $scope.dataAmount = {
            series: ["Cost", "Price", "Margin Amount"],
            data: chartDataAmount
        };

        $scope.configAmount = {
            title: "Top $ Margin Products",
            tooltips: true,
            labels: false,
            mouseover: function () { },
            mouseout: function () { },
            click: function () { },
            legend: {
                display: true,
                position: "right"
            }
        };

        var orderedProductsPercent = $filter("orderBy")(passProduct, "marginPercent");
        var filteredProductsPercent = $filter("limitTo")(orderedProductsPercent, 5);

        var chartDataPercent = [];
        for (var i = 0; i < filteredProductsPercent.length; i++) {
            chartDataPercent.push({
                x: filteredProductsPercent[i].productName,
                y: [filteredProductsPercent[i].marginPercent]
            });
        }

        $scope.dataPercent = {
            series: ["Margin %"],
            data: chartDataPercent
        };

        $scope.configPercent = {
            title: "Top % Margin Products",
            tooltips: true,
            labels: false,
            mouseover: function () { },
            mouseout: function () { },
            click: function () { },
            legend: {
                display: true,
                position: "right"
            }
        };
    }

}()); 