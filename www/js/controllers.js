angular.module('starter.controllers', ['firebase'])

.controller('ChatsCtrl', ['$scope', '$firebase', '$rootScope',
    function ($scope, $firebase, $rootScope) {
        var ref = new Firebase('https://rt-chat.firebaseio.com/');
        var sync = $firebase(ref);
        $scope.chats = sync.$asArray();

        $scope.sendChat = function (chat) {
            if ($rootScope.authData) {
                $scope.chats.$add({
                    user: $rootScope.authData.twitter.username,
                    message: chat.message,
                    imgURL: $rootScope.authData.twitter.cachedUserProfile.profile_image_url
                });
                chat.message = "";
            }
        }

}])

.controller('AccountCtrl', function ($scope, $rootScope) {
    $scope.login = function () {
        var ref = new Firebase('https://rt-chat.firebaseio.com');
        ref.authWithOAuthPopup('twitter', function (error, authData) {
            if (error) {
                alert('There was an error.');
            } else {
                alert('Your all set!');
            }
            $rootScope.authData = authData;
        });
    }
});