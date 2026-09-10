//1. multiply by 2.
let array = [3,7,2,10,5];
const multiply_by_2 = array.map(num => num * 2);
console.log(multiply_by_2);


//2. get numbers greater than 5.
const numbers_greater_5 = array.filter(num => num > 5);
console.log(numbers_greater_5);

//3. find the first number greater than 5.
const first_num_greater_than_5 = array.find(num => num > 5);
console.log(first_num_greater_than_5);

//4. calculate the sum
const sum_array = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum_array);

//5. check whether 10 exists
const includes_array = array.includes(10);
console.log(includes_array);