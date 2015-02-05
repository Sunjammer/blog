(function(){

	var base_url = "js/data/md/";
	var model = {text:""};
	var loadHandler = function(result){
		model.text = result.data;
	};

	var mdController = function($http, $attrs){
		this.model = model;
		$attrs.$observe("url", function( actual_value ) {
			$http.get( base_url + actual_value ).then( loadHandler );
		});
	};

	angular
		.module("resume")
		.controller("MDController", mdController, []);

})();