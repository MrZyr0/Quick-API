const fs = require('fs');
const monJson = JSON.parse(fs.readFileSync('./SCT.postman_collection_full.json', 'utf8'));

const domaine = '';

let output = []
let index = 0;


monJson.requests.map(request => {

    index++;
    
    output.push( {
        "entity": monJson.folders.find(e => e.id === request.folder) !== undefined ? monJson.folders.find(e => e.id === request.folder).name : null,
        "name": request.name,
        "description": request.description,
        "url": domaine + request.url.replace('\\', '').replace(/^.*\/\/[^\/]+/, ''),
        "authentication required": isAuthRequired(request.headerData),
        "method": request.method,
        "header": request.headerData.map(e => {
            return {
                "key": e.key,
                "value": e.key === "Authorization" ? e.value.split(' ')[0] + ' TOKEN' : e.value,
                "description":e.description,
            }
        }),
        "body": request.data != null ? request.data.map(e => {
            return {
                "key": e.key,
                "value": e.value,
                "type": isNaN(e.value) ? e.type : "Integer",
                "description": e.description
            }
        }) : 'untitled'
    });

    // console.log(index);
});


result = output.reduce(function (accumulator, currentObj) {
    accumulator[currentObj.entity] = accumulator[currentObj.entity] || [];
    accumulator[currentObj.entity].push(currentObj);
    return accumulator;
}, Object.create(null));

console.log(JSON.stringify(result, null, 1));
// console.log(JSON.stringify(result[0], null, 1));


function isAuthRequired(headerArray) {
    for (let index = 0; index < headerArray.length; index++) {
        if (headerArray[index].key.includes('Authorization'))
            return true;
    }
    return false;
}
