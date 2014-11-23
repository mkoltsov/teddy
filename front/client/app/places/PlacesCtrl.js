"use strict";
angular.module('mg.places')
    .controller('PlacesCtrl', ['$rootScope', '$scope',  "mySocket",

        function ($rootScope, $scope,  mySocket) {
            $scope.model = {selected: 'Moscow', places: []};
            var lastMessage;
            mySocket.on('chat message', function (msg) {
                if (msg !== lastMessage) {
                    lastMessage = msg;
                    console.log(msg);
                }
            });


            $scope.add = function (val) {
                mySocket.emit('chat message', val);
            };
            $scope.data = {
                selectedIndex : 0,
                secondLocked : true,
                secondLabel : "Item Two"
            };

            $scope.next = function() {
                $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
            };

            $scope.previous = function() {
                $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
            };

        }
    ]);