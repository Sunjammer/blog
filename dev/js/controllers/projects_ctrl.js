(function(){

var projectViewController = function(projectDataService){
	this.model = projectDataService.consume();
};
angular.module("projects").controller("ProjectViewCtrl", projectViewController, ["projectDataService"]);

})();