"use strict";
(function () {

    angular.module("minimalg", [
//        "ui.bootstrap",
        'mg.places',
        'mg.templates',
        'mg.common',
        "btford.socket-io",
        "ngMaterial"
    ])

        .config(function () {
//            $urlRouterProvider.otherwise("/");
//            $stateProvider
//                .state("main", {
//                    abtract: true,
//                    url: "/main",
//                    templateUrl: "app/main.html",
//                    controller: 'MainCtrl'
//                })
//                .state("main.places", {
//                    url: "/places",
//                    templateUrl: "app/places/places.tpl.html",
//                    controller: 'PlacesCtrl'});

        })
        .
        factory('mySocket', function (socketFactory) {
            return socketFactory();
        })
        .controller("MainCtrl", ['$rootScope', '$scope', '$log' , '$state',  '$location',
            function ($rootScope, $scope, $log, $state, $modal, $location) {
                $scope.test = 'pupa';
                $scope.navbarCollapsed = true;
                $scope.isActive = function (viewLocation) {
                    return viewLocation === $location.path();
                };



            }]
    );

    angular.module('mg.places', []);
    angular.module('mg.faces', []);
    angular.module('mg.common', []);
}());