(function(){

var presenceViewController = function(presenceLinksService){
	this.model = presenceLinksService.links;
};
angular.module("presence").controller("PresenceViewController", presenceViewController, ["presenceLinksService"]);

})();