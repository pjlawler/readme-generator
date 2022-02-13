// TODO: Include packages needed for this application
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const questions = ['What is the title of the project?', 'Please provide a detailed description of the project.'];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
  
  getUserInput()
  .then(data => console.log(data));

};

const getUserInput = () => {
  return inquirer.prompt([
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of the project? (Required)',
    validate: inputValue => { return validateAnswer(inputValue, 'text_input', "Please enter a project title."); }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please provide a detailed description of the project (Required)',
    validate: inputValue => { return validateAnswer(inputValue, 'text_input', "Please enter a project description."); }
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Please provide installation instructions)'
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Please provide any usage instructions'
  },
  {
    type: 'input',
    name: 'credits',
    message: 'Please provide any credits'
  },
  {
    type: 'input',
    name: 'license',
    message: 'Please provide any license details'
  },
  {
    type: 'input',
    name: 'badges',
    message: 'Please provide any badges'
  }
  ]);
};

// Misc utility functions
function validateAnswer(value, type, message) {
  switch(type) {
    case 'text_input':
      if(!value) { 
        console.log(message);
        return false;
      } else {
        return true;
      }
  }
}

// Function call to initialize app
init();











// const generatePage = require('./src/page-template');
// const { writeFile, copyFile } = require('./utils/generate-site');
// const promptUser = () => {
//   return inquirer.prompt([
//     {
//       type: 'input',
//       name: 'name',
//       message: 'What is your name? (Required)',
//       validate: nameInput => {
//         if (nameInput) {
//           return true;
//         } else {
//           console.log('Please enter your name!');
//           return false;
//         }
//       }
//     },
//     {
//       type: 'input',
//       name: 'github',
//       message: 'Enter your GitHub Username (Required)',
//       validate: githubInput => {
//         if (githubInput) {
//           return true;
//         } else {
//           console.log('Please enter your GitHub username!');
//           return false;
//         }
//       }
//     },
//     {
//       type: 'confirm',
//       name: 'confirmAbout',
//       message: 'Would you like to enter some information about yourself for an "About" section?',
//       default: true
//     },
//     {
//       type: 'input',
//       name: 'about',
//       message: 'Provide some information about yourself:',
//       when: ({ confirmAbout }) => confirmAbout
//     }
//   ]);
// };


// const promptProject = portfolioData => {
//   console.log(`
// =================
// Add a New Project
// =================
// `);

//   // If there's no 'projects' array property, create one
//   if (!portfolioData.projects) {
//     portfolioData.projects = [];
//   }
//   return inquirer
//     .prompt([
//       {
//         type: 'input',
//         name: 'name',
//         message: 'What is the name of your project? (Required)',
//         validate: nameInput => {
//           if (nameInput) {
//             return true;
//           } else {
//             console.log('You need to enter a project name!');
//             return false;
//           }
//         }
//       },
//       {
//         type: 'input',
//         name: 'description',
//         message: 'Provide a description of the project (Required)',
//         validate: descriptionInput => {
//           if (descriptionInput) {
//             return true;
//           } else {
//             console.log('You need to enter a project description!');
//             return false;
//           }
//         }
//       },
//       {
//         type: 'checkbox',
//         name: 'languages',
//         message: 'What did you this project with? (Check all that apply)',
//         choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
//       },
//       {
//         type: 'input',
//         name: 'link',
//         message: 'Enter the GitHub link to your project. (Required)',
//         validate: linkInput => {
//           if (linkInput) {
//             return true;
//           } else {
//             console.log('You need to enter a project GitHub link!');
//             return false;
//           }
//         }
//       },
//       {
//         type: 'confirm',
//         name: 'feature',
//         message: 'Would you like to feature this project?',
//         default: false
//       },
//       {
//         type: 'confirm',
//         name: 'confirmAddProject',
//         message: 'Would you like to enter another project?',
//         default: false
//       }
//     ])
//     .then(projectData => {
//       portfolioData.projects.push(projectData);
//       if (projectData.confirmAddProject) {
//         return promptProject(portfolioData);
//       } else {
//         return portfolioData;
//       }
//     });
// };

// promptUser()
//   .then(promptProject)
//   .then(portfolioData => {
//     return generatePage(portfolioData);
//   })
//   .then(pageHTML => {
//     return writeFile(pageHTML);
//   })
//   .then(writeFileResponse => {
//     console.log(writeFileResponse);
//     return copyFile();
//   })
//   .then(copyFileResponse => {
//     console.log(copyFileResponse);
//   })
//   .catch(err => {
//     console.log(err);
//   });
