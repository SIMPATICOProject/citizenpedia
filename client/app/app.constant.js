(function(angular, undefined) {
'use strict';

angular.module('paizaqaApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],path:'/qae',cpd_path:'/cpd',language:'es'})

;
})(angular);