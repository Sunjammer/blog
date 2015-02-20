# From Flash to GPU 
### A simpleton's introduction to rendering with OpenGL and Stage3D written with Flash developers in mind

### Index
1. [History and preface](./flash2gpu1.html)
2. **Clients and servers**
3. Shaders and buffers
4. Pixels and screens
5. ...more to come

### Part 2: Clients and servers
----

The GPU is, as its name implies, a separate processing unit, whose job it is to take rendering tasks from the CPU and execute them independently, freeing CPU cycles for other tasks. The primary benefit these days is simply that a GPU is entirely designed around the kind of massively parallel processing required to fill a high definition display with pixels, and in terms of modern GPUs this implies actually significant processing ability per pixel as well. 

In Flash, imagine you want to create a "fullscreen" heat distortion effect, offsetting pixels horizontally by an offset determined by that line's vertical index. A direct approach would imply you'd probably draw your game's "base frame" to one bitmapdata, then line-by-line copyPixels that bitmapdata onto another one top-down, applying your offset as you went. 

Say you are targeting a stable 60 frames per second, like a Good Citizen. This gives you a precious 16 milliseconds *total* of available CPU time, not only to process input, audio and actual gameplay events, but to complete a frame of video and put it on screen. At 60hz, every millisecond counts in a way that will make grown men cry. And here you are, spending precious milliseconds copying pixels line-for-line. No wonder you're drastically dropping your frame and line resolution to get at an acceptable rate.

It would be wrong to say that Flash does not use the GPU by default. As you produce frames, Flash's software renderer does provide them to the GPU to present on screen. It just doesn't actually leverage the GPU in their *generation*.

**Graphics remoting**

Now, talking to a separate processing unit with its own specific world view sounds complicated (and if it doesn't it probably should), not least because of synchronization issues. In Flash, we are used to synchronicity: The idea that once line 1 completes running, its results are available to line 2. And as Flash developers we know how much we wish Loader.loadBytes was synchronous, or how having to deal with async remote calls complicates the way you have to think.

This latter example applies directly to programming against a GPU. Most if not all GPU programming APIs use the server/client metaphor, the GPU standing in for the server, and the program running on the CPU as the client. When you issue commands to the GPU, you do so in a fire-and-forget kind of way, trusting the commands to arrive, to be buffered in sequence (they always do), and for that buffer of commands to be executed as quickly as possible. Note that it is possible to ask the GPU to draw to the screen far more often than is plausible: It will simply try to get things done as quickly as it can, come what may, ruined framerate and all. 

In either case the important distinction from synchronous graphics programming here is simply that your CPU commands are lightweight, but the resulting GPU computation is not. 

Broadly speaking then, the goal when rendering on the GPU is to offload as much work as possible onto the server, while weighing the CPU cost of rendering calls versus their GPU cost. It is significantly more expensive to define geometry, textures and shaders than it is to tell the GPU to use them.

There are lots of ways to read back from the GPU and make properly CPU synchronized calls, but doing so denies you the basic benefit of hardware accelerated rendering, locking your CPU while waiting for the GPU to finish.

**Render state**

When googling GPU topics you'll come across this term a lot, and what it generally refers to is the state machine nature of the GPU. If you're not familiar with state machine principles, I strongly recommend doing the research, as it's one of the most if not the most useful programming principles I've come across. The simplest example is the light switch, which can only ever be on or off. It helps to think of the GPU as a room full of light switches. Each can be flipped at any time, but flipping one has implications for others, and wether they are on or off. Thus, one state change depends on others. For instance, while OpenGL has a number of functions that affect textures, you have to tell it which texture those functions are acting on by making state changes. This, as it turns out, makes a lot of things simpler structurally. For instance, a CPU function that does a number of actions on a texture can be easily reused since the state change that tells the GPU which texture is the current one can be made elsewhere.

You generally want to minimize such state changes since they can obviously be made redundant. All CPU time spent telling the GPU to bind the same texture that is already bound is not only wasting CPU time, but wasting GPU time as well. Bad programmer.

The server/client metaphor helps here too. Imagine that you are about to send an IM through the world's dumbest remote service. First, you tell the remote service which user you want to interact with. Then, you tell the remote service you want to send a message, as opposed to a file or whatever. Finally, you send data to the service. It knows to expect a text message, so the format of your data does not matter. It also knows which user to send to.

You can commonly see this kind of stuff naively implemented with all data embedded in the same call. For instance "username:datatype:data". Given that the next few messages goes to the same user with the same datatype though, we are sending more information than is needed with every message, adding processing time on the client and server side, not to mention bandwidth.

----

We've looked at how APIs like Stage3D and OpenGL present a way to asynchronously provide the graphics hardware with a list of commands to execute to generate a frame, rather than eating up CPU time to do the same job. In part 3, we'll look at the two main building blocks of a frame: The shader and the buffer. 

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