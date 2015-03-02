(function(){

	var deps = ["projectDataService", "presenceLinksService"];

	var resumeController = function($sce, $scope, projectDataService, presenceLinksService){
		$scope.projectModel = projectDataService.model;
		$scope.linksModel = presenceLinksService.model;
		$scope.playerVars = {
		    controls: 1,
		    autoplay: 0
		};
	}

	angular
		.module("resume")
		.controller("ResumeController", resumeController, deps);
})();