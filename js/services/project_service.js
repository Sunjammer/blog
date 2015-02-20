(function(){

	var model = { projects : [] };

	var jsonResponseHandler = function(response){
		model.projects = response.data.projects;
	};

	var loadProjectList = function($http){
		http = $http;
		http.get( 'data/projects.json' ).then( jsonResponseHandler );
	};

	var projectDataService = function($http){
		this.model = model;
		loadProjectList($http, this);
		return this;
	};

	angular.module("resume").factory("projectDataService", projectDataService);

})();