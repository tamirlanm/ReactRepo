function createCounter(){
    let count = 0;

    return function(){
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());

const counter2 = createCounter();
console.log(counter2());
console.log(counter2());
console.log(counter());


function createAdder(value){
    return function(number){
        return value + number;
    }
}

const addFive = createAdder(5);
console.log(addFive(10));
console.log(addFive(20));
console.log("Closure is a function that remembers variables from the place where it was created.");