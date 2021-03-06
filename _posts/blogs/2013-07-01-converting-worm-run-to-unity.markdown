--- 
layout: post
title: Converting Worm Run to Unity
categories: 
- Blog
tags: 
- dev blog
- openframeworks
- unity
- worm run
author: Mike
comments: true
---
Over here at Golden Ruby Games HQ we’ve been thinking a lot about how nice it would be to have <a href="https://itunes.apple.com/us/app/worm-run/id569497239?mt=8">Worm Run</a> work on Android devices. We read one too many articles <a href="http://www.gamasutra.com/blogs/GreggTavares/20130619/194639/Android_vs_iOS_Game_Myths.php">like this one</a> not to at least try. So off we go!

The only issue is that I wrote Worm Run in openFrameworks, a coding environment that I simply love to pieces, but which does not play nice with Android.(1) I could have fired up Eclipse and had a go at redoing the whole thing as a native Android app but that seemed pretty terrifying. So that left Unity, which I have experience in and is a great platform overall. Of course, this has the added benefit or making Worm Run portable to almost anything under the sun once it’s done, so that’s another point for Unity.

<a href="http://goldenrubygames.com/blog/converting-worm-run-to-unity/attachment/tumblr_inline_mp9spsgb4r1qz4rgp" rel="attachment wp-att-636"><img class="aligncenter size-full wp-image-636" title="tumblr_inline_mp9spsGB4R1qz4rgp" src="http://goldenrubygames.com/wp/wp-content/uploads/2013/07/tumblr_inline_mp9spsGB4R1qz4rgp.png" alt="" width="500" height="393" /></a>

I tend to work in C# with Unity anyway since I’m a C++ programmer at heart, but for this project there was no question since all of the existing Worm Run codebase is in C++ with a smattering of Objective C. In fact, a lot of the logic is similar enough that little needed to be changed besides the syntax of the code, although this seeming similarity does lead to confusion when things don’t work quite right. The only completely different thing is how the game is drawn to the screen.

##Display##

openFrameworks uses a frame based drawing scheme, where by default the entire screen is erased and redrawn for each frame, similar to Processing. Although this may seem initially confusing, I find it very easy to work with, as in any given frame I tell the system exactly what to draw, and anything I don’t specifically add doesn’t get drawn. Easy. At least I think so. Unity does not work this way. Once an object is added to the scene, it stays around, being drawn as long as it is active. As a result, there is almost no similarity to my spriteManager class from the original OF version of Worm Run and the new Unity version of the class I am working on now. So it goes. Both systems have advantages. You can see that so far, I only have one frame of zeke and a few ground blocks displaying in the game. Once I have the rest of the gameplay in, I am going to go back and put all of the sprites in.

##C++ != C\###

Rewriting the classes in Worm Run inevitably involves a lot more than just changing the syntax of the C++ code to fit the conventions of the C# that Unity is expecting. There have already been many head-against-the-desk moments of frustration when code that used to work fine is not causing the game to LOSE ITS GODDAMN MIND. Almost without fail, this is because me not properly considering how C# handles memory allocation and pointers differently from C++.

One quick example of this is the insanity that would sometimes happen when the game scrolled, that would cause the map to go crazy, with rooms spawning in broken ways and invisible blocks appearing in rooms.

In C++ the scroll function, if it was going left, each tile in the grid would be set be equal to the one next to it like this:

	roomGrid\[x,y\] = roomGrid\[x+1,y\];

Pretty straight forward, the tile in roomGrid at position x, y should be set equal to the tile in roomGrid at x+1 and the same y coordinate.(2) This worked fine in C++. But when I used similar code in Unity, this was the result:

<a href="http://goldenrubygames.com/blog/converting-worm-run-to-unity/attachment/tumblr_inline_mp9swlvr8i1qz4rgp" rel="attachment wp-att-637"><img class="aligncenter size-full wp-image-637" title="tumblr_inline_mp9swlvR8i1qz4rgp" src="http://goldenrubygames.com/wp/wp-content/uploads/2013/07/tumblr_inline_mp9swlvR8i1qz4rgp.png" alt="" width="500" height="371" /></a>

That’s no good. The reason was that when I tried to set my tile equal to another tile, C\# didn’t copy the data from roomGrid\[x+1,y\] into roomGrid\[x,y\]. It just had the roomGrid\[x,y\] point to roomGrid\[x+1,y\], essentially linking them so they became one tile and changes made to one would be made to the other. That’s very bad. The solution is pretty simple (have roomGrid\[x,y\] create a new Tile with data identical to roomGrid\[x+1,y\]), but lord if it didn’t take me a few hours to figure it out.

That’s the joy of going between two similar languages. Similar doesn’t mean identical, but it’s easy to get lazy and expect code that worked in one environment to automatically work in the other one just because it compiled without an issue.

##Reading the Map##

There have been other, funny little issues. One that I found amusing was my map debugger. The level generation in Worm Run is relatively complex, so when I was creating it, it was extremely important for me to be able to view the entire map, as opposed to just the tiny section on screen. The grid is broken up into 12X12 tile rooms, so I found being able to see the entire grid of 36X36 rooms was the most useful way for me to read this data. For the iOS build, I added a printMap() function that converted the rooms to two sets os ASCII values, one showing which rooms have been explored and one that showed the direction of the path that each of these rooms represented. Both maps showed the location of the player and the current end of the map (that would be where new rooms were built once the player got close). These maps could easily be printed to the console, and actually tended to look pretty cool in the style of classic rouge likes.

<a href="http://goldenrubygames.com/blog/converting-worm-run-to-unity/attachment/tumblr_inline_mp9t0tqmhx1qz4rgp" rel="attachment wp-att-638"><img class="aligncenter size-full wp-image-638" title="tumblr_inline_mp9t0tqmHX1qz4rgp" src="http://goldenrubygames.com/wp/wp-content/uploads/2013/07/tumblr_inline_mp9t0tqmHX1qz4rgp.png" alt="" width="451" height="371" /></a>

Unfortunately, printing to the Unity console did not work nearly as well as it simply isn’t designed to show huge blocks of text in a single output.

<a href="http://goldenrubygames.com/blog/converting-worm-run-to-unity/attachment/tumblr_inline_mp9t1pbarz1qz4rgp" rel="attachment wp-att-639"><img class="aligncenter size-full wp-image-639" title="tumblr_inline_mp9t1pBaRZ1qz4rgp" src="http://goldenrubygames.com/wp/wp-content/uploads/2013/07/tumblr_inline_mp9t1pBaRZ1qz4rgp.png" alt="" width="287" height="304" /></a>

So that wasn’t working. I figured I could show the output on screen somewhere, but it was really important to me to have access to it after the game had stopped since I often debug by examining the map and seeing where something went wrong. The solution I settled on is a bit silly, but works and took about 2 minutes to implement. What I am currently doing is saving the map output to a text file on my machine, which I preview along side the Unity window. I’m working on a Mac which constantly checks files being previewed for changes, so when I overwrite the map file, it is automatically updated, acting as a secondary display. And for times when I want to be able to compare subsequent map outputs, I just change to path that the text file is saved to to have the frame number at the end, creating a chronological list of maps printed by the game. Almost certainly not the most conventional solution, but it was fast and it works.

<a href="http://goldenrubygames.com/blog/converting-worm-run-to-unity/attachment/tumblr_inline_mp9t3j2yla1qz4rgp" rel="attachment wp-att-640"><img class="aligncenter size-full wp-image-640" title="tumblr_inline_mp9t3j2yLa1qz4rgp" src="http://goldenrubygames.com/wp/wp-content/uploads/2013/07/tumblr_inline_mp9t3j2yLa1qz4rgp.png" alt="" width="500" height="249" /></a>

##Closing##

We’re about a week into the conversion, and overall I’m learning a lot about both Unity and how Worm Run works. Recreating the game in a  different environment has spawned a lot of insights into exactly how my game functions that were easy to overlook when creating it the first time as well as an interesting look into how the openFrameworks environment I was building it in shaped the architecture of the game. We’ll keep plugging away at it and with any luck, all you folks with Android devices will be playing it soon!

(1) Yes, <a href="http://www.multigesture.net/articles/how-to-setup-openframeworks-for-android-on-windows/">openFrameworks can deploy to Android</a>, and I have gotten oF apps to run on Android devices but it has never been easy and in my experience the apps I have gotten to run on Android did not perform well.

(2) obviously there was more that happened when the game scrolled, but this is really about all that happened to the grid tiles. When this happened, the tiles at far right would be removed from the game as they had been scrolled out of the game.
