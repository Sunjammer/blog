(function(){

	var model = {
		links : 
		[
			{
				name:"GitHub",
				url:"http://github.com/Sunjammer",
				image:"img/icons/GitHub-Mark-64px.png"
			},
			{
				name:"Twitter",
				url:"https://twitter.com/sunjammer",
				image:"img/icons/twitter.png"
			},
			{
				name:"Google+",
				url:"https://plus.google.com/u/1/+AndreasR%C3%B8nning/posts",
				image:"img/icons/gplus.png"
			},
			{
				name:"SoundCloud",
				url:"https://soundcloud.com/doomsday/",
				image:"img/icons/soundcloud.png"
			},
			{
				name:"LinkedIn",
				url:"https://www.linkedin.com/pub/andreas-r%C3%B8nning/67/238/ab8",
				image:"img/icons/linkedin.jpg"
			}
		]
	};

	var presenceLinksService = function(){
		this.model = model;
		return this;
	};

	angular.module("resume").factory("presenceLinksService", presenceLinksService);

})();