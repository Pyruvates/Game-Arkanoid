const Ball = function (x, y, r, color) {
	this.x      = x;
	this.y      = y;
	this.radius = r;
	this.color  = color;
	this.speedX = 0;
	this.speedY = 0;

	this.allowedToCollide = true;
	this.timeOfCollision = undefined;

	this.isInGame = false;
};

Ball.prototype = {
	constructor: Ball,

	update: function () {
		this.bounceFromWalls();
		this.x += this.speedX;
		this.y += this.speedY;		
	},

	bounceFromWalls: function () {
		if (this.x + this.radius >= 640) {this.speedX *= -1};
		if (this.x - this.radius <= 0) {this.speedX *= -1};
		if (this.y - this.radius <= 0) {this.speedY *= -1};
	}
};