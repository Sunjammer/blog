# From Flash to GPU 
### A simpleton's introduction to rendering with OpenGL and Stage3D written with Flash developers in mind

#### _Disclaimer_
<i>We are on this journey together. I don't consider myself an expert by any stretch, and to be frank, writing this set of articles is something I've put off doing for ages simply because I've convinced myself people would be better off finding their information elsewhere. I consider myself a "happy amateur": I know enough to solve the problems that I have encountered, and I've reached that peak where I have to actively look for problems to solve, rather than encountering them constantly as I work. This will not be an attempt to Carmack it: This is a set of articles about getting you over the hump and through the door, not about teaching you best practises, awesome powermoves or how to hack the Pentagon. I want to get you to the place I got to, where I no longer feared the challenge or found it irritating, but grew to enjoy it.

There, impostor syndrome satisfied. Let's go!</i>

### Index
1. **History and preface**
2. [Clients and servers](./flash2gpu2.html)
3. Shaders and buffers
4. Pixels and screens
5. ...more to come

### Part 1: History and preface
----

Flash was always an incredible place to learn graphics techniques, and it was, I think, a platform imbued with a strong spirit of playfulness and community. Part of this was because it was a free platform with mature tooling and a rich API that made solving moderately complex problems in areas such as networking, text rendering and such absolutely trivial, but it was a prolific platform that made it easy to showcase your work. In the Flash community, pushing Flash that one elusive step further was a collective effort, and as we pushed it we pushed Macromedia and later Adobe: We wouldn't have gone from a bare-essentials mouse-based scripting interface in Flash 4 to AS3, Flex, generative audio and Stage3D if the community hadn't fought for those features.

The past few years, largely thanks to Adobe's pitiful lack of backbone and confidence in its own assets, have seen a massive exodus of developers from the Flash platform to a variety of new arenas, all in search of a new place to exercise that richness. Unity is one popular destination, though the idea that "all" Flash developers were game developers seems a bit silly. For those of us with a more general purpose approach to the platform, the variety of game-developer-targeting solutions are less appealing. So where does that leave us? Where can we go to make *everything* like we used to?

Flash had a prominent achilles heel: It was built around a software renderer. I find it irritating to hear outsiders "explain" to others that if only Flash hadn't been programmed by simians and it had been "using the GPU like it should" it would've all been great. This used to happen all the freaking time, and it drove me nuts. Flash has an unbelievably sophisticated software renderer incorporating features that you would have to pay thousands of dollars in middleware to do on the GPU with a similar ease. The mind frankly boggles to try and enumerate the entire spectrum of rendering Flash can offer and composite in such a tiny package. For any developer, Flash's software rendering capabilities should be an inspiration, not a point of derision.

The idea, overall, seems to be that hardware-acceleration is a checkbox or a flag in a config file, that it is universally better and has no drawbacks, and that all you have to do is enable it for the trivial win. 

The fact of the matter is that software rendering is its own field with its own tricks for a reason. Among Flash game developers, finding ways to manipulate the BitmapData API to emulate the image-blitting tricks of the games of the 80s to mid 90s became the go-to way to achieve performant, expressive game graphics, foregoing the majority of the Flash renderer for a single image on screen being redrawn every frame.

Every old trick applied. Partial updates, double buffering, image buffer effects, full screen color transformations.. It was exciting to be given such a rich bitmap API to do everything from 3D particle rendering, blob detection, photo effects, fast 2D game graphics and god knows what else. Paired with the Flash renderer's filter effects and blend modes, a startling range of visuals could be achieved.

But all of this occured single threaded on the CPU, and when the mobile era hit, it became screamingly obvious that a) drowning in horsepower on desktop for too long had left us spoiled, and b) mobile devices just weren't happy with running CPU-intensive code on a tiny virtual machine. Adobe went to some admirable lengths to get around this, but at the end of the day, if the developer insists on doing a big chunk of processing on a bitmap to be presented, framerates are going to take a nose dive, and that's before factoring in the actual processing needs of the application itself.

Now there were many ways to hack and bend a workable thing out of Flash on mobile, but productivity took a real hit as developers realized that the lengths they'd have to go and the compromises they'd have to make were taking a big cut out of their vision. Adobe understood that they'd have to throw in the towel and start divorcing themselves from the software renderer. StageVideo and Stage3D, two hardware accelerated graphics APIs, were both born from the express need to have GPU-based rendering on mobile targets, with desktop platforms a second priority.

Personally, I found attempting to adapt to Stage3D and the concepts of a programmable graphics pipeline very jarring. I'd become accustomed to blitting and efficiently manipulating bitmaps, and here was an almost completely separate way to go about putting pixels on a screen. Paired with Adobe's baffling omission of a user-friendly shader language, foregoing something like Pixelbender for the hostility of assembly-level AGAL, It seemed directly counterintuitive. 

I wasn't unaware of what OpenGL and DirectX were and the complexity they represented: I'm a curious guy, of course I'd made half-hearted and naive attempts at learning that stuff before, but now, being faced with *having to* learn, I found the experience genuinely disheartening.

My perspective has shifted quite radically the past couple of years. For one, I led a project where we built a visual programming tool for designers, and I learned what happens when you give someone actual freedom. It turns out that if you offer someone the ability to "do whatever, go nuts", analysis paralysis sets in big time, and with it a deep lack of confidence. Only with time, as the team established its own internal best practises, makeshift "development patterns" helped the users stop worrying so much about all the places they can go, but rather about the places they needed to go. 

I learned about the disabling anxiety of freedom, and it inspired me to grit my teeth and get back into GPU rendering. Overcome my anxiety of the unknown.

With Stage3D or OpenGL, you do indeed find yourself on such a vast, open plain. You
've left the safety of a warm home, with your safe grids of colored blocks, set rules, known quantities. 
Instead, you inhabit a world of snarling unpredictability, where programs can and will look radically different depending on the hardware they run on. Not by error, but because you designed them to adapt in such a way. 

It is also a place where you play god. Learning hardware accelerated rendering is not really about adapting established paradigms and following in the footsteps of others, though you undoubtedly will for the most part once you've acclimatized your brain to it.

It's a place where you will define the world's basic appearance, from the atomic building blocks of the reality it's based on to the individual imperfections in the home-brewed lens it is viewed through. 

(_or just draw some sprites to the screen and color them or whatever_)

And it's going to render orders of magnitude faster than anything you could do in Flash.

----

In part 2, we'll get into the fundamental differences between software and hardware rendering and the client/server relationship between your cpu-bound software and the graphics hardware.

Copyright © 2014 Doomsday Device Labs.

<div id="disqus_thread"></div>
<script type="text/javascript">
    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    var disqus_shortname = 'aronning'; // required: replace example with your forum shortname

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
<a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>