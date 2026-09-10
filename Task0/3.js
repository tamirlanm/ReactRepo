const students = [
    {id: 1, name: "Anna", grade: 85},
    {id: 2, name: "John", grade: 62},
    {id: 3, name: "Sara", grade: 91},
    {id: 4, name: "Mike", grade: 55}  
];


//students with grade >= 70
let grades_greater_than_70 = students.filter(students => students.grade >= 70);
console.log(grades_greater_than_70);

//an array of students names
let students_names = students.map(students => students.name);
console.log(students_names);

//student with id = 3
let student_id_3 = students.find(students => students.id === 3);
console.log(student_id_3);

//student with highest grade
const highest_grade = students.reduce((highest, student) => student.grade > highest.grade ? student : highest);
console.log(highest_grade);

//average grade
const average_grade = students.reduce((sum, student) => sum + student.grade, 0) / students.length;
console.log(average_grade);

//a new array where 
const students_passed = students.map(student => ({
    ...student,
    passed: student.grade > 70
}));

console.log("Grade >= 70:", students_passed);