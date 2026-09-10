//values and references
const original = {
    name: "Alice",
    score: 10
};

const copy = original;

copy.score = 15

console.log(original.score);
console.log(copy.score);

 
// objects are reference valeus. it does not create a new object. Both variables point to the same object.

// using spread operator

const copy2 = { ...original };

copy2.score = 20;

console.log(original.score);
console.log(copy2.score);
// copy using spread
user = {
    name: "Alice", 
    address: {city: "Almaty"}
};
/*

const copy3 = {...user};

copy3.address.city = "Astana";

console.log(copy3.address.city);
console.log(user.address.city);
*/
// right way to copy

const copy4 = {
    ...user,
    address: {
        ...user.address
    }
};

copy4.address.city = "Astana";
console.log(user.address.city);
console.log(copy4.address.city);


// Original changes. 
// because spread creates only a shallow copy. The outer user object is copied, but address is still the same reference.

