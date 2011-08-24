/**
	Ball game 
	Author 	: Shameer
	mail 	: me@shameerc.com
**/

var Balls = function(canvas){
	
	
	var ctx, 
		CELL_SIZE 	= 5,
		C_WIDTH = 600, C_HEIGHT = 400;
	// directions
	var UP = 2, DOWN = 4, LEFT = 8, RIGHT = 16;

	var PI    = Math.PI;
	
	var angle 		= PI/4, 
		interval 	= 40, // interval in ms
		radius 		= 10, 
		skip 		= 5
		vDir 		= DOWN,
		hDir 		= LEFT;

	// ball position
	var lastHit = ball = {x:100,y:radius};

	canvas = $(canvas)[0];

	if(canvas.getContext('2d')){
		ctx = canvas.getContext('2d');
	}

	function startGame(){
		setInterval(gameLoop,interval);
	}

	function gameLoop(){
		clearCanvas();
		drawBall();
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

	function clearCanvas(){
		ctx.clearRect(0,0,C_WIDTH,C_HEIGHT);
	}

	return {
		start : startGame
	};
}

$(function(){
	window.balls = new Balls('#canvas');
	balls.start();
})