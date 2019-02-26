const Game = function() {

	this.player = new Game.Player(10, 10, 100, 10, 0, 0, 'red');

};

Game.prototype = {
	constructor: Game
};

Game.Player = function (x, y, width, height, speedX, speedY, color) {
	this.x = x;
	this.x = y;
	this.width = width;
	this.height = height;
	this.speedX = speedX;
	this.speedY = speedY,
	this.color = color
};

Game.Player.prototype = {

	constructor: Game.Player,

	moveLeft: function () {
		this.speedX = -1;
	},

	moveRight: function () {
		this.speedX = 1;
	}

};

