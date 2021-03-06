var canvas = document.getElementById("myCanvas");
	
	// constants
	const ballRadius = 20
	const paddleHeight = 200; paddleWidth = 20;
	const maxVelocity = 20
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let height = canvas.height
	let width = canvas.width

	//game state variables
	let x = 500; y = 50;
	let mouseY;
	let computerScore = 0; userScore = 0;
	let xVel = maxVelocity; yVel = maxVelocity;
	let increment = 0
	

	// user control y-axis
	canvas.addEventListener('mousemove', function(e){
		mouseY = e.y
	});

	var c = canvas.getContext('2d');


		game()

	function resetBall(){
		 x = Math.random() * 500 + 1; y = 50;
		 xVel = maxVelocity; yVel = Math.random() * maxVelocity;
		increment = 0
		 
	}

	function game(){
		x += xVel;
		y += yVel;
		// ball hits LR wall
		if(x >= width - ballRadius){
			resetBall()
			userScore++;
		} else if(x <= ballRadius){
			resetBall()
			computerScore++;
		}
		// ball hits TB wall
		if(y >= height - ballRadius || y <= ballRadius){
			xVel = xVel;
			yVel = -yVel;
		}

		c.clearRect(0, 0, canvas.width, canvas.height);
		c.font = "30px Arial";
		c.fillText(userScore, width / 2 - 75, 50);
		c.fillText(computerScore, width / 2 + 75, 50);
     	c.fillStyle = "rgb(150,29,28)";
   		c.beginPath(); 
   		c.arc(x, y, ballRadius, 0, Math.PI * 2, true);  

		c.fillRect(width - 50, y - paddleHeight / 2, paddleWidth, paddleHeight)  //AI paddle
		c.fillRect(30, mouseY - paddleHeight / 2, paddleWidth, paddleHeight)  // User paddle
		if(y >= mouseY - paddleHeight / 2 && y <= mouseY + paddleHeight / 2  && x <= 60){ // ball hits user paddle
			let hitPosition = (mouseY - y) / (paddleHeight / 2);
			xVel = maxVelocity * Math.cos(hitPosition) + increment
			yVel = maxVelocity * Math.sin(hitPosition) + increment
			increment++
		} else if(y >= y - paddleHeight / 2 && y <= y + paddleHeight / 2  && x >= width - 60){  // ball hits AI paddle
			xVel = -xVel;
			yVel = yVel;
		}
   		c.fill();
		c.closePath(); 
		requestAnimationFrame(game)
	}

