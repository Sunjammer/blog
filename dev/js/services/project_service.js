(function(){

	var projects = [
		{
			"title":"Statnett Nydalen, Oslo.",
			"summary" : "Interactive exhibit.",
			"image" : "img/wall.jpg",
			"body" : "<p>This installation used a pair of standard web cameras to detect motion, driving a particle system which in turn drove a custom hardware-accelerated renderer.</p><p>To overcome situational hardware limitations, the renderer and physics simulation was required to run on a pair of networked clients drawing to four screens each, synchronized using deterministic techniques and a UDP clock server.</p>",
			"addendum" : "The solution was written for Expology, in Haxe 3 targeting Adobe AIR with Stage3D."
		},
		{
			"title":'Inky & Smudge',
			"summary" : "Game engine, content creation tooling & support.",
			"image" : "img/is.jpg",
			"body" : "<p>To build this children's storybook/minigame collection, I provided custom game engine and content creation tooling using Haxe 3 and the <a href='http://www.openfl.org'>OpenFL</a> framework. This approach allowed us to create and test content in a native desktop environment, as well as run development builds on convenient hardware, such as cheaper Android tablets.</p><p>The engine offers bone and sprite sheet animation using hand-written tooling, music and audio effect playback, a high performance 2D rendering solution and rich scripting.</p>",
			"addendum" : 'Content and gameplay was implemented by <a href="http://slakinov.com">John Davies</a> on contract for Brothers & Sisters.'
		},
		{
			"title":'Super Croissant Fighter',
			"summary" : "Shooting game engine",
			"image" : "img/is.jpg",
			"body" : "<p></p>",
			"addendum" : ''
		},
		{
			"title":'Global Countdown',
			"summary" : "Multiplayer learning game installation",
			"image" : "img/is.jpg",
			"body" : "<p></p>",
			"addendum" : ''
		},
		{
			"title":'MIRA',
			"summary" : "Visual programming tool and multiplayer game engine",
			"image" : "img/is.jpg",
			"body" : "<p></p>",
			"addendum" : ''
		},
		{
			"title":'Barrage',
			"summary" : "Bullet animation and scripting system",
			"image" : "img/is.jpg",
			"body" : "<p></p>",
			"addendum" : ''
		},
		{
			"title":'Delta',
			"summary" : "Light tweening framework for Haxe",
			"image" : "img/is.jpg",
			"body" : "<p></p>",
			"addendum" : ''
		},
		{
			"title":'SLF4AS/HX',
			"summary" : "Light logging framework for AS3 and Haxe",
			"image" : "img/is.jpg",
			"body" : "<p></p>",
			"addendum" : ''
		},
		{
			"title":'ShaderBlox',
			"summary" : "Macro based GLSL shader tools for Haxe",
			"image" : "img/is.jpg",
			"body" : "<p></p>",
			"addendum" : ''
		},
		{
			"title":'"DConsole"',
			"summary" : "Flash developer console and tool platform",
			"image" : "img/is.jpg",
			"body" : "<p></p>",
			"addendum" : ''
		}
	];

	var next = function(){
		return Math.max(0, Math.floor(Math.random() * projects.length));
	};

	var projectDataService = function(){
		this.getProjects = function(){
			return projects;
		};
		this.consume = function(){
			return projects.splice(next(), 1)[0];
		};

		return this;
	};

	angular.module("projects").factory("projectDataService", projectDataService);

})();