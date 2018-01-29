/**
 * Structure for the assignment 2 project
 */

// 1. Define a function namespace called drawio

// 2. Create an array to hold on to the shapes currently drawn

window.drawio = {
    shapes: [],
    undoneShapes: [],
    selectedShape: 'pen',
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
    availableShapes: {
        RECTANGLE: 'rectangle',
        CIRCLE: 'circle',
        LINE: 'line',
        TEXT: 'text',
        PEN: 'pen'
    }
};

$(function () {
    // Document loaded and parsed
    function drawCanvas() {
        if(drawio.selectedElement){
            drawio.selectedElement.render(drawio.currentColor, drawio.fillSelectedElement, drawio.lineWidth);
        }
        for (var i = 0; i < drawio.shapes.length; i++) {
            drawio.shapes[i].render(drawio.shapes[i].color, drawio.shapes[i].fillSelectedElement, drawio.shapes[i].lineWidth);
        }
    }

    $('#font-size-picker').on('click', function(){
        console.log(drawio.font);
        drawio.font = $('#font-size-picker').val() + "px " + $('#font-picker').val();
        console.log(drawio.font);
        
    }); 
    $('#font-picker').on('click', function(){
        console.log(drawio.font);
        drawio.font = $('#font-size-picker').val() + "px " + $('#font-picker').val();
        console.log(drawio.font);
        
    });

    $('#color-picker').css("background-color", drawio.currentColor);
    $('#color-form').on('input', function() {
        $('#color-picker').css("background-color", drawio.currentColor);
    });

    $('#text-selector').on('input', function(){
        drawio.textInput = $(this).val();
    });

    $('.icon').on('click', function () {
        $('.icon').removeClass('selected');
        $(this).addClass('selected');
        drawio.selectedShape = $(this).data('shape');
    });

    $('#clear').on('click', function () {
        drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
        drawio.shapes = [];
        drawio.shapes.length = 0;
    });

    $('#undo').on('click', function () {
        if(drawio.shapes.length){
            let popped = drawio.shapes.pop();
            drawio.undoneShapes.push(popped);
            drawio.selectedElement = null;
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawCanvas();
        }
    });

    $('#redo').on('click', function () {
        if(drawio.undoneShapes.length){
            let popped = drawio.undoneShapes.pop();
            drawio.shapes.push(popped);
            drawCanvas();
        }
    });

    // mousedown

    $('#my-canvas').on('mousedown', function (mouseEvent){
        switch(drawio.selectedShape){
            case drawio.availableShapes.RECTANGLE:
                drawio.selectedElement = new Rectangle({ x: mouseEvent.offsetX,
                                                         y: mouseEvent.offsetY}, 0, 0);
                break;
            case drawio.availableShapes.CIRCLE:
                drawio.selectedElement = new Circle({   x: mouseEvent.offsetX,
                                                        y: mouseEvent.offsetY}, 0, 0);
                break;
            case drawio.availableShapes.LINE:
                drawio.selectedElement = new Line({ x: mouseEvent.offsetX,
                                                    y: mouseEvent.offsetY},
                                                    0,
                                                    0);
                break;
            case drawio.availableShapes.PEN:
                drawio.selectedElement = new Pen({  x: mouseEvent.offsetX,
                                                    y: mouseEvent.offsetY});
                break;
            case drawio.availableShapes.TEXT:
                drawio.selectedElement = new Text({ x: mouseEvent.offsetX,
                                                    y: mouseEvent.offsetY},
                                                    drawio.textInput,
                                                    drawio.font,
                                                    drawio.fillSelectedElement,
                                                    drawio.currentColor
                                                    );
                break;
        }
    });

    // mousemove

    $('#my-canvas').on('mousemove', function (mouseEvent){
        if(drawio.selectedElement){
            drawio.ctx.clearRect(0, 0, drawio.canvas.width, drawio.canvas.height);
            drawio.selectedElement.resize(mouseEvent.offsetX, mouseEvent.offsetY);
            drawCanvas();
        }
    });

    // mouseup

    $('#my-canvas').on('mouseup', function (){
        if(drawio.selectedElement){
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
    $('#red').on('input', function (){
        drawio.rgba.RED = minMaxColor($(this).val());
        getColor();
    });

    $('#green').on('input', function (){
        drawio.rgba.GREEN = minMaxColor($(this).val());
        getColor();
    });

    $('#blue').on('input', function (){
        drawio.rgba.BLUE = minMaxColor($(this).val());
        getColor();
    });

    $('#alpha').on('input', function (){
        drawio.rgba.ALPHA = $(this).val() / 100;
        getColor();
    });

    // Line Width slider
    $('#line-width').on('input', function (){
        drawio.lineWidth = $(this).val();
    });

    // Checkbox for fill shape
    $('#fill').change(function() {
        if($(this).is(":checked")) {
            drawio.fillSelectedElement = true;
        }
        else{
            drawio.fillSelectedElement = false;
        }
    });


    // Makes value fit into the range 0-255
    function minMaxColor (val){
        if(val > 255){
            val = 255;
        }
        if(0 > val){
            val = 0;
        }
        return val;
    }

    function getColor() {
        drawio.currentColor = "rgba(" + drawio.rgba.RED + ", " + drawio.rgba.GREEN + ", "+ drawio.rgba.BLUE + ", "+ drawio.rgba.ALPHA +")";
    }

    function checkIfFill (){
        if ($('#fill').is(":checked")){
            return true;
        }
        return false;
    }
});