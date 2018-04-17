document.addEventListener('DOMContentLoaded', function(){ 
// Run when page is loaded:

    // Define the __ object
    (function (){
        function MakeBelieveElement(DOMElements, length){
        
            // Properties
            this.element = DOMElements;
            this.length = length;
            
            // Functions

            // 3. Parent
            this.parent = function(query){
                var parents = [];
                for(var i = 0; i < this.length; i++){
                    var parent = this.element[i].parentNode;
                    if(parent){
                        if(query){
                            if(parent.matches(query))
                                parents.push(parent);
                        }
                        else
                            parents.push(parent);
                    }
                }
                return new MakeBelieveElement(parents, parents.length);
            };

            // 4. Grandparent
            this.grandparent = function (query) {
                if(query)
                    return this.parent().parent(query);
                else
                    return this.parent().parent();
            };

            // 5. Ancestor
            this.ancestor = function (query){
                var grandparents = this.grandparent();
                var ancestors = [];
                for (var i = 0; i < grandparents.length; i++) {
                    var ancestor = grandparents.element[i];
                    while(ancestor.tagName != 'HTML'){
                        ancestor = ancestor.parentNode;
                        if(query){
                            if(ancestor.matches(query))
                                ancestors.push(ancestor);
                        }
                    }
                }
                return new MakeBelieveElement(ancestors, ancestors.length);
            };

            // 6. Onclick
            this.onClick = function(fun){
                for(var i = 0; i < this.length; i++){
                    this.element[i].addEventListener('click', fun); 
                }
                return this;
            };

            // 7. Insert text
            this.insertText = function(text){
                for(var i = 0; i < this.length; i++){
                    this.element[i].innerHTML = text;
                }
                return this;
            };

            // 8. Append
            this.append = function(object){
                for(var i = 0; i < this.length; i++){
                    if(object.nodeName)
                        this.element[i].appendChild(object);
                    else{
                        this.element[i].innerHTML += object;
                    }
                }
                return this;
            };

            // 9. Prepend
            this.prepend = function(object){
                for(var i = 0; i < this.length; i++){
                    if(object.nodeName)
                        this.element[i].insertBefore(object, this.element[i].firstChild);
                    else{
                        this.element[i].innerHTML = object + this.element[i].innerHTML;
                    }
                }
                return this;
            };

            // 10. Delete
            this.delete = function(){
                for(var i = 0; i < this.length; i++){
                    this.element[i].remove();
                }
                return this;
            };

            // 11. Ajax
            this.ajax = function(ajaxObject){
                if(!ajaxObject.url){
                    throw new Error('Url must be provided');
                }
                if(!ajaxObject.method){ // if method not provided, default to GET
                    ajaxObject.method = 'GET';
                }
                if(!ajaxObject.timeout){ // if timeout not provided, default to 0
                    ajaxObject.timeout = 0; // 0 is no timeout
                }
                if(!ajaxObject.data){ // if data not provided, defaults to {}
                    ajaxObject.data = {}; 
                }
                if(!ajaxObject.headers){ // if headers not provided, default to {}
                    ajaxObject.headers = {}; 
                }
                if(!ajaxObject.success){
                    ajaxObject.success = null;
                }
                if(!ajaxObject.fail){
                    ajaxObject.fail = null;
                }
                if(!ajaxObject.beforeSend){
                    ajaxObject.beforeSend = null;
                }

                var request = new XMLHttpRequest();
                
                for(var i = 0; i < ajaxObject.headers.length; i++){
                    request.setRequestHeader(ajaxObject.headers[i]);
                }
                request.timeout = ajaxObject.timeout;
                    
                request.onreadystatechange = function () {
                    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                        var resp = request.responseText;
                        ajaxObject.success(resp);
                    }
                };
                request.onerror = function (event) {
                    ajaxObject.fail(event);
                }
                request.open(ajaxObject.method, ajaxObject.url);
                ajaxObject.beforeSend(request);
                request.send();
            };
            window.__.ajax = this.ajax;

            // 12. CSS
            this.css = function(key, value){
                for(var i = 0; i < this.length; i++){
                    this.element[i].style[key] = value;
                }
                return this;
            };

            // 13. Toggle class
            this.toggleClass = function(classname){
                for(var i = 0; i < this.length; i++){
                    var currentclass = this.element[i].className;
                    if(currentclass.includes(classname)){
                        this.element[i].className = currentclass.replace(classname,"");
                        this.element[i].className = this.element[i].className.trim();
                    }
                    else{
                        this.element[i].className += " ";
                        this.element[i].className += classname;
                    }
                }
                return this;
            };

            // 14. On submit
            this.onSubmit = function(fun){
                for(var i = 0; i < this.length; i++){
                    if(this.element[i].tagName.toLowerCase() === "form")
                        this.element[i].addEventListener("submit", fun);
                }
            };

            // 15. On input
            this.onInput = function(fun){
                for(var i = 0; i < this.length; i++){
                    if(this.element[i].tagName.toLowerCase() === "input")
                        this.element[i].addEventListener("input", fun);
                }
            };
        };

        // The main function that will then be assigned to __
        var innerMakeBelieve = function(query){
            var elem = document.querySelectorAll(query);
            if(elem){
                return new MakeBelieveElement(elem, elem.length);
            }
            return {};
        };  

        // The __ function which is visible to the "outside world"
        window.__ = innerMakeBelieve;
    })();

    // Tests:

    // Get element
    var element = __("p");
    console.log("1");
    console.log(element);

    // Get parent
    var parent1 = __("p").parent();
    console.log("2");
    console.log(parent1);

    // Get parent form
    var parent2 = __("p").parent('#parent2');
    console.log("3");
    console.log(parent2);

    // Get invalid parent
    var parent3 = __("p").parent(null);
    console.log("4");
    console.log(parent3);

    // Parent chaining
    var grandparent1 = __("p").parent().parent();
    console.log("5");
    console.log(grandparent1);

    // Grandparent
    var grandparent2 = __("p").grandparent();
    console.log("6");
    console.log(grandparent2);

    // Grandparent with query
    var grandparent2 = __("p").grandparent("#grandparent");
    console.log("7");
    console.log(grandparent2);

    // Should return two ancestors with ancestor1
    var ancestor1 = __("p").ancestor("#ancestor1");
    console.log("8");
    console.log(ancestor1);

    // Should return two ancestors with root
    var ancestor2 = __("p").ancestor("#root");
    console.log("9");
    console.log(ancestor2);

    var ancestor3 = __("p").ancestor("#notancestor");
    console.log("10");
    console.log(ancestor3);

    // Add event, should print out current password
    __("#password").onClick(function (evt) {
        console.log(evt.target.value);
    });

    // Add event to paragraphs which changes appearance
    __("p").onClick(function (evt){
        evt.target.setAttribute("style", "background-color: blue; color: white;");
        evt.target.innerHTML = "Hallo Andri";
    });

    // Test for insertText function, should insert text when button is clicked
    __("#textbutton").onClick(function(evt){
        __("p").insertText("new text boiii");
    });

    // Appends with both methods
    __(".the-appender").append("<p>I am appended via html </p>");
    var p = document.createElement("p");
    p.innerHTML = "I am the appended via node";
    __(".the-appender").append(p);

    // Prepends with both methods
    __(".the-appender").prepend("<p>I am prepended via html</p>");
    var p = document.createElement("p");
    p.innerHTML = "I am the prepended via node";
    __(".the-appender").prepend(p);

    // One should delete all paragraphs in class. Other should do nothing
    __(".toDelete").delete();
    __("nonsense").delete();

    // Should overwrite and end with bg-color green and text color white
    __("p").css("background-color", "grey");
    __("p").css("color","blue");
    __("p").css("background-color", "green");
    __("p").css("color","white");

    // Should toggle font-size in the-appender div
    __("#fontbutton").onClick(function(evt){
        __(".the-appender").toggleClass("largeFont");
    })

    // Should toggle text color in the-appender div
    __("#colorbutton").onClick(function(evt){
        __(".the-appender").toggleClass("newColor");
    })

    // Should log when submitting
    __("#theform").onSubmit(function (evt) {
        console.log("running func");
    }); 

    __("#password").onInput(function(evt) {
        console.log(evt.target.value);
    });

    // Ajax
    __.ajax({
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        method: 'GET',
        timeout: 10000,
        data: "data",
        headers: [],
        success: function (resp) {
            console.log(resp);
        },
        fail: function (error) {

        },
        beforeSend: function(xhr) {

        }

    });

    __.ajax({
        url: 'https://bull.typicode.com/posts/1',
        method: 'GET',
        timeout: 10000,
        data: "data",
        headers: [],
        success: function (resp) {
            console.log(resp);
        },
        fail: function (error) {
            console.log("Error caught");
        },
        beforeSend: function(xhr) {

        }

    });
    

}, false);