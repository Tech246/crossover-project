/**
 * Created by alex on 12/13/15.
 */

(function (angular) {
    "use strict";
    angular.module('gundCI.index', ['ui.router'])

        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('index', {
                url: '/',
                controller: 'IndexController',
                templateUrl: 'modules/index/index.html'
            });
        }])

        .controller('IndexController', ['$scope', '$http', function ($scope, $http) {
            var ctrl = this
                , STATUS_PENDING = 'pending'
                , STATUS_RUNNING = 'running'
                , STATUS_PASSED = 'passed'
                , STATUS_FAILED = 'failed';

            $scope.isLoading = true;
            $scope.taskList = [];

            $scope.loadTasks = function () {
                return $http.get('data/tasks.json');
            };

            $scope.loadTasks().then(function (data) {
                $scope.isLoading = false;
                $scope.taskList = data.data;
            });

            $scope.isPending = function (status) {
                return status === STATUS_PENDING;
            };

            $scope.isRunning = function (status) {
                return status === STATUS_RUNNING;
            };

            $scope.isPassed = function (status) {
                return status === STATUS_PASSED;
            };

            $scope.isFailed = function (status) {
                return status === STATUS_FAILED;
            };

            $scope.isEmpty = function (percent) {
                return percent === '';
            };

            $scope.isZero = function (percent) {
                return percent === '0';
            };

            $scope.isDone = function (percent) {
                return percent === '100';
            };

            $scope.getIconFor = function (status, percent) {
                percent = percent || null;
                switch (status) {
                    case STATUS_PENDING:
                        return 'flaticon-more7';
                        break;
                    case STATUS_RUNNING:
                        return 'flaticon-refresh36';
                        break;
                    case STATUS_PASSED:
                        return percent ? 'flaticon-checked21' : 'flaticon-circle134';
                        break;
                    case STATUS_FAILED:
                        if (percent) {
                            return percent == 100 ? 'flaticon-checked21' : 'flaticon-exclamation9';
                        } else {
                            return 'flaticon-delete21';
                        }
                        break;
                }
            };

            $scope.getTaskPercent = function (percent) {
                return 'calc(' + percent + '% + 2px)';
            };
        }])

})(angular);