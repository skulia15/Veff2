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
Boxing
![boxing](https://github.com/skulia15/Web-Programming-2/blob/master/imgs/boxing.png?raw=true)

Inheritence
![inheritence](https://github.com/skulia15/Web-Programming-2/blob/master/imgs/inheritence.png?raw=true)

Inheritence using function based class
![inheritence](https://github.com/skulia15/Web-Programming-2/blob/master/imgs/inheritencefunction.png?raw=true)


## **Functions**
## **Promises**
## **Arrays**
## **ES6**
# **(40%) - React & Redux**
## **React**
## **Components**
## **Stateless**
### Dumb Component
```javascript
import React from 'react';
import { NavLink } from 'react-router-dom';
import NavigationBarLinkWrapper from '../NavigationBarLinkWrapper/NavigationBarLinkWrapper';

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <img src='../../../resources/github.png' alt="" />
            </div>
            <NavigationBarLinkWrapper className="font-nav">
                <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-link"><i className="fa fa-cutlery fa-lg"></i> Home</NavLink>
                <NavLink
                    to="/contact"
                    activeClassName="active"
                    className="nav-link"><i className="fa fa-tag fa-lg"></i> Contact Us</NavLink>
                <NavLink
                    to="/employees"
                    activeClassName="active"
                    className="nav-link"><i className="fa fa-info-circle fa-lg"></i> Employees</NavLink>
            </NavigationBarLinkWrapper>
        </nav>
    );
};

export default NavigationBar;
```
## **Stateful**
## **PropTypes**
## **Routing**
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
class App extends React.Component {
   
    render() {
        return (
            <div>
                <NavigationBar/>
                <div>
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            {/* <Route path="/contact" component={Contact} />
                            <Route path="/employees" component={Employees} /> */}
                        </Switch>
                    </div>
                </div>
            </div>
            
        );
    };
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));

```
## **Forms**
## **Redux**
## **Store**
## **Actions**
## **Reducers**
## **Styling components**
## **Inline**
	Bad practice, Won't show up on the test.
## **Radium**

```javascript
	import React from 'react'
	import Radium from 'radium'

	const buttonStyle = {
		color: 'white',
		padding: 10,
		transition: 'all .1s',
		fontSize: 16,
		':hover': {
			background: 'rgba(100,100,100, .2)'
		},
		'@media (max-width: 1196px)': {
			fontSize: 10
		}

	}

	const Button extends React.component = () => {
		render(
			return(
				<button style ={buttonStyle}>Hello World</button>
				<p>
					{Radium.getState(this.state, 'button', ':hover') ? 'Hovering' : null}
				</p>
				)
		};
	} 

	export default Radium(Button)
```
## **Multiple stylesheets**
* When using Webpack we can import CSS files
when using the proper loader
* That allows us to use multiple CSS stylesheets
within our application
* The stylesheets will eventually be injected within
the head section of the HTML page
	A type of inline styles

button.css:
```css
	.btn {
		background: blue;
		font-size: 16px;
	};
```

button.js
```javascript
import react from 'react';
import css from './button.css';

const Button = () => {
	return <button className="btn"> Button </button>
}
export default Button;

```

## **CSS Modules**
* A CSS Module is a CSS file which all class names and
animation names are scoped locally by default
* CSS Modules can be imported and accessed like a
JavaScript object
* Class names with camelCase are preferred over kebab-case
* When exported we get real modules!

button.css:
```css
	.btn {
		background: blue;
		font-size: 16px;
	};
```

button.js
```javascript
import react from 'react';
import css from './button.css';

const Button = ({ type, children }) => {
	return <button className={css.btn}>{children}</button>
}
export default Button;

```

* In order to reuse styles composition is your
friend
* Styles within CSS Modules have an option of a
property called composes, which accepts class
name from another module or the one you are in

btn.css

```css
	.btn{
		font-size: 16px;
		border-radius: 4px;
	}

	.btnSuccess {
		composes: btn;
		background-color: red;
	}
```


## **Styled components (styled-components)**

* Styled components combines CSS
Modules and inline styles
* Styles are located within the .js file

```javascript
import styled from 'styled-components';

const Box = styled.div`
	height: 100px;
	width: 100px;
	background-color: blue;
`;
export default Box;

```

```javascript
import styled from 'styled-components';
import React from 'react';

class MyComponent extends React.Component {
	render() {
		const { className } = this.props;
		return (
			<div className={className}></div>
		)
	}
};

export default styled(MyComponent)`
	width: 100px;
	height: 100px;
	background-color: blue;
`

<MyDiv/> -> Black
<MyDiv backgroundColor="blue"/> -> Blue
```



```javascript
import styled from 'styled-components';

export const MyDiv = styled.div`
	margin: 10px;
	width: 100px;
	height: 100px;
	background-color: ${
		props =>
		props.backgroundColor ? props.backgroundColor : 'black'
	};
`;

export const MyShadowDiv = MyDiv.extend`
	box-shadow: 10px 10px ....;
`;

```


```javascript
import styled from 'styled-components';

export const PasswordInput = styled.input.attrs({
	type: 'password',
	size = props => props.size ? `${props.size}px`
})`
	width: 100%;
	font-size: ${props =>  props.size};
	padding: 10px;
`;

<PasswordInput size="100" />

```


# **(15%) - CSS3**
## **Media queries**

Media queries in External stylesheets

```css
<link rel='stylesheet' media='screen and (min-width: 768px) and (max-width: 1024px)' href='css/medium.css'>

```

Media queries Within stylesheets

```javascript
@media screen and (max-width: 400px) {
	.column { width: 100%; }
}
@media screen and (max-width: 768px) and (min-width: 400px) {
	.column { width: 50%; }
}
@media screen and (min-width: 768px) {
	.column { width: 33.3%; }
}
```

Media queries in styled components

```javascript
import styled from 'styled-components';
const VisibleOnPhone = styled.div`
	height: 100px;
	width: 100px;
	@media (min-width: 400px) {
		display: none;
	}
`;
```

## **Animations**

* Animations can be declared by using the
@keyframes keyword in CSS
* The keyframes are a recipe for the animation
* The animation property is than applied within
a specific CSS selector

Keyframes, declaration and application:

```javascript
	@keyframes text-color-changer{
		from { color: blue; }
		to { color: red; }
	}

	@keyframes text-color-changer{
		0% { color: blue; }
		50% { color: yellow; }
		100% { color: red; }
	}

	p {
		animation: text-color-changer 5s ease-in infinite;
	}
```


### Animations in styled-components

* Animations are also available via keyframes
which is a function implemented by styled-components
* They offer a way to import/export keyframes and
therefore offer reusability
```javascript
import styled, { keyframes } from 'styled-components';

const colorChange = keyframes`
	0% { background-color: yellow; }
	25% { background-color: red; }
	50% { background-color: green; }
	75% { background-color: blue; }
	100% { background-color: yellow; }
`;

const ColorChanger = styled.div`
	width: 100px;
	height: 100px;
	animation: ${colorChange} 5s linear 0s infinite;
`;

export default ColorChanger;
```

animate()
1. first argument: An object of CSS properties
2. second argument: duration of the animation
3. third argument: easing function, e.g. swing
4. fourth argument: function triggered on completion

## **Gradients**
* linear and radial
* linear-gradient() is applied to the
background-image CSS property

* first argument: point or angle which determines
the direction of the gradient
* second argument - nth argument: a color which
can be rgb, rgba, hex

```css
body {
	background-image: linear-gradient(blue, yellow);
}
```

## **Shadows**

* box-shadow is a property used to create drop
shadows

See https://css-tricks.com/almanac/properties/b/box-shadow/

## **Transitions**

What is the difference between transitions and
animations?
	* Transactions can only take effect when the property they are applied to change

Basic transition

```css
.my-div {
	width: 200px;
	height: 200px;
	transition: background-color 1s;
}

.my-div:hover {
	background-color: green;
}

```

## **Perspective**

* perspective creates an artificial viewpoint from
where you view the 3D object, and therefore
providing the illusion of depth
* It defines how far the object is away from the user

* The value of the perspective CSS property only
applies to its children and not on the element itself

* perspective-origin
	* This CSS property sets the origin point of the element from where the perspective will be viewed, therefore changing the angle

## **Transforms**

When we add something to the X-axis we go
further right and when we add something to the Yaxis
we go further down
	* The default point (0, 0) can be changed using transform-origin

* rotate (X, Y, Z, 3d)
* scale (X, Y, Z, 3d)
* skew (X, Y)
* translate (X, Y, Z, 3d)
* perspective

## **Rounded corners**

border-radius: 50%;
border-radius: 20px / 100%;
border-radius: 50% 0 50% 0;

## **Box sizing**

box-sizing CSS property defines how the browser
should calculate the total width and height of an element

box-sizing CSS property takes either
content-box(default) or border-box as value

### Border box

* border, margin and padding are automatically
included in the width and height values
* This sometimes results in a shrinking element to fit
in all the above values, but the element will always
be exactly the width and height stated

## **Background sizing**

*background-image* is used to either provide a valid image/s
(URL) or linear/radial gradients

*background-size* is used to determine how to size the image
	*	There are also keywords that can be applied such as cover and contain

*background-position* is used to position the background
image within the element

*background-repeat* is used to determine if the background
image should be repeated over the x-axis, y-axis, both or none

## **Selectors**

list of selectors
https://www.w3schools.com/cssref/css_selectors.asp

### Attribute selectors
* Has
* Exactly
* Within
* Begins with
* Ends with
* Substring

Selects all elements with a target attribute	

a[href="mailto:bla.is"]{
	css props
}

Selects every <a> element whose href attribute value begins with "title"

a[title~="title"]{
	css props
}

Selects every <a> element whose href attribute value begins with "https"

a[href^="http"]:after{
	
}

Selects every <a> element whose href attribute value ends with ".pdf"

a[href$="pdf"]

Selects every <a> element whose href attribute value contains the substring "w3schools"

a[href\*="w3schools"]

### Structural pseudo-classes

These selectors permit selection based on extra information that lies in the DOM but cannot be represented by other simple selectors

* nth-child
* nth-of-type
* firstchild
* last-child
* first-of-type
* last-of-type
* empty

p:nth-child(even)
p:nth-child(3)
p:nth-of-type(3)
table > body > tr:nth-child(even)
p:not(:first-child)

### pseudo-elements

There are four pseudo-elements
* ::first-line
* ::first-letter
* ::before
* ::after

p::first-line

# **(15%) - Layout**
## **Flexbox**

Cheat sheet: https://css-tricks.com/snippets/css/a-guide-to-flexbox/

first apply display: flex to containing element

```css
.flex-container {
	display: flex;
	flex-direction: row | row-reverse | column | column-reverse;
	flex-wrap: nowrap | wrap | wrap-reverse;
	justify-content: flex-start | center | space-around | space-between | flex-end;
	align-items: flex-start | center | baseline | stretch | flex-end;
	align-content:  flex-start | center | space-around | space-between | stretch | flex-end;
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: 100%
	align-self: auto | flex-start | flex-end | center | baseline | stretch;
	order: 2;
}
```

## **CSS Grid Layout**