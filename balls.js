/**
* This is a game
**/

var Balls = function(canvas){
	
	// interval in ms
	var interval 	= 100, ctx, 
		CELL_SIZE 	= 5,
		C_WIDTH = 600, C_HEIGHT = 400;
	var MAX_X = C_WIDTH / CELL_SIZE;
	var MAX_Y = C_HEIGHT / CELL_SIZE;
	var PI    = Math.PI;
	var angle = PI/12, radius = 10, skip = 5;

	// ball position
	var intial=ball  = {x:100,y:radius};

	canvas = $(canvas)[0];

	if(canvas.getContext('2d')){
		ctx = canvas.getContext('2d');
	}

	function startGame(){
		setInterval(gameLoop,interval);
		//drawGrid();
		drawBall();
		//clearCanvas();
	}

	function gameLoop(){
		clearCanvas();
		getCoords();
		drawBall();
		//advanceBall();
	}

	function drawBall(){
		ctx.fillStyle = 'orange';
		ctx.beginPath();
		ctx.arc(ball.x, ball.y,radius,0, 2*PI,false);
		ctx.fill();
	}

	function getCoords(){
		currCords = ball;
		if(ball.x >= C_WIDTH || ball.y >= C_HEIGHT){
			ball = intial;
		}
		else{
			var newX = Math.tan(angle) * ball.y;
			ball = { x: intial.x+Math.round(newX), y : ball.y+skip};
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
		canvas.width = canvas.width;
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