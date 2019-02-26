const Player = function(x, y, width, height, color) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;

	this.speedX = 0;
};

Player.prototype = {

	constructor: Player,

	update: function () {
		
		this.x += this.speedX;
		this.speedX *= 0.95;
		this.checkBorders();
	},

	moveLeft: function () {		
		this.speedX = -2;		
	},

	moveRight: function () {
		this.speedX = 2;
	},

	checkBorders: function () {
		if (this.x < 0) {this.x = 0};
		if (this.x + this.width > 640) {this.x = 640 - this.width};
		/*if (this.x + this.width > document.querySelector('canvas').width) {
			this.x = document.querySelector('canvas').width - this.width;
		};*/
	}
};