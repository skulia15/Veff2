/**
 * Define the shapes
 */


// Shape 
function Shape(position) {
    this.position = position;
    drawio.undoneShapes = [];
}

Shape.prototype.render = function (color, lineWidth) {
    if(color){
        drawio.ctx.fillStyle = color;
    }
    if(lineWidth){
        drawio.ctx.lineWidth = lineWidth;
    }
};

Shape.prototype.move = function (position) {
    this.position = position;
};

Shape.prototype.resize = function () { };

/*
 Rectangle
*/
function Rectangle(position, width, height) {
    Shape.call(this, position);
    this.width = width;
    this.height = height;
}

// Assign the prototypes
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function (color, fill, lineWidth) {
    // Render a Rectangle
    // Call render in superclass
    Object.getPrototypeOf(Rectangle.prototype).render.call(this, color, lineWidth);

    if (fill) {
        drawio.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    drawio.ctx.beginPath();
    drawio.ctx.rect(this.position.x, this.position.y, this.width, this.height);
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Rectangle.prototype.resize = function (x, y) {
    this.width = x - this.position.x;
    this.height = y - this.position.y;
};

/*
 Circle
*/
function Circle(position, radius) {
    Shape.call(this, position);
    this.radius = radius;
}

// Assign the prototypes
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function (color, fill, lineWidth) {
    // Render a Rectangle
    Object.getPrototypeOf(Circle.prototype).render.call(this, color, lineWidth);

    drawio.ctx.beginPath();
    drawio.ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    if (fill) {
        drawio.ctx.fill();
    }
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Circle.prototype.resize = function (radius) {
    if (radius - this.position.x > 0) {
        this.radius = radius - this.position.x;
    }
    else {
        this.radius = -(radius - this.position.x);
    }
};

/*
 Line
*/
function Line(position, start, end) {
    Shape.call(this, position);
    this.start = start;
    this.end = end;
}

// Assign the prototypes
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function (color, fill, lineWidth) {
    Object.getPrototypeOf(Line.prototype).render.call(this, color, lineWidth);
    // Render a Line
    drawio.ctx.strokeStyle = color;
    drawio.ctx.beginPath();
    drawio.ctx.moveTo(this.position.x + this.start, this.position.y + this.end);
    drawio.ctx.lineTo(this.position.x, this.position.y, 10);
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Line.prototype.resize = function (x, y) {
    this.start = x - this.position.x;
    this.end = y - this.position.y;
};


/*
 Text
*/
function Text(position, text, font, color) {
    Shape.call(this, position);
    this.text = text;
    this.font = font;
}

// Assign the prototypes
Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Text.prototype.render = function (color) {
    Object.getPrototypeOf(Text.prototype).render.call(this, color);
    // Render Text
    drawio.ctx.beginPath();
    drawio.ctx.font = this.font;
    console.log( drawio.ctx.font);
    if(fill){
        drawio.ctx.fillText(this.text, this.position.x, this.position.y);
    }
    else{
        drawio.ctx.strokeText(this.text, this.position.x, this.position.y);
    }
    drawio.ctx.closePath();
};

Text.prototype.resize = function (x, y) {
    this.start = x - this.position.x;
    this.end = y - this.position.y;
};

/*
 Pen
*/
function Pen(position) {
    Shape.call(this, position);
}

// Assign the prototypes
Pen.prototype = Object.create(Shape.prototype);
Pen.prototype.constructor = Pen;

Pen.prototype.render = function () {
    // Render a Rectangle
    drawio.ctx.beginPath();
    drawio.ctx.lineTo(this.position.x, this.position.y);
    drawio.ctx.stroke();
};

Pen.prototype.resize = function (radius) {
    drawio.ctx.lineTo(this.position.x, this.position.y);
};