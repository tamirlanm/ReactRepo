const students = [
    {
        id: 1,
        name: "Anna",
        age: 21,
        grades: [90,70,90]
    },
    {
        id: 2,
        name: "Janna",
        age: 19,
        grades: [95, 75, 64]
    },
    {
        id: 3,
        name: "Alisa",
        age: 20,
        grades: [88, 77, 99]
    },
    {
        id: 4,
        name: "Malisa",
        age: 22,
        grades: [66,100, 70]
    },
    {
        id: 5,
        name: "Alexa",
        age: 20,
        grades: [77, 69, 91]
    }
];

function getAverage(grades){
    return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
}

function getStudentAverage(student){
    return getAverage(student.grades);
}

function getPassedStudents(students){
    return students.filter(student => getStudentAverage(student) >= 70);
}

function getStudentsNames(students){
    return students.map(student => student.name);
}

function findStudent(students, id){
    return students.find(student => student.id === id);
}

function getTopStudent(students){
    return students.reduce((top, student) => getStudentAverage(student) > getStudentAverage(top) ? student : top);  
}

const studentResults = students.map(student => ({
    id: student.id,
    name: student.name,
    average: getStudentAverage(student),
    passed: getStudentAverage(student) >= 70
}));

console.log(getAverage([80,90,100]));
console.log(getStudentAverage(students[0]));
console.log(getPassedStudents(students));
console.log(getStudentsNames(students));
console.log(findStudent(students, 3));
console.log(getTopStudent(students));
console.log(studentResults);