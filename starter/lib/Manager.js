// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

// Manager.js

// Import the Employee class
const Employee = require("./Employee");

// Define the Manager class, inheriting from Employee
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // Call the constructor of the parent class (Employee)
        super(name, id, email);

        // Additional property specific to Manager
        this.officeNumber = officeNumber;
    }

    // Additional method specific to Manager
    getOfficeNumber() {
        return this.officeNumber;
    }

    // Override the getRole() method
    getRole() {
        return "Manager";
    }
}

// Export the Manager class
module.exports = Manager;