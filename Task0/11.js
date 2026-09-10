const user1 = {
    name: "Anna",
    address: {
        city: "Almaty"
    }
};

const user2 = {
    name: "Alex"
};

console.log(user1.address.city);

console.log(user2.address?.city);

const city1 = user1.address?.city ?? "City not specified.";
const city2 = user2.address?.city ?? "City not specified.";

console.log(city1);
console.log(city2);


console.log(0 || "default");
console.log(0 ?? "default");

console.log("" || "default");
console.log("" ?? "default");

console.log(false || "default");
console.log(false ?? "default");

console.log(null || "default");
console.log(null ?? "default");

console.log(undefined || "default");
console.log(undefined ?? "default");

console.log("|| only checks falsy values. ?? checks only null or undefined.");