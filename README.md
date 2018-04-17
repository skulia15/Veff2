# Web Programming
## Implemented by Skúli Arnarsson
### More information visit each individual project.


# Exam Notes
## ***(30%) - JavaScript***
## **DOM**
```javascript
    // Finding elements 

    document.getElementById("demo") // Find an element by element id
    document.getElementsByTagName(name)	//Find elements by tag name
    document.getElementsByClassName(name)	//Find elements by class name

    //This example finds the element with id="main", and then finds all <p> elements inside "main":
    var x = document.getElementById("main");
    var y = x.getElementsByTagName("p");

    // Finding HTML Elements by CSS Selectors
    var x = document.querySelectorAll("p.intro");

    // Changing elements

    element.innerHTML =  new html content	//Change the inner HTML of an element
    element.attribute = new value	//Change the attribute value of an HTML element
    element.setAttribute(attribute, value)	//Change the attribute value of an HTML element
    element.style.property = new style	//Change the style of an HTML element

    // Adding / removing elements

    document.createElement(element)	//Create an HTML element
    document.removeChild(element)	//Remove an HTML element
    document.appendChild(element)	//Add an HTML element
    document.replaceChild(element)	//Replace an HTML element
    document.write(text)	//Write into the HTML output stream

    // Navigating DOM elements

    var myTitle = document.getElementById("demo").firstChild.nodeValue;
    // Accessing the first child can also be done like this:
    var myTitle = document.getElementById("demo").childNodes[0].nodeValue;
    // previousSibling
    // nextSibling
    // childNodes
    // parentNode(.parentNode = grandparent)
    

    // replacing a node

    child = document.getElementByClassName('child')[0];
    child.parentNode.replaceChild(document.createElement('h1'), child);

The nodeName property specifies the name of a node.
nodeValue property specifies the value of a node.

```
## **Events**
```javascript
    //Adding Events Handlers

    //Adding event handler code to an onclick event
    document.getElementById(id).onclick = function(){code}
    document.getElementById("myBtn").onclick = displayDate;

    <button type="button" 
    onclick="document.getElementById('id1').style.color = 'red'">
    Click Me!</button>

    <h1 onclick="this.innerHTML = 'Ooops!'">Click on this text!</h1>
```
```html
    // Event in a function
    <h1 onclick="changeText(this)">Click on this text!</h1>

    <script>
    function changeText(id) { 
        id.innerHTML = "Ooops!";
    }
    </script>
```
#### list of DOM events https://www.w3schools.com/jsref/dom_obj_event.asp
    HTML DOM EventListener

    The addEventListener() method attaches an event handler to the specified element.

    The addEventListener() method attaches an event handler to an element without overwriting existing event handlers.

    You can add many event handlers of the same type to one element, i.e two "click" events.

    You can easily remove an event listener by using the removeEventListener() method.

**How do you stop an event from bubbling?**
* event.stopPropagation();
* event.cancelBubble = true;
* event.stopImmediatePropagation();

``` javascript
element.addEventListener(event, function, useCapture);
// The first parameter is the type of the event (like "click" or "mousedown")
// The second parameter is the function we want to call when the event occurs.
// The third parameter is a boolean value specifying whether to use event bubbling or event capturing

element.addEventListener("click", function(){ alert("Hello World!"); });

element.addEventListener("click", myFunction);

function myFunction() {
    alert ("Hello World!");
}
```

## **CSS in JS**

```javascript
    var body = document.getElementByTagName('body')[0];

    body.style.backgroundColor = 'blue';
    body.style.color = 'white';
    body.style.fontSize = '16px';

    // Adding classes
    var elem =  document.getElementById('elem');
    // Overrides
    elem.className = 'alert-danger';
    // Appends the class to the class string
    elem.className += 'alert-danger';
    
    elem.classList.toggle('alert-danger');
```
## **HTTP Requests**
HTTP request consists of four parts
1. Method
    - GET
    - POST
    - PUT
    - DELETE
    - ...
2. URL
3. Headers (optional)
4. Body (optional)

HTTP Response
1. Status code
2. Headers
    * getResponseHeader() is used to retrieve a specified response header. 
    * first argument: the name of the header to retrieve
3. Body

XMLHttpRequest
* first argument: specifies the HTTP method or verb
* second argument: the url of the server
* third argument: asynchronous or not (default true)
```javascript
    var request = new XMLHttpRequest();
    request.open('GET', 'someurl');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send({id:1, name:'skuli'});
    if(request.status !== 200) thow new error;
    console.log(request.responseText);
```
* readyState determines the state of the request.

values for readystate: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
## **Objects**
When you don’t want others to be able to
override your implementations you can define
these properties by using defineProperty() or
defineProperties()

every object has three
associated object attributes
- prototype
- class
- extensible

### creating objects

```javascript
// OBJECT LITERALS
    var user = { something: 'yay'};

// NEW KEYWORD
    function cat() {
        this.name = 'Fluffy',
        this.age = '42'
    };
    var fluffy = new Cat();

// OBJECT.CREATE()
// Object.create() can be used to assign the proper prototype
    var o = Object.create(Object.prototype);
```

* HasOwnProperty();
    * Checks whether the objects contains a certain property
    * Excludes inherited properties
* The in operator
    * checks whether the property is found in a set

### Prototype
* Every object has a prototype except one the Object which every object inherits from
* An object’s prototype attribute specifies the object from which it inherits properties
* Different prototypes assigned for each object creation method
* You can access every object’s instance prototype through the \__proto__ keyword
## **Classes**

### class declaration
```javascript
    class Rectangle  {
        constructor(height, width){
            this.height = height;
            this.width = width;
        }
        // getter
        get area() {
            return this.calcArea();
        }
        // Method
        calcArea() {
            return this.width * this.height;
        }
    }

    var rectangle = class  { // unnamed
        constructor(height, width){
            this.height = height;
            this.width = width;
        }
    }

    var rectangle = class Rectangle { // named
        constructor(height, width){
            this.height = height;
            this.width = width;
        }
    }

    const square = new Rectangle(10, 10);
    console.log(sqare.area);
```
![alt text](https://github.com/skulia15/Web-Programming-2/imgs/boxing.png)

## **Functions**
## **Promises**
## **Arrays**
## **ES6**
# **(40%) - React & Redux**
## **React**
## **Components**
## **Stateless**
## **Stateful**
## **PropTypes**
## **Routing**
## **Forms**
## **Redux**
## **Store**
## **Actions**
## **Reducers**
## **Styling components**
## **Inline**
## **Radium**
## **Multiple stylesheets**
## **CSS Modules**
## **Styled components (styled-components)**
# **(15%) - CSS3**
## **Media queries**
## **Animations**
animate()
1. first argument: An object of CSS properties
2. second argument: duration of the animation
3. third argument: easing function, e.g. swing
4. fourth argument: function triggered on completion
## **Gradients**
## **Shadows**
## **Transitions**
## **Perspective**
## **Transforms**
## **Rounded corners**
## **Box sizing**
## **Background sizing**
## **Selectors**
# **(15%) - Layout**
## **Flexbox**
## **CSS Grid Layout**