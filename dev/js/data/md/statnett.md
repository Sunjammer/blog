This installation, written on a very tight schedule, used a pair of standard web cameras to detect motion, driving a particle system which in turn drove a custom hardware-accelerated renderer.  

To overcome situational hardware limitations, the renderer and physics simulation was required to run on a pair of networked clients drawing to four screens each, synchronized using deterministic techniques and a UDP clock server. No external libraries were used.  

This exhibit, consisting of instances of three separate applications, exemplifies my hand-coded approach of avoiding external dependencies unless necessary and using netcode to modularize exhibit components.  

Written in [Haxe](http://www.haxe.org) for [Expology](http://www.expology.no) targeting Adobe AIR with Stage3D.