(function(){

	var deps = ["projectDataService", "presenceLinksService"];
	var projectModel = { projects : [] };
	var linksModel = { links : [] };

	var resumeController = function(projectDataService, presenceLinksService){
		this.projectModel = projectDataService.model;
		this.linksModel = presenceLinksService.model;
	}

	angular
		.module("resume")
		.controller("ResumeController", resumeController, deps);
})();