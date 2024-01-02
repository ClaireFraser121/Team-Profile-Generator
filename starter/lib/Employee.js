// TODO: Write code to define and export the Employee class

// Employee.js

// Define the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    // Add other methods as needed
    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee"
    }
}

// Export the Employee class
module.exports = Employee;