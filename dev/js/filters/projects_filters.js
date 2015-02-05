(function(){

	angular.module('resume')
		.filter('markdown', ['$sce', function($sce) {
		    var converter = new Showdown.converter();
		    return function (value) {
				var html = converter.makeHtml(value || '');
		        return $sce.trustAsHtml(html);
		    };
		}]);

})();