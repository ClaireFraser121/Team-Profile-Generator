// Import required modules and classes
import inquirer from "inquirer";
import Engineer from "./lib/Engineer.js";
import Manager from "./lib/Manager.js"; // Adjusted import with .js extension
import Intern from "./lib/Intern.js";
import path from "path";
import fs from "fs";
import render from "./src/page-template.js";

const OUTPUT_DIR = path.resolve("output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Array to store team members
const teamMembers = [];

// Function to prompt for manager details
async function promptManager() {
    // Ask questions to gather manager details
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: "Enter the manager's name: ",
      },
      {
        type: 'input',
        name: 'id',
        message: "Enter Employee ID: ",
      },
      {
        type: 'input',
        name: 'email',
        message: "Enter email address: ",
      },
      {
        type: 'input',
        name: 'officeNumber',
        message: "Enter office phone number: ",
      },
    ]);
  
    // Return a new Manager instance with gathered details
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    console.log("Manager Details:", manager); // Log manager details for debugging
    return manager;
  }
  

// Function to prompt for Engineer details
async function promptEngineer() {
    // Ask questions to gather Engineer details
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter the Engineer's name: ",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter Employee ID: ",
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter email address: ",
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter GitHub username: ",
        },
    ]);

    // Return a new Engineer instance with gathered details
    return new Engineer(answers.name, answers.id, answers.email, answers.github);
}

async function promptIntern() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "Enter the Intern's name: ",
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter Employee ID: ",
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter email address: ",
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter name of school",
        }
    ]);

    return new Intern(answers.name, answers.id, answers.email, answers.school);
}

// Function to prompt for the team and build the array of team members
async function promptTeam() {
    // Prompt for manager details
    const manager = await promptManager();
    // Update the manager details in the teamMembers array
    teamMembers[0] = manager;
  
    let addAnother = true;
  
    // Continue prompting for additional team members until 'Finish Building Team' is selected
    while (addAnother) {
      // Prompt for the role of the next team member
      const { role } = await inquirer.prompt([
        {
          type: 'list',
          name: 'role',
          message: 'Select the role of the next team member:',
          choices: ['Manager', 'Engineer', 'Intern', 'Finish Building Team'],
        },
      ]);
  
      if (role === 'Finish Building Team') {
        // Exit the loop if 'Finish Building Team' is selected
        addAnother = false;
      } else {
        // Handle prompts for Engineer or Intern based on the selected role
        // Add the new team member to the teamMembers array
        const teamMember = role === 'Engineer' ? await promptEngineer() : await promptIntern();
        teamMembers.push(teamMember);
      }
    }
  }

// Main function to execute the program
async function main() {
    // Call the promptTeam function to gather information about the team
    await promptTeam();

    // Check if teamMembers array is empty
    if (teamMembers.length === 0) {
        console.log("No team members entered. Exiting program.");
        return;
    }

    // Print the content of the teamMembers array
    console.log("Team Members:", teamMembers);

    // Ensure the output directory exists; create it if not
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
        console.log(`Output directory created: ${OUTPUT_DIR}`);
    }

    const renderedHTML = render(teamMembers);

    // Print the content of the rendered HTML
    console.log("Rendered HTML:", renderedHTML);

    // Write the rendered HTML to the output file
    fs.writeFileSync(outputPath, renderedHTML);

    // Display a success message
    console.log(`Team HTML has been generated and saved to ${outputPath}`);
}


// Call the main function to start the program
main();