const Engine = function (timeStep, update, render) {

	this.accumulatedTime       = 0; // время с прошлого апдейта
	this.animationFrameRequest = undefined; // ссылка на запрос фрейма
	this.time                  = undefined; // Самая новая омтетка в цикле
	this.timeStep              = timeStep; // интервал. Например, 30 раз в секунду(1000/30)

	this.updated = false; // Сигнал: был ли апдейт с прошлого цикла

	this.update = update; // функция апдейта состояния игры
	this.render = render; // функция рендера

	this.run = function(timeStep) { // один цикл из Game'loop
		this.accumulatedTime += this.time + timeStep; // вычисляем сколько прошло
		this.time = timeStep;

		if (this.accumulatedTime >= this.timeStep * 3) { // для слабых машин
			this.accumulatedTime = this.timeStep;
		}; 

		while (this.accumulatedTime >= this.timeStep) {
			this.accumulatedTime -= this.timeStep;

			this.update(timeStep);

			this.updated = true; // игра обновилась
		};

		if (this.updated) {
			this.updated = false;
			this.render(timeStep);
		};

		this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);
	};

	this.handleRun = (timeStep) => {this.run(timeStep)};
};


Engine.prototype = {

	constructor: Engine,

	start: function() {		
		this.accumulatedTime       = this.timeStep;
		this.time                  = window.performance.now();
		this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);
	},

	stop: function() {
		window.cancelAnimationFrame(this.animationFrameRequest);
	}
};