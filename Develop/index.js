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

async function githubInfo(username){
  const queryUrl = `https://api.github.com/users/${username}?client_id=22779517f8aa3cdaf282&client_secret=18322306d00e4ba2747670c19e7df420e9b75343`;
  
  const data = await axios
    .get(queryUrl)
    .then(function(response) { return response.data })
  console.log(data)
  return data;
};

function generateFile(answers, email, avatar_url) {
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
  
  GitHub Avatar: ${avatar_url}
  
  GitHub email: ${email}`
}; 

async function init() {
  try {
    const answers = await promptUser();
    const {email, avatar_url} = await githubInfo(answers.username)
    const file = generateFile(answers, email, avatar_url); 
    await writeFileAsync("readme.md", file); 

    console.log("Successfully generated readme file");
  } catch(err) {
    console.log(err);
  }
}

init();