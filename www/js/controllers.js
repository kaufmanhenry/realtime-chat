angular.module('starter.controllers', ['firebase'])

.controller('ChatsCtrl', ['$scope', '$firebase', '$rootScope',
    function ($scope, $firebase, $rootScope) {
        var ref = new Firebase('https://rt-chat.firebaseio.com/');
        var sync = $firebase(ref);
        $scope.chats = sync.$asArray();
        
        $scope.sendChat = function(chat) {
            $scope.chats.$add({
                user: 'Guest',
                message: chat.message
            });
            chat.message = "";
        }
        
}])

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});