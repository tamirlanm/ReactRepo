// is even function
function isEven(num){
    return num % 2 === 0;
}

console.log(isEven(9));

// arrow is even
const isEven2 = (num) => num % 2 === 0;
console.log(isEven2(9));

//getFullName

function getFullName(firstName, lastName){
    return `${firstName} ${lastName}`;
}

console.log(getFullName("Alex", "Frix"));

// calculate price
function calculatePrice(price, quantity){
    return price * quantity;
}
console.log(calculatePrice(750, 4));

//calculate discount
function calculateDiscount(price, percent){
    return price * (( 100 - percent) / 100);
}
console.log(calculateDiscount(750, 20));

//get max
function getMax(a, b){
    return (a > b) ? a : b;
}
console.log(getMax(22, 20));