'use-strict'

const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./API.json', 'utf8'));

let output = '';



for (const entity in data) {
    
    output += `# ${entity} \n`;
    output += '\n';

    for (const request in data[entity]) {
        output += `## ${data[entity][request].name}\n`;
        output += '\n';

        output += data[entity][request].description != '' ?
            `> ${data[entity][request].description}\n` :
            '> Description\n';
        output += '\n';

        output += `**URL** : \`${data[entity][request].url}\`\n`;
        output += `**Authentication required** : \`${data[entity][request].authenticationRequired}\`\n`;
        output += `**Method** : \`${data[entity][request].method}\`\n`;
        output += '\n';

        output += '| Key | Required | Default | Type | Description |\n'
        output += '| --- | --- | --- | --- | --- |\n'

        for (const property in data[entity][request].body) {
            output += `| ${data[entity][request].body[property].key} | unspecified | unspecified | ${data[entity][request].body[property].type} | ${data[entity][request].body[property].description} |\n`
        }

        output += '\n---\n\n';
    }


    output += '\n\n***\n\n'; // Entity separator
}

console.log(output);


// console.log(data.Customer);


// data[entity]
