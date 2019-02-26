//const ctx = document.getElementById('canvas').getContext('2d');

const engine     = new Engine(1000/30, update, render);

const collider   = new Collider();
const controller = new Control();
const display    = new Display( document.querySelector('canvas') );
const player     = new Player(+document.querySelector('canvas').width/2 - 50, +document.querySelector('canvas').height - 20, 100 , 10, 'red');
const ball       = new Ball(player.x + player.width/2, player.y - 12, 10, 'blue');

let score = 0;
let playerLife  = 3;

let bricks = [];

for (let i = 0; i < 5; i += 1) {
	for (let j = 0; j < 10; j += 1) {
		let brick = new Brick(j*50 + 60, i*50 + 30, 40, 15);
		bricks.push(brick);
	};
};

function update () {

	if (!controller.space.active) {
		if (controller.left.active)  {player.moveLeft()};
		if (controller.right.active) {player.moveRight()};

		if (!ball.isInGame) {
			if (controller.up.active) {
				ball.isInGame = true;
				ball.speedY   = -3;
				ball.speedX   = player.speedX;
			};
		};

		if (ball.allowedToCollide) {
			if ( collider.collideCircleWithRect(ball, player) ) {
				console.log('Collide!');
				let deltaX   = ball.x - (player.x + player.width/2);
				ball.speedX  = deltaX * 0.1;

				ball.speedY *= -1;

				ball.allowedToCollide = false;
				ball.timeOfCollision  = window.performance.now();
			}

		} else if ( ball.timeOfCollision < window.performance.now() - engine.timeStep * 5) {
			ball.allowedToCollide = true;
			ball.timeOfCollision  = undefined;
		};

		for (let i = bricks.length - 1; i >= 0; i -= 1) {
			if ( collider.collideCircleWithRect( ball, bricks[i] ) ) {
				ball.speedY    *= -1;
				bricks[i].state += 1;

				if (bricks[i].state >= bricks[i].states.length) {
					bricks.splice(i, 1);
					score += 2;
				} else {
					bricks[i].color = bricks[i].states[bricks[i].state];
					score += 1;
				};			
			};
		};
		
		player.update();

		if (ball.isInGame) {
			ball.update();
		} else {
			ball.x = player.x + player.width/2;
			ball.y = player.y - 11;
		};

		if ( ball.y > document.querySelector('canvas').height + ball.radius * 4) {
			ball.isInGame = false;
			ball.speedX   = 0;
			ball.speedY   = 0;

			ball.x = player.x + player.width/2;
			ball.y = player.y - 11;

			playerLife -= 1;
		}
	};

	if (playerLife < 1) {
		restart();
	};

};

function render () {
	display.clearScreen('black');
	display.drawCircle(ball.x, ball.y, ball.radius, ball.color);
	display.drawRect(player.x, player.y, player.width, player.height, player.color);
	display.drawText('Score: ' + score, 5, 15, 'white', 16);
	display.drawText('Life: ' + playerLife, document.querySelector('canvas').width - 45, document.querySelector('canvas').height - 465, 'white', 16);
	
	for (let i = bricks.length - 1; i >= 0; i -= 1) {
		display.drawRect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height, bricks[i].color);
	}

	display.render();
	
};

window.addEventListener('keydown', controller.handleKeyDownUp);
window.addEventListener('keyup', controller.handleKeyDownUp);
window.addEventListener('resize', display.handleResize);

function restart () {
	score = 0;
	playerLife = 3;

	ball.isInGame = false;
	ball.speedX = 0;
	ball.speedY = 0;
	ball.x = player.x + player.width/2;
	ball.y = player.y - 11;

	bricks = [];

	for (let i = 0; i < 5; i += 1) {
		for (let j = 0; j < 10; j += 1) {
			let brick = new Brick(j*50 + 60, i*50 + 30, 40, 15);
			//bricks[i].color = bricks[i].states[bricks[i].state];
			bricks.push(brick);
		};
	};
	
};

engine.start();

