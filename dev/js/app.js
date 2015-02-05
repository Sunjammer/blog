(function(){
	
	angular.module("projects", []); //Submodule predefs
	angular.module("presence", []); //Submodule predefs
	angular.module("resume", ["projects","presence"]); //Application

})();