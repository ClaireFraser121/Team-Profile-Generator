// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

// Intern.js

// Import the Employee class
const Employee = require("./Employee");

// Define the Intern class, inheriting from Employee
class Intern extends Employee {
    constructor(name, id, email, school) {
        // Call the constructor of the parent class (Employee)
        super(name, id, email);

        // Additional method specific to Intern
        this.school = school;
    }

// Additional method specific to Intern
getSchool() {
    return this.school;
}

// Override the getRole() method
getRole() {
    return "Intern";
}
}

// Export the Intern class
module.exports = Intern