// add(a, b) and multiply(a,b);
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

function calculate(a, b, operation){
    return operation(a, b);
}

console.log(calculate(5,6, add));
console.log(calculate(9,4, multiply));


console.log("Function can be stoder in values.");
console.log("Yes. That's happens in function calculate(5,6, add). add is passed is an argument to calculate.");
console.log("add means the function itself. We're passing it. add() means call the function now.");