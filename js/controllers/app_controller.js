(function(){

	var deps = ["projectDataService", "presenceLinksService"];

	var resumeController = function($scope, projectDataService, presenceLinksService){
		$scope.projectModel = projectDataService.model;
		$scope.linksModel = presenceLinksService.model;
	}

	angular
		.module("resume")
		.controller("ResumeController", resumeController, deps);
})();