(function(){

	var model = { links : [] };

	var jsonResponseHandler = function(response){
		model.links = response.data.links;
	};

	var loadLinksList = function($http){
		http = $http;
		http.get( 'data/links.json' ).then( jsonResponseHandler );
	};

	var presenceLinksService = function($http){
		this.model = model;
		loadLinksList($http, this);
		return this;
	};

	angular.module("resume").factory("presenceLinksService", presenceLinksService);

})();