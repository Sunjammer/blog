I'm a huge fan of [japanese-style shooting games](https://www.youtube.com/watch?v=ZHqN_fH2S7k), and the problem of creating intricate bullet emission patterns based on dynamic properties such as emitter position vs player position has seen a number of attempted solutions over the years, perhaps most notably Kenta Cho's [BulletML](http://www.asahi-net.or.jp/~cs8k-cyu/bulletml/index_e.html).  

I struggled with the markup format (something Cho has also abandoned since) and making a decent Haxe implementation of his standard, so I decided to try making my own, simultaneously learning to write a proper DSL.  

While heavily inspired by BulletML, Barrage attempts to be a more verbally written, declarative language with implicit sequencing, and can be mapped to any particle system that implements a short interface and emits particles that implement another.  

Barrage has a Sublime language definition, and I also wrote a pseudo-IDE for rapidly testing scripts, appropriately called Artillery.  

Source available on [GitHub](https://github.com/furusystems/barrage).