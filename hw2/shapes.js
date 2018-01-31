/**
 * Define the shapes
 */


// Shape 
function Shape(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.fill = drawio.fillSelectedElement;
    this.lineWidth = drawio.lineWidth;
    this.color = drawio.currentColor;
    this.type = drawio.selectedTool;

    //console.log(drawio.currentColor);
    drawio.undoneShapes = [];
}

Shape.prototype.render = function (color, lineWidth) {};

Shape.prototype.move = function (shape, offset) {
    console.log('move');
    console.log(shape.startX);
    console.log(shape.startY);
    console.log(shape.endX);
    console.log(shape.endY);

    //console.log(shape);
    //console.log(pos);


    shape.startX = offset.x;
    shape.startY = offset.y;
    // console.log(shape.startX);
    // console.log(shape.startY);
};

Shape.prototype.resize = function () { };

/*
 Rectangle
*/
function Rectangle(startX, startY, endX, endY) {
    Shape.call(this, startX, startY, endX, endY);
    console.log('pushing shape rectangle');
    drawio.shapes.push(this);
}

// Assign the prototypes
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function () {
    // Render a Rectangle
    // Call render in superclass
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.lineWidth = this.lineWidth;
    drawio.ctx.beginPath();
    if (this.fill) {
        drawio.ctx.fillRect(this.startX, this.startY, this.endX, this.endY);
    }
    else{
        drawio.ctx.rect(this.startX, this.startY, this.endX, this.endY);
    }
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Rectangle.prototype.resize = function (x, y) {
    this.endX = x - this.startX;
    this.endY = y - this.startY;
};

Rectangle.prototype.move = function (shape, offset) {
    //console.log(shape);
    //console.log(pos);
    //console.log(this);
    Object.getPrototypeOf(Rectangle.prototype).move(shape, offset);

};

Rectangle.prototype.position = function (x, y) {
    // not reverse
    if(startX < endX){

    }

    this.startX

};


/*
 Circle
*/
function Circle(startX, startY, endX, endY, radius) {
    Shape.call(this, startX, startY, endX, endY);
    this.radius = radius;
    drawio.shapes.push(this);
}

// Assign the prototypes
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.render = function () {
    // Render a Rectangle
    //drawio.shapes.pop();
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.lineWidth = this.lineWidth;

    drawio.ctx.beginPath();
    drawio.ctx.arc(this.startX, this.startY, this.radius, 0, 2 * Math.PI);
    if (this.fill) {
        drawio.ctx.fill();
    }
    drawio.ctx.stroke();
    drawio.ctx.closePath();
    //drawio.shapes.push(this);
    console.log(drawio.shapes);
};

Circle.prototype.resize = function (radius) {
    if (radius - this.startX > 0) {
        this.radius = radius - this.startX;
    }
    else {
        this.radius = -(radius - this.startX);
    }
};

/*
 Line
*/
function Line(startX, startY, endX, endY) {
    Shape.call(this, startX, startY, endX, endY);
    drawio.shapes.push(this);
}

// Assign the prototypes
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

Line.prototype.render = function () {
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.lineWidth = this.lineWidth;
    // Render a Line
    drawio.ctx.beginPath();
    drawio.ctx.moveTo(this.startX + this.start, this.startY + this.end);
    drawio.ctx.lineTo(this.startX, this.startY, 10);
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Line.prototype.resize = function (x, y) {
    this.start = x - this.startX;
    this.end = y - this.startY;
};

/*
 Text
*/
function Text(startX, startY, endX, endY) {
    Shape.call(this, startX, startY, endX, endY);
    this.text = drawio.textInput;
    this.font = drawio.font;
    drawio.shapes.push(this);
}

// Assign the prototypes
Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

Text.prototype.render = function () {
    if(drawio.textInput.length){
        drawio.ctx.fillStyle = this.color;
        drawio.ctx.strokeStyle = this.color;
        drawio.ctx.lineWidth = this.lineWidth;
        drawio.ctx.font = this.font;
        // Render Text
        drawio.ctx.beginPath();
        
            if(fill){
                drawio.ctx.fillText(this.text, this.startX, this.startY);
            }
            else{
                drawio.ctx.strokeText(this.text, this.startX, this.startY);
            }
            drawio.ctx.closePath();
        }
        
};

Text.prototype.resize = function (x, y) {
    this.start = x - this.startX;
    this.end = y - this.startY;
};

/*
 Pen
*/
function Pen(startX, startY, endX, endY) {
    Shape.call(this, startX, startY, endX, endY);
    this.startingPoint = {x: startX, y: startY};
    this.points = [];
    this.points.push(this.startingPoint);
    drawio.shapes.push(this);
}

// Assign the prototypes
Pen.prototype = Object.create(Shape.prototype);
Pen.prototype.constructor = Pen;

Pen.prototype.render = function () {
    drawio.ctx.fillStyle = this.color;
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.lineWidth = this.lineWidth;

    drawio.ctx.beginPath();
    drawio.ctx.moveTo(this.startX, this.startY);
    for (let i = 0; i < this.points.length; i++) {
        point = this.points[i];
        drawio.ctx.lineTo(point.x, point.y);
    }
    drawio.ctx.stroke();
    drawio.ctx.closePath();
};

Pen.prototype.resize = function (radius) {
    drawio.ctx.lineTo(this.startX, this.startY);
};

Pen.prototype.updateCurrent = function (currX, currY) {
    let currPoint = {x: currX, y: currY};
    this.points.push(currPoint);
    console.log('udate');
    
};