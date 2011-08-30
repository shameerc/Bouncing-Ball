/**
	Ball game 
	Author 	: Shameer
	mail 	: me@shameerc.com
**/

var Balls = function(options){
	
	var defaults   = {
				canvas : '#canvas',
				onstart : function(){},
				onstop : function(){},
				angle  : Math.PI/6
			};
	var options = $.extend({},defaults, options);
	var ctx, 
		CELL_SIZE 	= 5,
		C_WIDTH = 600, C_HEIGHT = 400;
	// directions
	var UP = 2, DOWN = 4, LEFT = 8, RIGHT = 16;

	var PI    = Math.PI;
	
	var angle 		= options.angle, 
		interval 	= 30, timer, // interval in ms
		radius 		= 10, 
		skip 		= 5
		vDir 		= DOWN,
		hDir 		= LEFT,
		barWidth 	= 100,
		displacement= 10;

	// ball position
	var lastHit = ball = {x:100,y:radius};

	// position of bar
	var bar = {x:100,y:0};

	canvas = $(options.canvas)[0];

	if(canvas.getContext('2d')){
		ctx = canvas.getContext('2d');
	}
	if(window.addEventListener){
		window.addEventListener('keypress',moveBar,false);
	}
	else if(window.attachEvent){
		window.attachEvent('keypress',moveBar,false);
	}


	function startGame(){
		timer = setInterval(gameLoop,interval);
	}
	function stopGame(){
		clearInterval(timer);
		options.onstop();
	}

	function gameLoop(){
		clearCanvas();
		drawBall();
		placeBar();
		checkCollission();
		setDirections();
		getCoords();
	}

	function drawBall(){
		ctx.fillStyle = 'orange';
		ctx.beginPath();
		ctx.arc(ball.x, ball.y,radius,0, 2*PI,false);
		ctx.fill();
	}

	// set the horizontal and vertical directions on 
	function setDirections(){
		if(ball.y + radius >= C_HEIGHT){
			lastHit = {x:ball.x,y:C_HEIGHT};
			vDir = UP;
		}
		else if(ball.y - radius <= 0){
			lastHit = {x:ball.x,y:0};
			vDir = DOWN;
		}
		else if(ball.x<=0){
			lastHit = {x:0,y:ball.y};
			hDir  = RIGHT;
		}
		else if(ball.x >= C_WIDTH){
			lastHit = {x:C_WIDTH,y:ball.y};
			hDir  = LEFT;
		}

	}


	// function to get the coordinates of the ball
	function getCoords(){

		// get the absolute value of difference in y coord
		// to be moved (For finding the x coords to be moved)
		yAbs    = Math.abs(ball.y-lastHit.y);	
		// to avoid multiplied by zero error
		if(yAbs == 0){
			newX = Math.tan(angle) * 1;
		}
		else{
			newX = Math.round( Math.tan(angle) * yAbs);
		}
		// if the ball is moving down
		// y must be added with the skip value
		if(vDir == DOWN){
			// if the direction is right
			// x must be added
			if(hDir == RIGHT){
				ball = {x: lastHit.x+newX, y : ball.y+skip};
			}
			else{
				// direction is left, so subtract the x
				ball = { x: lastHit.x-newX, y : ball.y+skip};
			}
		}
		else{
			// direction is up
			// subtract skip from y
			if(hDir == RIGHT){
				// direction is right, add x
				ball = { x: lastHit.x+newX, y : ball.y-skip};
			}
			else{
				// direction is left, subtract s
				ball = { x: lastHit.x-newX, y : ball.y-skip};
			}
		}
	}

	function placeBar(){
		ctx.save();
		ctx.translate(0,C_HEIGHT);
		ctx.fillStyle = 'blue';
		ctx.fillRect(bar.x, 0, barWidth, 10); 
		ctx.restore();
	}

	function moveBar(e){
		switch(e.keyCode){
			case 37 : changeBarPosition('left');
					  break;
			case 39 : changeBarPosition('right');
					  break;		  
		}
	}

	function changeBarPosition(dir){
		if(dir == 'right'){
			if((bar.x+barWidth) < C_WIDTH){
				bar.x += displacement;
			}
		}	
		else if(dir == 'left'){
			if((bar.x)>0){
				bar.x -= displacement;
			}
		}
	}

	function checkCollission(){
		if(ball.y+radius==C_HEIGHT && (
				(ball.x < bar.x) || (bar.x + barWidth) < ball.x ) ){
					stopGame();
				}
	}

	function clearCanvas(){
		ctx.clearRect(0,0,C_WIDTH+10,C_HEIGHT+10);
	}

	return {
		start : startGame
	};
}

$(function(){
	window.balls = new Balls({canvas : '#canvas'});
	balls.start();
})
