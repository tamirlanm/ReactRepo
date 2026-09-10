const user = {
    id: 1,
    name: "Azamat",
    age: 15,
    address: {
        city: "Astana",
        street: "Levyi bereg"
    }
};

//read the name and city
console.log(user.name);
console.log(user.address.city);

//change the age
user.age = 17;
console.log(user.age);

//remove the street
delete user.street;
console.log(user.street);

//get name and age using destructuring
const {name, age} = user;
console.log(name);
console.log(age);

//get city using nested destructuring
const {address: {city}} = user;
console.log(user);

//rename name to UserName during destructuring
const {name: userName} = user;
console.log(userName);