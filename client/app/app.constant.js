(function(angular, undefined) {
'use strict';

angular.module('paizaqaApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],path:'/qae',cpd_path:'https://simpatico.business-engineering.it/cpd/es/diagram',language:'en',secondlanguage:'it',home_searchbar:true,home_categories:true,home_categories_list:[{title:'Housing',link:'categories/list/591591fb10c69a06c8773a91',image:'assets/images/svg/591591fb10c69a06c8773a91.png'},{title:'School',link:'categories/list/5913170c65c17ab8c2406a96',image:'assets/images/svg/5913170c65c17ab8c2406a96.png'},{title:'Community',link:'categories/list/5913170c65c17ab8c2406a97',image:'assets/images/svg/5913170c65c17ab8c2406a97.png'},{title:'Social Service',link:'categories/list/5913170c65c17ab8c2406a98',image:'assets/images/svg/5913170c65c17ab8c2406a98.png'}]})

;
})(angular);