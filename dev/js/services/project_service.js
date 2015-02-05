(function(){

	var model = { projects : [] };

	var jsonResponseHandler = function(response){
		var proj = response.data.projects;
		model.projects = proj;
	};

	var projectDataService = function($http){
		http = $http;
		this.model = model;
		http.get( 'js/data/projects.json' ).then( jsonResponseHandler );

		return this;
	};

	angular.module("resume").factory("projectDataService", projectDataService);

})();