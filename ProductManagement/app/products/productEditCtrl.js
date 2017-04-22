
(function () {

    "use strict";

    angular
    .module("productManagement")
    .controller("ProductEditCtrl",
                ["passProduct",
                    "$state",
                    "productService",
                    ProductEditCtrl]);

    function ProductEditCtrl(passProduct, $state, productService) {
        var vm = this;
        vm.product = passProduct;
        vm.priceOption = "percent";
        vm.message = '';

        vm.marginPercent = function () {
            return productService.calculateMarginPercent(vm.product.price,
                                           vm.product.cost);
        }

        /* Calculate the price based on a markup */
        vm.calculatePrice = function () {
            var price = 0;

            if (vm.priceOption == 'amount') {
                price = productService.calculatePriceFromMarkupAmount(
                    vm.product.cost, vm.markupAmount);
            }

            if (vm.priceOption == 'percent') {
                price = productService.calculatePriceFromMarkupPercent(
                    vm.product.cost, vm.markupPercent);
            }
            vm.product.price = price;
        };

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        }
        else {
            vm.title = "New Product";
        }

        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;
        }

        vm.submit = function (isValid) {
            if (isValid) {
                if (vm.product.productId) {
                    vm.product.$update({ id: vm.product.productId }, function (data) {
                        toastr.success("Update Successful");
                    },
                    function (response) {
                        vm.message = response.statusText + "\r\n";

                        if (response.data.modelState)
                        {
                            for(var key in response.data.modelState)
                            {
                                vm.message += response.data.modelState[key] + "\r\n";
                            }
                        }

                        if (response.data.exceptionMessage) {
                            vm.message += response.data.exceptionMessage;
                        }
                    });
                }
                else {
                    vm.product.$save(function (data) {
                        vm.originalProduct = angular.copy(data);
                        toastr.success("Save Successful");
                    },
                    function (response) {
                        vm.message = response.statusText + "\r\n";

                        if (response.data.modelState) {
                            for (var key in response.data.modelState) {
                                vm.message += response.data.modelState[key] + "\r\n";
                            }
                        }

                        if (response.data.exceptionMessage) {
                            vm.message += response.data.exceptionMessage;
                        }
                    });
                }
            }
            else {
                alert("Please correct the validation errors first");
            }
        }

        vm.cancel = function () {
            vm.product = angular.copy(vm.originalProduct);
            //$state.go('productList');
        }

        vm.addTags = function (tags) {
            if (tags) {
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newTags = "";
            }
            else {
                alert("Please enter one or more tags separated by commas");
            }
        }

        vm.removeTag = function (idx) {
            vm.product.tags.splice(idx, 1);
        }
    }
}());