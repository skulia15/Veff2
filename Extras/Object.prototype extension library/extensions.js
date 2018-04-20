/*
Should combine all objects in to a single object. If there are
properties which have the same name the first object should have the deciding
factor. Returns a single merged object
*/
Object.prototype.merge = function(){
    return Object.assign(this, [...arguments]);
};

/*
Should be executed on an instance of Object and should return
a new object with only the properties stated as parameters.
 If the property is not found, ignore it.
*/
Object.prototype.pick = function(){
    let args = [...arguments];
    let props = []
    args.forEach(prop => {
        if(this.hasOwnProperty(prop)){
            props.push(prop);
        }
    });
    return Object.assign({}, [...props]);
};

/*
Returns the last property of the
object. If no property resides within the Object, undefined should be returned.
*/
Object.prototype.tail = function(){
    return Object.values(this)[Object.keys(this).length - 1];
};

/*
Returns the first property of the
object. If no property resides within the Object, undefined should be returned.
*/
Object.prototype.head = function(){
    return Object.values(this)[0];
};

/*
Takes in a function which should be used to determine what to remove
from the object.
*/
Object.prototype.remove = function(predicateFn){
    let thisprops = Object.keys(this);
    thisprops.forEach(prop => {
        if(predicateFn(this[prop])){
            delete this[prop];
        }
    });
};

/*
takes in two objects and returns the 
difference of these objects as a new object 
*/
Object.prototype.difference = function(firstObject, secondObject){
    let newObj = {};
    for (var prop in secondObject) {
        if(firstObject[prop] === undefined) {
            newObj[prop] = secondObject[prop];
        }
    }
    return newObj;
};

/*
Takes in two objects and returns the intersection of these objects as an object
(possibly an empty object)
*/
Object.prototype.intersection = function(firstObject, secondObject){
    let newObj = firstObject
    for (var prop in newObj) {
        if(secondObject[prop] === undefined) {
            delete newObj[prop];
        }
    }
    return newObj;
};


// reset 
obj = {
    x: {y: 1},
    z: 20,
    u: 'hello',
    v: 'world'
};

var emptyObj = {};
console.log('\n');
