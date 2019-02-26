const Display = function (canvas) {
	//максимальное  и минимальное разрешение
	this.maxWidth  = 800;
	this.maxHeight = 600;
	this.minWidth  = 200;
	this.minHeight = 200;
	//буферный canvas, поместим контекст canvas в переменную
	this.buffer  = document.createElement('canvas').getContext('2d');
	this.context = canvas.getContext('2d');

	// меняю размер буфера
	this.buffer.canvas.width = this.context.canvas.width;
	this.buffer.canvas.height = this.context.canvas.height;

	// очистка экрана цветом
	this.clearScreen = function (color) {
		this.buffer.fillStyle = color;
		this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
	};

	// отрисовка текста
	this.drawText = function (text, x, y, color, serif) {
		this.buffer.fillStyle = color;
		this.buffer.font = serif + 'px serif';
		this.buffer.fillText(text, x, y);
	};

	// отрисовка прямоугольника
	this.drawRect = function (x, y, width, height, color) {
		this.buffer.fillStyle = color;
		this.buffer.fillRect(x, y, width, height);
	};

	// отрисовка кругов
	this.drawCircle = function (x, y, radius, color) {
		this.buffer.fillStyle = color;		

		this.buffer.beginPath();
		this.buffer.arc(x, y, radius, 0, 2 * Math.PI);
		this.buffer.fill();
	};

	// отрисовка буфера на canvas
	this.render = function () {
		this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
	};

	this.resize = function (event) {
		//var width, height;

		let width = document.documentElement.clientWidth;
		let height = document.documentElement.clientHeight;

		if (width  > this.maxWidth)  {width  = this.maxWidth};
		if (height > this.maxHeight) {height = this.maxHeight};
		if (width  < this.minWidth)  {width  = this.minWidth};
		if (height < this.minHeight) {height = this.minHeight};

		this.context.canvas.width  = width  - 32;
		this.context.canvas.height = height - 32;

		this.render();
	};

	this.handleResize = (event) => {this.resize(event)};
};

Display.prototype = {
	constructor: Display
};