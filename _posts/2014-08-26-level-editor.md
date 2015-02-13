---
layout: post
title: Level editor
category: development
comments: true
---

{% include post-img.html img="GC-Level-Editor-Screenshot.png" img_preset="post_full" alt="Manowar level editor screenshot" %}

The level editor for Manowar was built in Flash. 

This was for a few reasons, mainly for it's visual focus, the handy component system as 
well as the ability to write helper JSFLs to add functionality to the Flash authoring 
environment.

The basic workflow is as follows:

- A JSFL linked to a keyboard shortcut creates a new unique level based on a template sprite.
- Flash components representing each game object are dragged and dropped onto the level 
and component params adjusted to suit.
- Layout is cleaned up with built in alignment tools and custom 'snap to pixels' JSFL.
- A keyboard short cut launches the AIR file which saves serialised level data directly into the 
project directory and then runs XCode.

Working in the IDE had other unforeseen advantages, such as the ability to create a guide
layer to sketch the planning of the level. SPOILER ALERT below.

{% include post-img.html img="Level-editor-sketch.png" img_preset="post_med" alt="Level editor planning sketch" %}

The above may look like a speed addict's scrawling on a toilet stall, though these
lines actually help plan the level while building it.

The IDE editor was very quick to build and the component system makes it a breeze to add 
new game objects when needed. Its biggest downside is that no-one else can 
have a go at making new levels without first having Flash on their computer. This proved 
inconvenient and limiting. It's a shame there was such a barrier to getting some fresh 
perspectives on level design. 

At the end of the day though the other advantages of the system, chiefly its rapid 
development and ease of use, have justified going down this path.




