(function(){

	angular.module('resume')
		.filter('markdown', ['$sce', function($sce) {
		    var converter = new Showdown.converter();
		    return function (value) {
				var html = converter.makeHtml(value || '');
		        return $sce.trustAsHtml(html);
		    };
		}]);

	angular.module('resume')
		.filter('trustAsResourceUrl', ['$sce', function($sce) {
		    return function(val) {
		        return $sce.trustAsResourceUrl(val);
		    };
		}])

})();