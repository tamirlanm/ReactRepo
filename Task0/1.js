// Student variables
let name = "Alex";                    // string
let age = 20;                         // number
let active = true;                    // boolean
let courses = ["JavaScript", "SQL"];  // array
let address = {                       // object
    city: "Almaty",
    country: "Kazakhstan"
};

// null and undefined
let phone = null;                     // intentional absence of value
let email;                            // undefined

// Print values and types
console.log(name, typeof name);
console.log(age, typeof age);
console.log(active, typeof active);
console.log(courses, typeof courses);
console.log(address, typeof address);
console.log(phone, typeof phone);
console.log(email, typeof email);
console.log(`${Array.isArray(courses)} if is array. `);

// Template literal
console.log(`${name} is ${age} years old and studies ${courses.join(", ")}.`);

// Primitive values:
// name, age, active, phone, email
//
// Reference values:
// courses, address