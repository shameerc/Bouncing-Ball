/**
	Snake game 
	Author 	: Shameer
	mail 	: me@shameerc.com
**/

var Balls = function(canvas){
	
	// interval in ms
	var interval 	= 50, ctx, 
		CELL_SIZE 	= 5,
		C_WIDTH = 600, C_HEIGHT = 400;
	// directions
	var UP = 2, DOWN = 4, LEFT = 8, RIGHT = 16;

	var MAX_X = C_WIDTH / CELL_SIZE;
	var MAX_Y = C_HEIGHT / CELL_SIZE;
	
	var PI    = Math.PI;
	
	var angle = PI/4, 
		radius = 10, 
		skip = 5
		vDir = DOWN,
		hDir = LEFT;

	// ball position
	var lastHit= ball = {x:300,y:radius};

	canvas = $(canvas)[0];

	if(canvas.getContext('2d')){
		ctx = canvas.getContext('2d');
	}

	function startGame(){
		setInterval(gameLoop,interval);
		//drawGrid();
		//drawBall();
		//clearCanvas();
	}

	function gameLoop(){

		clearCanvas();
		drawBall();
		setDirections();
		getCoords();
		//advanceBall();
	}

	function drawBall(){
		ctx.fillStyle = 'orange';
		ctx.beginPath();
		ctx.arc(ball.x, ball.y,radius,0, 2*PI,false);
		ctx.fill();
	}

	// set the horizontal and vertical directions on 
	function setDirections(){
		if(ball.y >= C_HEIGHT){
			lastHit = {x:ball.x,y:C_HEIGHT};
			vDir = UP;
		}
		else if(ball.y <= 0){
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

	function getCoords(){
		currCords = ball;

		
		if(vDir == DOWN){

			if(hDir == RIGHT){
				if(lastHit.y == ball.y){
					newX = Math.tan(angle) * 1;
				}
				else{
					newX = Math.tan(angle) * (ball.y-lastHit.y);
				}	
				ball = { x: lastHit.x+Math.round(newX), y : ball.y+skip};
			}
			else{
				if(lastHit.y == ball.y){
					newX = Math.tan(angle) * 1;
				}
				else{
					newX = Math.tan(angle) * (ball.y-lastHit.y);
				}
				ball = { x: lastHit.x-Math.round(newX), y : ball.y+skip};
			}
			
		}
		else{
			if(hDir == RIGHT){
				if(lastHit.y == ball.y){
					newX = Math.tan(angle) * 1;
				}
				else{
					newX = Math.tan(angle) * (lastHit.y - ball.y);
				}
				ball = { x: lastHit.x+Math.round(newX), y : ball.y-skip};
			}
			else{
				if(lastHit.y == ball.y){
					newX = Math.tan(angle) * 1;
				}
				else{
					newX = Math.tan(angle) * (lastHit.y - ball.y);
				}
				//console.log(lastHit.y + ' --- '+ ball.y +'--- newX  ' + newX);
				ball = { x: lastHit.x-Math.round(newX), y : ball.y-skip};
				
			}
		}
		//console.log(ball.y);
	}

	function drawGrid(){
		ctx.strokeStyle = '#cdcdcd';
		for(var i = 0; i< C_WIDTH; i = i +CELL_SIZE){
			//console.log(i);
			ctx.beginPath();
			ctx.moveTo(i,0);
			ctx.lineTo(i,C_HEIGHT);
			ctx.stroke();
			if(i<C_HEIGHT){
				ctx.moveTo(0,i);
				ctx.lineTo(C_WIDTH,i);
				ctx.stroke();
			}
		}
	}

	function clearCanvas(){
		ctx.clearRect(0,0,C_WIDTH,C_HEIGHT);
	}

	function roundNumber(num, dec) {
		var result = Math.round( num * Math.pow(10,dec)) / Math.pow(10,dec);
		return result;
    }

	return {
		start : startGame
	};
}

$(function(){
	window.balls = new Balls('#canvas');
	balls.start();
})