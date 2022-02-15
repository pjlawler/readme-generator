const inquirer = require('inquirer');
const generateMarkdown = require('./src/render_md_text');
const { writeFile } = require('./utils/write_readme');

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

function init() {  
  getProjectInfo()
  .then(addCollaborators)
  .then(generateMarkdown)
  .then(writeFile);
};

// Gets the initial information needed for the readme file
const getProjectInfo = () => {

  return inquirer.prompt([
  {
    type: 'input',
    name: 'author',
    message: 'Please provide your full name (Required):',
    validate: inputValue => { return validateAnswer(inputValue, 'text_input', "Please enter your name."); }
  },
  {
    type: 'input',
    name: 'github',
    message: 'Please enter your github username (Required):',
    validate: inputValue => { return validateAnswer(inputValue, 'text_input', "Please enter your github username."); }
  },
  {
    type: 'input',
    name: 'email',
    message: 'Please enter your email address (Required):',
    validate: inputValue => { return validateAnswer(inputValue, 'text_input', "Please enter a project description."); }
  },
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of the project? (Required):',
    validate: inputValue => { return validateAnswer(inputValue, 'text_input', "Please enter a project title."); }
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please provide a detailed description of the project (Required):',
    validate: inputValue => { return validateAnswer(inputValue, 'text_input', "Please enter a project description."); }
  },
  {
    type: 'input',
    name: 'screenshot',
    message: 'Please enter the location of the screen-shot file (type none if there is no screenshot)',
    default: '../assets/imgs/screen-shot.png',
    filter(val) { return val.toLowerCase(); }
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Please provide usage instructions, if any:'
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Please provide installation instructions, if any:'
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Please provide testing information, if any:'
  },
  {
    type: 'rawlist',
    name: 'license',
    message: 'Which license would you like to use?',
    choices: ['None','MIT', 'GPlv2', 'Apache', 'GPLv3', 'BSD 3-clause', 'BSD 2-clause', 'Custom'],
    default: 1,
    filter(val) { return val.toLowerCase(); }
  },
  {
    type: 'input',
    name: 'license_text',
    message: 'License text >',
    when: ({ selectLicense }) => selectLicense == 'custom',
    validate: inputValue => { return validateAnswer(inputValue, 'text_input', "Please enter the custom license text.")}
  },
  {
    type: 'confirm',
    name: 'hasCollaborators',
    message: 'Did you have any collaborators contributing to this project?',
    default: false
  }
  ]);
};
// Adds an array of contributing collaborators if there were any
const addCollaborators = (projectInfo)  => {

   if (!projectInfo.hasCollaborators) { return projectInfo; }

   if (!projectInfo.collaborators) { projectInfo.collaborators = []; } 
    console.log(`
    ==================
    Add a collaborator
    ==================
    `)
    
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the collaborator',
        validate: inputValue => { return validateAnswer(inputValue, 'text_input', 'Please enter the name of the collaborator:')}
      },
      {
        type: 'input',
        name: 'github',
        message: 'Please enter their github profile',
        validate: inputValue => { return validateAnswer(inputValue, 'text_input', 'Please enter their github profile:')}
      },
      {
        type: 'confirm',
        name: 'confirmAddAnother',
        message: 'Would you like to add another collaborator?',
        default: false
      }
    ])
    .then(collaboratorData => {
       projectInfo.collaborators.push(collaboratorData);
       if(collaboratorData.confirmAddAnother) { return addCollaborators(projectInfo) }
       else { return projectInfo }
    });
}

init();