(function(){
	//Application

	var resumeController = function(projectDataService, presenceLinksService){
		this.projects = projectDataService.projects;
		this.links = presenceLinksService.links;
	}

	angular
		.module("resume", [])
		.controller("ResumeController", resumeController, ["projectDataService", "presenceLinksService"]);
})();