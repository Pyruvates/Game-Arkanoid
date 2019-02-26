const Brick = function (x, y, width, height) {
	this.states = ['white', 'yellow'];

	this.x      = x;
	this.y      = y;
	this.width  = width;
	this.height = height;
	this.state  = 0;
	this.color  = this.states[this.state];

	
};

Brick.prototype = {
	constructor: Brick
};