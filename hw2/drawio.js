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
    font: '14px Arial',
    rgba: {
        RED: 0,
        GREEN: 0,
        BLUE: 0,
        ALPHA: 1
    },
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
        for (var i = 0; i < drawio.shapes.length; i++) {
            drawio.shapes[i].render(drawio.shapes[i].color, drawio.shapes[i].fillSelectedElement, drawio.shapes[i].lineWidth);
        }
        if (drawio.selectedElement) {
            drawio.selectedElement.render(drawio.currentColor, drawio.fillSelectedElement, drawio.lineWidth);
        }
    }

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

    $('#clear').on('click', function () {
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawio.shapes = [];
        drawio.undoneShapes = [];
        drawio.shapes.length = 0;
    });

    $('#undo').on('click', function () {
        if (drawio.shapes.length) {
            let popped = drawio.shapes.pop();
            drawio.undoneShapes.push(popped);
            drawio.selectedElement = popped;
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
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
    
    
    drawio.canvas.addEventListener('click', function(event) {
        var x = event.pageX - drawio.canvas.offsetLeft,
            y = event.pageY - drawio.canvas.offsetLeft;
            //console.log(x);
            //console.log(y);
            
        // Collision detection between clicked offset and element.
        // drawio.shapes.forEach(function(element) {
        //     if (y > element.top && y < element.top + element.height 
        //         && x > element.left && x < element.left + element.width) {
        //         alert('clicked an element');
        //     }
        // });
    } , false);


    // mousedown

    $('#my-canvas').on('mousedown', function (mouseEvent) {
        switch (drawio.selectedTool) {
            case drawio.availableTools.RECTANGLE:
                drawio.selectedElement = new Rectangle({
                    x: mouseEvent.offsetX,
                    y: mouseEvent.offsetY
                }, 0, 0);
                break;
            case drawio.availableTools.CIRCLE:
                drawio.selectedElement = new Circle({
                    x: mouseEvent.offsetX,
                    y: mouseEvent.offsetY
                }, 0, 0);
                break;
            case drawio.availableTools.LINE:
                drawio.selectedElement = new Line({
                    x: mouseEvent.offsetX,
                    y: mouseEvent.offsetY
                },
                    0,
                    0);
                break;
            case drawio.availableTools.PEN:
                drawio.selectedElement = new Pen({
                    x: mouseEvent.offsetX,
                    y: mouseEvent.offsetY
                });
                break;
            case drawio.availableTools.TEXT:
                drawio.selectedElement = new Text({
                    x: mouseEvent.offsetX,
                    y: mouseEvent.offsetY
                },
                    drawio.textInput,
                    drawio.font,
                    drawio.fillSelectedElement,
                    drawio.currentColor,
                    drawio.lineWidth
                );
                break;
            case drawio.availableTools.MOVE:
                // Click on an element
                //drawio.selectedElement = 
                //drawio.selectedElement.move({x: mouseEvent.offsetX, y: mouseEvent.offsetY});
                break;
        }
    });

    // mousemove

    $('#my-canvas').on('mousemove', function (mouseEvent) {
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        if(drawio.selectedTool == drawio.availableTools.MOVE){ // if we are using move tool
            if(drawio.shapes.length){
                let moveShape;
                moveShape = drawio.shapes.pop();
                moveShape.move(moveShape, {x: mouseEvent.offsetX, y: mouseEvent.offsetY});
                drawio.shapes.push(moveShape);
            }
        }
        if (drawio.selectedElement) {
            // We are resizing an element   
            drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
        }
        drawCanvas();
    });

    // mouseup

    $('#my-canvas').on('mouseup', function () {
        if(drawio.selectedTool == drawio.availableTools.MOVE){ // if we are using move tool
                drawio.shapes.push(drawio.selectedElement);
                drawio.selectedElement = null;
                //drawio.selectedElement = drawio.availableTools.PEN;
        }
        if (drawio.selectedElement) {
            drawio.selectedElement.color = drawio.currentColor;
            drawio.selectedElement.fillSelectedElement = checkIfFill();
            drawio.selectedElement.lineWidth = $("#line-width").val();
            drawio.shapes.push(drawio.selectedElement);
        }
        drawio.selectedElement = null;
    });

    /*
    Color Picker
    */
    $('#color-picker').change(function () {
        drawio.currentColor = $('#color-picker').spectrum('get').toHexString();
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

   
    // $('#alpha').on('input', function (){
    //     drawio.rgba.ALPHA = $(this).val() / 100;
    //     getColor();
    // });

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

    // Makes value fit into the range 0-255
    function minMaxColor(val) {
        if (val > 255) {
            val = 255;
        }
        if (0 > val) {
            val = 0;
        }
        return val;
    }

    // function getColor() {
    //     drawio.currentColor = "rgba(" + drawio.rgba.RED + ", " + drawio.rgba.GREEN + ", "+ drawio.rgba.BLUE + ", "+ drawio.rgba.ALPHA +")";
    // }

    function checkIfFill() {
        if ($('#fill').is(":checked")) {
            return true;
        }
        return false;
    }
});