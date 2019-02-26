const Collider = function () {

	// сталкивание 2-х прямоугольников
	this.collideTwoRect = function (rect1, rect2) {
		const distX = Math.abs(rect1.x + rect1.width/2 - rect2.x - rect2.width/2);
		const distY = Math.abs(rect1.y + rect1.height/2 - rect2.y - rect2.height/2);
	
		if (distX > (rect.width/2 + rect.width/2) ) {return false}
		if (distY > (rect.height/2 + rect.height/2) ) {return false}

		if (distX <= (rect1.width/2) ) {
			return true
		}
		if (distY <= (rect1.height/2) ) {
			return true
		}
	};

 // столкновение круга с квадратом
	this.collideCircleWithRect = function (circle, rect) {
		const distX = Math.abs(circle.x - rect.x - rect.width/2);
		const distY = Math.abs(circle.y - rect.y - rect.height/2);

		if (distX > (rect.width/2 + circle.radius) ) {return false}
		if (distY > (rect.height/2 + circle.radius) ) {return false}

		if (distX <= (rect.width/2) ) {return true}
		if (distY <= (rect.height/2) ) {return true}

		const dx = distX - rect.width/2;
		const dy = distY - rect.height/2;

		if (dx * dx + dy * dy <= (circle.radius * circle.radius) ) {return true}
	}
};

Collider.prototype = {
	constructor: Collider
};