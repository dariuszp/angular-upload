'use strict';

(function (global) {

    var module = angular.module('app', []);

    module.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

    module.controller('Test', ['$scope', '$http', function ($scope, $http) {

        $scope.form = {};

        $scope.submit = function (event) {
            event.preventDefault();

            var index, formData = new FormData();
            for (index in $scope.form) {
                formData.append(index, $scope.form[index]);
            }

            $http.post('/upload.php', formData, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            });
        }
    }]);

}(window));