const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const { type } = require("os");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const teamMembers = [];

async function promptManager() {
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
        // Add more questions for manager details here
    ]);

    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    teamMembers.push(manager);
}

async function promptEngineer() {
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

    const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    teamMembers.push(engineer);

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

    const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    teamMembers.push(intern);

}

async function promptTeam() {
    // Prompt for manager details
    await promptManager();

    let addAnother = true;

    while (addAnother) {
        const { role } = await inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Select the role of the next team member:',
                choices: ['Engineer', 'Intern', 'Finish Building Team'],
            },
        ]);

        if (role === 'Finish Building Team') {
            addAnother = false;
        } else {
            const teamMember = role === 'Engineer' ? await promptEngineer() : await promptIntern();
            teamMembers.push(teamMember);
        }
    }
}

async function main() {
    await promptTeam();

    // Render the HTML using the gatherered team members

    const renderedHTML = render(teamMembers);

// Write the rendered HTML to the output file
fs.writeFileSync(outputPath, renderedHTML);

console.log(`Team HTML has been generated and saved to ${outputPath}`);
}

main();