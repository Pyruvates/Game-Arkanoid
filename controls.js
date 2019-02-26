const Control = function () {

	this.down  = new Control.ButtonInput(); 
	this.up    = new Control.ButtonInput();
	this.left  = new Control.ButtonInput();
	this.right = new Control.ButtonInput();
	this.space     = new Control.ButtonInput();

	this.keyDownUp = function(event) {
		const down = (event.type == 'keydown') ? true : false;

		switch(event.keyCode) {
			case 37: this.left.getInput(down);  break;
			case 38: this.up.getInput(down);    break;
			case 39: this.right.getInput(down); break;
			case 40: this.down.getInput(down);  break;
			case 32: this.space.toogle(down);
		}
	};

	this.handleKeyDownUp = (event) => {this.keyDownUp(event)};
};

Control.prototype = {
	constructor: Control
};

Control.ButtonInput = function () {
	this.active = false;
	this.down   = false;
};

Control.ButtonInput.prototype = {
	constructor: Control.ButtonInput,

	getInput: function (down) {

		if (this.down != down) {
			this.active = down;
		};

		this.down = down;
	},

	toogle: function (down) {
		if (down) {
			this.active = !this.active;
		}
	}
};