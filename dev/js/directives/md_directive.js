(function(){

	angular.module("resume")
		.directive("md", function(){
			return {
				restrict: "E",
				templateUrl: "templates/markdown-view.html",
				controller:"MDController as ctrl",
				scope:{
					url:"@url"
				}
			};
		});

})();