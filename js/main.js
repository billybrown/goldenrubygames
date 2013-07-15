

function createCanvas() {

	var ww = window.innerWidth;
	var wh = window.innerHeight;
	var canvas = document.getElementById('lights');
    var ctx = canvas.getContext('2d');
	ctx.canvas.width = 400;
	ctx.canvas.height = wh;

	// colors
	var primary = '#fcb24c';
	var secondary =  '#f89734';
	var tertiary = '#e87d3d';

    // Make sure we have a valid defintion of requestAnimationFrame
    var requestAnimationFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            function(callback) {
                return setTimeout(callback, 16);
            };

    // define our objects
	var light1 = {
		'point1_x': 225,
		'point1_y': 0, 
		'point2_x': 275,
		'point2_y': 0, 
		'point3_x': 50,
		'point3_y': 750, 
		'point4_x': 0,
		'point4_y': 750, 
		'opacity': 0,
		'color1_stop': 0,
		'color2_stop': 0.8,
		'ray': 100
	}
	
	var light2 = {
		'point1_x': 275,
		'point1_y': 0, 
		'point2_x': 325,
		'point2_y': 0, 
		'point3_x': 100,
		'point3_y': 750, 
		'point4_x': 50,
		'point4_y': 750, 
		'opacity': 0,
		'color1_stop': 0,
		'color2_stop': 0.8,
		'ray': 100
	}
	
	var light3 = {
		'point1_x': 325,
		'point1_y': 0, 
		'point2_x': 375,
		'point2_y': 0, 
		'point3_x': 150,
		'point3_y': 750, 
		'point4_x': 100,
		'point4_y': 750, 
		'opacity': 0,
		'color1_stop': 0,
		'color2_stop': 0.8,
		'ray': 100
	}

	// function for rendering light objects
	var renderlight = function(light) {
		var lingrad = ctx.createLinearGradient(0,0,0,light.ray);
	    lingrad.addColorStop(light.color1_stop, 'rgba(246,178,84, ' + light.opacity + ')');
	    lingrad.addColorStop(light.color2_stop, 'rgba(0,0,0, ' + 0 + ')');
	    ctx.fillStyle = lingrad;
		ctx.beginPath();
		ctx.moveTo(light.point1_x, light.point1_y);
		ctx.lineTo(light.point2_x, light.point2_y);
		ctx.lineTo(light.point3_x, light.point3_y);
		ctx.lineTo(light.point4_x, light.point4_y);
		ctx.closePath();
		ctx.fill();
	}

	// mother function of actions
    var render = function() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw objects
		renderlight(light1);
		renderlight(light2);
		renderlight(light3);
        
        // Redraw
        requestAnimationFrame(render);
    };

    // Start the redrawing process
    render();

    var animate = function() {


      var step = function() { 
        // Update the lights opacity property
        if (light1.ray < 400) light1.ray += 2;
        if (light2.ray < 400) light2.ray += 4;
        if (light3.ray < 400) light3.ray += 3;
        if (light1.opacity < .5) light1.opacity += .007;
        if (light2.opacity < .7) light2.opacity += .005;
        if (light3.opacity < .3) light3.opacity += .01;

        
        // If the animation hasn't finished, repeat the step.
        if (light1.opacity < .5 || light2.opacity < .7 || light3.opacity < .3) requestAnimationFrame(step);  	
      }
      
      // Start the animation
      return step();
    };
    
    animate();

}


// when the page loads
$(document).ready(function() {

	createCanvas();
	window.setTimeout(function() {
    	$('.logo').addClass('appear');
	}, 1000);


});

// after the page loads
$(window).load(function() {

	var windowwidth = $(window).width();
	if (windowwidth > 608) {
			//////////////////////////////////////////////////////////////////////////////
			//equal height on load - articles
			var currentTallest2 = 0;
	    	$('.game').each(function(i){
					if ($(this).height() > currentTallest2) { 
						currentTallest2 = $(this).height(); 
					}
			});
			$('.game').css('min-height', currentTallest2); 
			
	}

});


// when the window resizes and only once after it resizes
$(window).resize(function () {

});