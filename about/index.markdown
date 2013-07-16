---
layout: page
title:  "The Company"
categories: about

staff:
- image: /img/staff1.jpg
  name: Mike Christatos
  role: Founder/COO
  description: Mike is a graduate from Wake Forest University’s Business School with a background in publishing. After losing his common sense, he decided to open a video game development company in New York City. He lives in New York and can usually be found playing embarrassing JRPGs or debating the validity of the Zelda timeline.
  email: mike@goldenrubygames.com
- image: /img/staff2.jpg
  name: Andy Wallace
  role: Lead Programmer/Developer
  description: A graduate of the MFA Design and Technology program at Parsons, Andy Wallace is a game maker, animator, and coder, with a love of all things interactive. He lives in NYC and is looking forward to when he can move into a place that allows dogs.
  email: andy@goldenrubygames.com
---

#{{ page.title}}#
</br>

Golden Ruby Games is a small, indie-game company located in New York City. We are dedicated to making unique and memorable games for everyone.

After opening doors on June 1st of 2012, Mike and Andy started work on their first game: *[Destroy All Color!][destroy-itunes]* for iOS. A sleeper hit, Destroy was praised for it’s innovative control scheme and unique gameplay mechanics. With Golden Ruby’s first game completed, the company set out to differentiate itself within the gaming industry, specifically the New York City gaming industry.

Approached by NBC Universal, Atlantic Records and the Empire State Building, Golden Ruby is positioning itself for the future of interactive technology on the east coast. Golden Ruby plans to position itself as one of the stand-out development houses in New York and the nation.

After *Destroy!* was released, Golden Ruby refocused their efforts on their second game; Worm Run. The company enlisted the help of the extremely talented artist Nicolas Cinqugrani. Worm Run is set for release for this February for iOS.

<ul class="no-list staff">
	{% for item in page.staff %}
	<li>
		<div class="staff-photo">
			<img src="{{item.image}}" alt="{{item.name}}"/>
		</div>
		<h2>{{ item.name}} - {{item.role}}</h2>
		<p>{{item.description}}</p>
		<p><a href="mailto:{{item.email}}">{{item.email}}</a></p>
	</li>
	{% endfor %}
</ul>

[destroy-itunes]: https://itunes.apple.com/us/app/destroy-all-color!-hd/id549937765?mt=8
