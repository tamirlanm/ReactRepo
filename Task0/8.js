const message = "global";
function showMessage(){
    const message = "function";
    console.log(message); 

    if(true){
        const message = "block";    
        console.log(message);
    }
    console.log(message);
}
console.log(message);

showMessage();

console.log("Global scope - variables declared outside of all functions and blocks belong to the global scope.")
console.log("Function scope - when a variable is declared inside a function, it is local to that function and cannot be accessed from the outside.");
console.log("Block scope - applies to any code wrapped in curly braces {} - such as loops or conditional statements.");

console.log("var has funciton scope, let and const are block scope.");