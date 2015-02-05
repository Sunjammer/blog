(function(){

	var projects = [
		{
			"title":"Statnett Nydalen, Oslo.",
			"summary" : "Interactive exhibit",
			"image" : "img/wall.jpg",
			"body" : "<p>This installation, written on a very tight schedule, used a pair of standard web cameras to detect motion, driving a particle system which in turn drove a custom hardware-accelerated renderer.</p><p>To overcome situational hardware limitations, the renderer and physics simulation was required to run on a pair of networked clients drawing to four screens each, synchronized using deterministic techniques and a UDP clock server. No external libraries were used.</p><p>This exhibit, consisting of instances of three separate applications, exemplifies my hand-coded approach of avoiding external dependencies unless necessary and using netcode to modularize exhibit components.</p>",
			"addendum" : 'Written in Haxe for <a href="http://www.expology.no">Expology</a> targeting Adobe AIR with Stage3D.'
		},
		{
			"title":'"MIRA", Norwegian Maritime Museum, Oslo',
			"summary" : "Visual programming tool and multiplayer game engine",
			"image" : "img/mira2.jpg",
			"body" : "<p>MIRA allows a developer to visually plot the logical flow of an application as connected modules, before decorating each module with tables of scripts and data. Connected game clients then travel along this graph like pieces on a game board, triggering scripts, receiving data collated locally in terms of the spatial relationships on the graph.</p><p>The visual nature of the tool and the philosophy of strict server authority allows a game state to be queried at a glance, making the creation of game states and testing game logic a rapid, iterative process even when handling multiple parallel clients at once. There's a certain magic to manipulating the game state and watching several remote clients update their content in real time as you edit.</p><p>MIRA was written to support a very content heavy multiplayer learning game exhibit, and meant that content creators and game designers were working directly on the game design implementation: We met our deadline with stable software and I didn't have to write a line of game logic. The final game graph consisted of upwards of 10 000 tables of data. Additionally, we used MIRA to solve other minor installations in the exhibition hall that included network logic: It simply turned out to be the simplest most direct way.</p>",
			"addendum" : 'Proudly written in Haxe/AIR for <a href="http://www.expology.no">Expology</a>'
		},
		{
			"title":'"Inky & Smudge"',
			"summary" : "Game engine, content creation tooling & support",
			"image" : "img/is.jpg",
			"body" : "<p>To build this children's storybook/minigame collection, I provided custom game engine and content creation tooling using Haxe 3 and the <a href='http://www.openfl.org'>OpenFL</a> framework. Though we had a specific device target, this approach allowed us to create and test content in a native desktop environment, as well as run development builds on convenient hardware, such as cheaper Android tablets.</p><p>The engine offers bone and sprite sheet animation using hand-written tooling, music and audio effect playback, a high performance 2D rendering solution and rich scripting.</p>",
			"addendum" : 'Content and gameplay was implemented by <a href="http://slakinov.com">John Davies</a> on contract for <a href="http://www.brothersandsisters.co.uk/">Brothers & Sisters.</a>'
		},
		{
			"title":'"Be Democracy", Nobel Peace Centre, Oslo',
			"summary" : "Interactive exhibit",
			"image" : "img/bedemocracy.jpg",
			"body" : "<p>I was tasked with writing a Kinect pointer service, tracking multiple users via a set of Kinect 1.0 cameras and allowing them to point to content projected on tiles arranged around them in a sphere.</p><p>The software has full debug views of skeletons as well as calibration and prioritization tools, and transmits pointer data over UDP for any applications to hook into.</p>",
			"addendum" : 'Written in Haxe/AIR for <a href="http://www.expology.no">Expology</a>'
		},
		{
			"title":'DConsole',
			"summary" : "Flash developer console and runtime tool platform",
			"image" : "img/dconsole.jpg",
			"body" : "<p>DConsole is a long running personal project, having been in development since 2006. Running primarily as a command-line interface layer that can be hooked into methods and properties of a running Flash application, it grew to include its own windowing system and plugin architecture, function as a general purpose extensible tooling platform for Flash developers.</p><p>Plugins offer functionality ranging from profiling displays, measuring, eyedropping and snapshotting tools to heavier things like network traffic inspectors and bizarro IRC clients.</p><p>A tinier Haxe library, disgustingly named Consolitis, is also <a href='https://github.com/furusystems/consolitis'>in progress</a>, attempting to straddle the problem of building a proper cross plat alternative.</p>",
			"addendum" : 'Source available on <a href="https://github.com/furusystems/dconsole">GitHub</a>.'
		},
		{
			"title":'Croissant Engine',
			"summary" : "Cross platform 2D game engine",
			"image" : "img/croissant.jpg",
			"body" : "<p>Initially an exploration into the performance benefits of native code built from Haxe versus the mobile AIR runtime, Croissant Engine has been a labor of love for years. Characteristically feature-bloated as such things tend to be, Croissant has become game development boilerplate for personal projects, as well as a starting point for client work such as Inky & Smudge.</p><p>Though at its core a performant sprite based engine, Croissant supports deformable 3D meshes, multi-resolution sprite sheets using its own GTS texture format with inline animation data, signed distance field font rendering, a full multitouch control solution, in-depth scripting, music playback with loop sections and transitions, listener/source stereo sound effect system and more.</p>",
			"addendum" : null
		},
		{
			"title":'Barrage',
			"summary" : "Bullet animation and scripting system",
			"image" : "img/barrage.png",
			"body" : "<p>I'm a huge fan of <a href='https://www.youtube.com/watch?v=ZHqN_fH2S7k'>japanese-style shooting games</a>, and the problem of creating intricate bullet emission patterns based on dynamic properties such as emitter position vs player position has seen a number of attempted solutions over the years, perhaps most notably Kenta Cho's <a href='http://www.asahi-net.or.jp/~cs8k-cyu/bulletml/index_e.html'>BulletML</a>. I struggled with the markup format (something Cho has also abandoned since) and making a decent Haxe implementation of his standard, so I decided to try making my own, simultaneously learning to write a proper DSL.</p><p>While heavily inspired by BulletML, Barrage attempts to be a more verbally written, declarative language with implicit sequencing, and can be mapped to any particle system that implements a short interface and emits particles that implement another.</p><p>Barrage has a Sublime language definition, and I also wrote a pseudo-IDE for rapidly testing scripts, appropriately called Artillery.</p>",
			"addendum" : 'Source available on <a href="https://github.com/furusystems/barrage">GitHub</a>'
		},
		{
			"title":'Delta',
			"summary" : "Light tweening engine for Haxe",
			"image" : null,
			"body" : "<p>Delta is a tiny, dependency-free, fully cross platform tweening engine written in Haxe.</p><p>It arose from the need for a game development centric tweening solution with a lighter codebase and tighter control of global tween timing. Core features are simple type-safe tween function extensibility, per-component parameters, tween sequencing, event based synchronization of sequences, and a single core tick function to be driven by the game engine.</p><p>Delta is currently undergoing collaborative development with the intent to reduce reliance on reflection via macros, improve tween target type safety, and integrate Delta as the core tweening solution in <a href='http://underscorediscovery.github.io/snow/'>Snow</a>.</p>",
			"addendum" : 'Source available on <a href="https://github.com/furusystems/Delta">GitHub</a>'
		},
		{
			"title":'ShaderBlox',
			"summary" : "GLSL shader macro tools for Haxe",
			"image" : "img/shaderblox.jpg",
			"body" : "<p>Shaderblox allows a developer to write GLSL inline with Haxe code, using the power of macros to not only validate the source, but also generate static attribute and uniform handlers compile-time. This means shader integration and source validation is one and the same: A shader written in a way that does not conform with the rest of the source will simply block the build altogether, giving graphics developers compile-time error handling.</p><p>Shaderblox also allows a natural creation of ubershaders by leveraging class inheritance to construct complex shaders from smaller variations, and due to the macro-based approach also offers code completion hints for GLSL uniforms and more.</p>",
			"addendum" : 'Source available on <a href="https://github.com/furusystems/shaderblox">GitHub</a>'
		}
	];

	var next = function(){
		return Math.max(0, Math.floor(Math.random() * projects.length));
	};

	var projectDataService = function(){
		this.projects = projects;
		this.consume = function(){
			return projects.splice(next(), 1)[0];
		};

		return this;
	};

	angular.module("resume").factory("projectDataService", projectDataService);

})();