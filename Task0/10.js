const numbers = [10, 20, 30, 40];

const[first, second] = numbers;

console.log(first);
console.log(second);

const user = {
    id: 1,
    name: "Anna",
    age: 21
}

const {name, age} = user;
console.log(name);
console.log(age);

const newNumbers = [...numbers, 50];
console.log(newNumbers);
console.log(numbers);

const newUser = {
    ...user,
    age: 22
};
console.log(newUser);

const userWithEmail = {
    ...user,
    email: "anna@example.com"
};

console.log(userWithEmail);
console.log(user);

const numbers2 = [50,60];
const combined = [...numbers, ...numbers2];

console.log(combined);

function sum(...numbers){
    return numbers.reduce((total, number) => total + number, 0);
}

console.log(sum(1,2));
console.log(sum(1,2,3,4));

console.log("Spread operator expands elements of an iterable into individual components. Rest operator collects multiple elements and condenses them into a single array.");