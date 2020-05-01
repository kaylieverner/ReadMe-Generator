const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      message: "What is your Github username?",
      name: "username"
    },
    {
      type: "input",
      message: "What is the title of your project?",
      name: "title"
    },
    {
      type: "input",
      message: "Please enter a description of your project.",
      name: "description"
    },
    {
      type: "input",
      message: "Please indicate the table of contents.",
      name: "contents"
    },
    {
      type: "input",
      message: "Please detail the installation guidelines.",
      name: "installation"
    },
    {
      type: "input",
      message: "Please detail the intended usage of your project.",
      name: "usage"
    },
    {
      type: "input",
      message: "Please indicate the license details.",
      name: "license"
    },
    {
      type: "input",
      message: "Please note who contributed to the project.",
      name: "contributers"
    },
    {
      type: "input",
      message: "Please describe what kind of tests were performed.",
      name: "tests"
    }
  ])
}; 

function githubInfo(answers){
  const queryUrl = `https://api.github.com/users/${answers.username}`;
  axios 
  .get(queryUrl)
  .then(function (res) {
    const email = res.data.email; 
    const avatar = res.data.avatar_url; 
  })
};

githubInfo();

function generateFile(answers) {
  return `# ${answers.title} [![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity) [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/Naereen/ama)

  ## Table of Contents
  
  - [Description](#description)
  - [Installing and Updating](#installing-and-updating)
  - [Usage](#usage)
  - [License](#license)
  - [Tests](#running-tests)
  - [Contributing](#contributing)
  - [GitHub Details](#github-details)
      - [GitHub profile picture](#github-profile-picture)
      - [GitHub email](#github-email)
  
  ## Description
  
  ${answers.description}
  
  ## Install & Updating
  
  ${answers.installation}
  
  ## Usage
  
  ${answers.usage}
  
  ## License
  
  ${answers.license}
  
  ## Running Tests
  
  ${answers.tests}
  
  ## Contributers
  
  ${answers.contributers}
  
  ## GitHub Details 
  
  GitHub Avatar: ${avatar}
  
  GitHub email: ${email}`
}; 

async function init() {
  try {
    const answers = await promptUser();
    const file = generateFile(answers); 
    await writeFileAsync("readme.md", file); 

    console.log("Successfully generated readme file");
  } catch(err) {
    console.log(err);
  }
}

init();

// //   .then(function ({ username }) {
// //     const queryUrl = `https://api.github.com/users/${username}`;

// //     axios
// //       .get(queryUrl)
// //       .then(function (res) {
// //         // console.log(res.data);
// //         const email = res.data.email;
// //         const avatar = res.data.avatar_url;

        


// //       })
// //   });