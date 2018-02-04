/**
 * Structure for the assignment 2 project
 */

// 1. Define a function namespace called drawio

// 2. Create an array to hold on to the shapes currently drawn

window.drawio = {
    shapes: [],
    undoneShapes: [],
    selectedTool: 'pen',
    canvas: document.getElementById('my-canvas'),
    ctx: document.getElementById('my-canvas').getContext('2d'),
    selectedElement: null,
    fillSelectedElement: false,
    currentColor: "#000000",
    lineWidth: 5,
    textInput: "",
    drawing: false,
    font: '14px Arial',
    availableTools: {
        RECTANGLE: 'rectangle',
        CIRCLE: 'circle',
        LINE: 'line',
        TEXT: 'text',
        PEN: 'pen',
        MOVE: 'move'
    }
};

$(function () {
    // Document loaded and parsed
    function drawCanvas() {
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        
        drawio.shapes.forEach(shape => {
            shape.render();
        });
        
    }
    // Get all saved images
    getSaved();

    $('#font-size-picker').on('click', function () {
        drawio.font = $('#font-size-picker').val() + "px " + $('#font-picker option:selected').css('font-family');
    });

    $('#font-picker').on('click', function () {
        drawio.font = $('#font-size-picker').val() + "px " + $('#font-picker option:selected').css('font-family');

    });

    $('#text-selector').on('input', function () {
        drawio.textInput = $(this).val();
    });

    $('.icon.clickable').on('click', function () {
        $('.icon').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedTool = $(this).data('shape');
    });

    $('#text-tool-settings').on('click', function () {
        drawio.selectedTool = drawio.availableTools.TEXT;
        $('.icon').removeClass('selected');
        $('#text-tool').addClass('selected');
    });

    $('#clear').on('click', function () {
        drawio.shapes = [];
        drawio.undoneShapes = [];
        drawio.shapes.length = 0;
        drawCanvas();
    });

    $('#undo').on('click', function () {
        if (drawio.shapes.length) {
            let popped = drawio.shapes.pop();
            drawio.undoneShapes.push(popped);
            drawio.selectedElement = popped;
            drawCanvas();
        }
    });

    $('#redo').on('click', function () {
        if (drawio.undoneShapes.length) {
            let popped = drawio.undoneShapes.pop();
            drawio.shapes.push(popped);
            drawio.selectedElement = popped;
            drawCanvas();
        }
    });

    $('.saved-image').on('click', function () {
        // Add and remove active from selected images
        let x = $('.active').removeClass("active");
        $(this).addClass("active");

        let imageData = $(this).data();
        let myImage = localStorage.getItem(imageData.imageName);
        if(myImage){ // If image was found
            drawio.shapes = [];
            drawio.undoneShapes = [];
            data = JSON.parse(myImage);
            data.forEach(shape => { // Push each shape to shape array
                switch (shape.type){
                    case drawio.availableTools.PEN:
                        shape.__proto__ = Pen.prototype;
                        break;
                    case drawio.availableTools.CIRCLE:
                        shape.__proto__ = Circle.prototype;
                        break;
                    case drawio.availableTools.RECTANGLE:
                        shape.__proto__ = Rectangle.prototype;
                        break;
                    case drawio.availableTools.LINE:
                        shape.__proto__ = Line.prototype;
                        break;
                    case drawio.availableTools.TEXT:
                        shape.__proto__ = Text.prototype;
                        break;
                }
                drawio.shapes.push(shape);
            });
            drawCanvas();
        }
    });
    

    $('#save').on('click', function () {
        let myImage = JSON.stringify(drawio.shapes);
        let imageName;
        while(!imageName){
            imageName = window.prompt("Save your masterpiece!", "");
        }
        if(myImage){
            localStorage.setItem(imageName, myImage);
        }
        getSaved();
        //location.reload();
    });
    
    drawio.canvas.addEventListener('click', function(event) {
        var x = event.pageX - drawio.canvas.offsetLeft,
            y = event.pageY - drawio.canvas.offsetTop;
            //console.log('clicked x: ' + x);
            //console.log('clicked y: ' + y);
            
    } , false);


    // mousedown
    $('#my-canvas').on('mousedown', function (mouseEvent) {
        switch (drawio.selectedTool) {
            case drawio.availableTools.RECTANGLE:
                drawio.selectedElement = new Rectangle(
                    mouseEvent.offsetX,
                    mouseEvent.offsetY);
                break;
            case drawio.availableTools.CIRCLE:
                drawio.selectedElement = new Circle(
                    mouseEvent.offsetX,
                    mouseEvent.offsetY);
                break;
            case drawio.availableTools.LINE:
                drawio.selectedElement = new Line(
                    mouseEvent.offsetX,
                    mouseEvent.offsetY);
                break;
            case drawio.availableTools.PEN:
                drawio.selectedElement = new Pen(
                    mouseEvent.offsetX,
                    mouseEvent.offsetY
                );
                drawio.drawing = true;
                break;
            case drawio.availableTools.TEXT:
                drawio.selectedElement = new Text(
                    mouseEvent.offsetX,
                    mouseEvent.offsetY
                );
                break;
            case drawio.availableTools.MOVE:
                // Click on an element

                if(drawio.selectedTool == drawio.availableTools.MOVE){ // if we are using move tool
                    if(drawio.shapes.length){
                        let moveShape;
                        moveShape = drawio.shapes.pop();
                        moveShape.move(moveShape, {x: mouseEvent.offsetX, y: mouseEvent.offsetY});
                        drawio.shapes.push(moveShape);
                        drawCanvas();
                    }
                }
                break;
        }
    });

    // mousemove
    $('#my-canvas').on('mousemove', function (mouseEvent) {
        if(drawio.selectedTool == drawio.availableTools.MOVE && drawio.selectedElement){
            // drawio.selectedElement.color = drawio.currentColor;
            // drawio.selectedElement.fillSelectedElement = checkIfFill();
            // drawio.selectedElement.lineWidth = $("#line-width").val();
            // drawio.shapes.push(drawio.selectedElement);
        }
        if(drawio.selectedTool == drawio.availableTools.PEN && drawio.drawing){
            drawio.selectedElement.updateCurrent(mouseEvent.offsetX, mouseEvent.offsetY);
        }
        if(drawio.selectedTool === drawio.availableTools.MOVE){
            //drawio.selectedElement.end
        }
        if (drawio.selectedElement) {
            // We are resizing an element   
            drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
        }
        console.log(drawio.shapes); 
        drawCanvas();
    });

    // mouseup

    $('#my-canvas').on('mouseup', function () {
        
        if(drawio.selectedTool == drawio.availableTools.MOVE && drawio.selectedElement){ // if we are using move tool
            drawio.shapes.push(drawio.selectedElement);
            drawio.selectedElement = null;
            //drawio.selectedElement = drawio.availableTools.PEN;
        }
        if(drawio.selectedTool === drawio.availableTools.PEN){
            drawio.drawing = false;
        }

        drawio.selectedElement = null;
        drawCanvas();
    });

    /*
    Color Picker
    */
    $('#color-picker').change(function () {
        drawio.currentColor = $('#color-picker').spectrum('get').toRgbString();
    });

    $("#color-picker").spectrum({
        color: "#000000",
        showAlpha: true,
        showPalette: true,
        palette: [
            ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
            ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
            ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
            ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
            ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
            ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
            ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
            ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
        ]
    });

    // Line Width slider
    $('#line-width').on('input', function () {
        drawio.lineWidth = $(this).val();
    });

    // Checkbox for fill shape
    $('#fill').change(function () {
        if ($(this).is(":checked")) {
            drawio.fillSelectedElement = true;
        }
        else {
            drawio.fillSelectedElement = false;
        }
    });

    // Check if the current element should be filled
    function checkIfFill() {
        if ($('#fill').is(":checked")) {
            return true;
        }
        return false;
    }

    function getSelected(clickedX, clickedY){
        
    }

    function getSaved(){
        $('#image-list').empty();
        for (let i = 0; i < localStorage.length; i++) {
            $('#image-list').append("<li class=\"saved-image list-group-item\" data-image-name=" +
                localStorage.key(i) + ">" + localStorage.key(i) + "</li>");
        }
    }
});