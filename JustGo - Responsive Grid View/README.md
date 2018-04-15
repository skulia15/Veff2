# Just Go
## Implemented By Skúli Arnarsson
---------------
## Desktop Design (1600x900):
![DeskTop Design](https://github.com/skulia15/Veff2/blob/master/hw7/images/Desktop.png)
## Compared to target design
![DeskTop Design](https://github.com/skulia15/Veff2/blob/master/hw7/web-desktop.png)
-----------------------
## Tablet Design (1024x1366)(iPad Pro):
![DeskTop Design](https://github.com/skulia15/Veff2/blob/master/hw7/images/Tablet.png)
## Compared to target design
![DeskTop Design](https://github.com/skulia15/Veff2/blob/master/hw7/web-tablet.png)
-----------------------
## Mobile Design (414x736)(iPhone 6/7/8 Plus):
![DeskTop Design](https://github.com/skulia15/Veff2/blob/master/hw7/images/Mobile.png)
## Compared to target design
![DeskTop Design](https://github.com/skulia15/Veff2/blob/master/hw7/web-mobile.png)

# Assignment Description
Your job is to create a responsive site which works on all common screen sizes (desktop, tablet & mobile). In the root of the template there are three images (web-desktop.png, web-tablet.png, web-mobile.png) which show how the site should look like in all screen sizes. In order to target these different screen sizes you must use media queries. The look of the website will change depending on which screen size you are looking at, meaning that elements can change location and how big they are, so please carefully notice where all elements are placed on the images.

## Template structure
* /less folder contains:
    - main.less - this is the file you should edit
    - boilerplate.less - this includes overwrites of default CSS styles and should NOT be changed
    - variables.less - this includes all the variables for colors and common sizes
* /public folder contains (**THIS SHOULD NOT BE EDITED**):
    - main.css - compiled main.less file
    - boilerplate.css - compiled boilerplate.less file
    - variables.css - compiled variables.less file
* /resources folder contains all the images used within the document
* index.html - the HTML file associated with the layout
* README.md - The description of the assignment
* gulpfile.js - This is a config file for gulp. This is a browser-sync setup for your convenience. What this essentially does is to prevent you from having to refresh the browser each time you make a change, either in \*.less files or index.html. How to use:
    - Install gulp globally (npm install -g gulp)
    - Run npm install in root of template
    - Run gulp command in root of template
    - A browser tab opens

## Sizes, margins and paddings
Your job is to try to recreate the web in all screen sizes, so it is your job to determine which are the best sizes, margins and paddings to make this happen!
