const inquirer = require("inquirer");
const fs = require("fs");

const { Circle, Triangle, Square } = require("./lib/shapes");

// Function using fs to generate SVG file
function writeToFile(fileName, answers) {
    let svgString = "";
    svgString =
        '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    svgString += "<g>";
    svgString += `${answers.shape}`;

    let shapeChoice;
    if (answers.shape === "Circle") {
        shapeChoice = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeColor}"/>`;
    } else if (answers.shape === "Triangle") {
        shapeChoice = new Triangle();
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
    } else {
        shapeChoice = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
    }

    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    svgString += "</g>";
    svgString += "</svg>";

    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("Generated logo.svg");
    })
};

// Function using Inquirer to prompt user input
function promptUser() {
    inquirer
        .prompt(
            [
                {
                    type: "input",
                    message:
                        "Enter up to three characters for your logo:",
                    name: "text",
                },

                {
                    type: "input",
                    message:
                        "Enter color keyword or a hexadecimal number for your text:",
                    name: "textColor",
                },
                {
                    type: "list",
                    message: "Select a shape for your logo:",
                    choices: ["Circle", "Triangle", "Square"],
                    name: "shape",
                },
                {
                    type: "input",
                    message:
                        "Enter color keyword or a hexadecimal number for your shape:",
                    name: "shapeColor",
                },
            ]
        )
        .then((answers) => {
            if (answers.text.length > 3) {
                console.log("Please enter no more than 3 characters for your logo.");
                promptUser();
            } else {
                writeToFile("logo.svg", answers);
            }
        })
};

// Call promptUser function
promptUser();