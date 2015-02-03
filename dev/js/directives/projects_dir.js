(function(){

var projectDirective = function(){
	return {
		restrict: "E",
		templateUrl: "templates/project-view.html",
		controller: "ProjectViewCtrl as ctrl",
		scope:{},
		bindToController: false
	};
};
angular.module("projects").directive('projectView', projectDirective);

})();