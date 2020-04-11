"use-strict"

const fs = require("fs");
const data = JSON.parse(fs.readFileSync("./API.json", "utf8"));

let output = "";



// Start
output += "<!-- markdownlint-disable MD012 -->" + "\n" + "# API documentation" + "\n\n";

// Table of content
output += "- [API documentation](#api-documentation)\n";  
for (const entity in data) {
    let chapterName = entity;
    let link = chapterName.toLowerCase().replace(' ', '-').replace('/', '');
    output += `    - [${chapterName}](#${link})\n`;

    for (const request in data[entity]) {
        let chapterName = data[entity][request].name;
        let link = chapterName.toLowerCase().replace(' ', '-').replace('/', '');
        output += `        - [${chapterName}](#${link})\n`;
    }
}
output += "\n\n&nbsp; <!-- break line -->\n\n"


// Content
for (const entity in data) {

    output += `## ${entity}\n`;
    output += "\n";

    for (const request in data[entity]) {
        output += `## ${data[entity][request].name}\n`;
        output += "\n";

        output += data[entity][request].description != "" ?
            `> ${data[entity][request].description}\n` :
            "> Description\n";
        output += "\n";

        output += `**URL** : \`${data[entity][request].url}\`\n`;
        output += `**Authentication required** : \`${data[entity][request].authenticationRequired}\`\n`;
        output += `**Method** : \`${data[entity][request].method}\`\n`;
        output += "\n";

        output += "| Key | Required | Default | Type | Description |\n"
        output += "| --- | --- | --- | --- | --- |\n"

        if (typeof(data[entity][request].body) != "string")
            for (const property in data[entity][request].body) {
                output += `| ${data[entity][request].body[property].key} | unspecified | unspecified | ${data[entity][request].body[property].type} | ${data[entity][request].body[property].description} |\n`
            }

        output += "\n---\n\n";  // Request separator
    }


    output += "\n\n&nbsp; <!-- break line -->\n\n"; // Entity separator
}

console.log(output);