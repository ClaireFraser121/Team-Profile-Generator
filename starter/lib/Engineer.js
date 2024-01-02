// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

// Engineer.js

// Import the Employee class
const Employee = require("./Employee");

// Define the Engineer class, inheriting from Employee
class Engineer extends Employee {
  constructor(name, id, email, github) {
    // Call the constructor of the parent class (Employee)
    super(name, id, email);

    // Additional property specific to Engineer
    this.github = github;
  }

  // Additional method specific to Engineer
  getGithub() {
    return this.github;
  }

  // Override the getRole() method
  getRole() {
    return "Engineer";
  }
}

// Export the Engineer class
module.exports = Engineer;