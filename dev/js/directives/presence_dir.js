(function(){

var presenceDirective = function(){
	return {
		restrict: "E",
		templateUrl: "templates/presence-view.html",
		controller: "PresenceViewController as ctrl",
		scope:{},
		bindToController: false
	};
};
angular.module("presence").directive('presenceView', presenceDirective);

})();