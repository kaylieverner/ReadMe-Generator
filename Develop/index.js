const questions = [

];

function writeToFile(fileName, data) {
}

function init() {

}

init();


var inquirer = require("inquirer");
var fs = require("fs");

inquirer.prompt([
  {
    type: "input",
    message: "What is your Github username?",
    name: "github username"
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
    name: "table of contents"
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
  }, 
  {
    type: "input",
    message: "Please enter questions regarding your project.",
    name: "questions"
  }, 
])

.then(answers => {
    console.log(answers);
    const readmeText = 
    `ReadME for X repository. input text here.`
    var fs = require("fs");
    fs.writeFile("README.md", readmeText, function (err) {
      if (err) {
        return console.log(error);
      } 
    })
  });