(function(){

	var base_url = "data/md/";

	var mdController = function($http, $attrs, $scope){
		$scope.model = {text : ""};

		var loadHandler = function(result){
			$scope.model.text = result.data;
		};

		$attrs.$observe("url", function( actual_value ) {
			$http.get( base_url + actual_value ).then( loadHandler );
		});
	};

	angular
		.module("resume")
		.controller("MDController", mdController, []);

})();