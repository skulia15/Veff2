// Removes all duplicates within an array
Array.prototype.removeAllDuplicates = function(){
    var set = new Set(this);
    this.splice(0, this.length, [...set]);
};

// Should insert the element at a specific index 
Array.prototype.insertAt = function(element, index){
    this.splice(index, 0, element);
};

// Should return the n elements at the back of the array as an array
Array.prototype.tail = function(n){
    return this.slice(this.length - n)
}

// Should return the n elements at the front of the array as an array 
Array.prototype.head = function(n){
    return this.slice(0, n)
}

// Takes in a function which should be used to determine what to remove, e.g. predicate
// function that filters out all even numbers 
Array.prototype.remove = function (predicateFunction) {
    let res = [];
    for(let i = 0; i < this.length; i++) {
        if(predicateFunction(this[i])) {
            res.push(this[i]);
        }
    }
    this.splice(0, this.length, [...res]);

    // or 
    // for(let i = 0; i < this.length; i++) {
    //     if(predicateFunction(this[i])) {
    //         this.splice(i, 1);
    //     }
    // }
};

// Takes in an array and returns the difference of the array it is being executed on and the one provided,
// as an array (possibly an empty array) 
Array.prototype.difference = function(diffArray){
    return diffArray.filter(x => !this.includes(x));
};

// Takes in an array and returns the intersection of the array it is being executed
// on and the one provided, as an array (possibly an empty array) 
Array.prototype.intersection = function(diffArray){
    return diffArray.filter(x => this.includes(x));
};

/*
Takes any number of arrays and returns a group of elements, meaning that
every element in the first index of each array should be grouped together in a new
array and every element in the second index of each array should be grouped
together and etc..
*/
// Array.prototype.zip = function(){
//     let countArrays = 0;
//     let args = [...arguments];
//     args.forEach(array => {
//         if(array.length > countArrays){
//             countArrays = array.length;
//         }
//     });

//     let newArr = []
//     let res = [];
//     for(let i = 0; i < countArrays; i++){
//         args.forEach(array => {
//             if(array[i]){
//                 newArr.push(array[i]);
//             }
//         });
//         res.push(newArr);
//     }
//     return res;
// };

/*
works on the array it is
executed on. All elements in the array must be a number otherwise throw an
exception. Return the multiple of the array as a single number
*/
Array.prototype.multiply = function(){
    var res = 1;

    this.forEach(element => {
        if(typeof(element) !== 'number'){
            throw 'only numbers accepted';
        }
        res *= element
    });
    return res;
};


/*works on the array it is
executed on. All elements in the array must be a number otherwise throw an
exception. Return the average of the array as a single number*/
Array.prototype.average = function(){
    var res = 0;
    this.forEach(element => {
        if(typeof(element) !== 'number'){
            throw 'only numbers accepted';
        }
        res += element
    });
    return res / this.length;
};