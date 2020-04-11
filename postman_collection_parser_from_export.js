var fs = require('fs');
var monJson = JSON.parse(fs.readFileSync('./SCT.postman_collection.json', 'utf8'));

let output = []
// let index = 0;


monJson.item.map(element => {

    // index++;
    
    output.push( {
        "entity": element.name,
        "actions": element.item != undefined ? element.item.map(e => {
            return {
                "name": e.name,
                "request": {
                    "method": e.request.method,
                    "url": e.request.url.raw.replace("http://localhost:8000", ''),
                    "header": e.request.header.map(e => {
                        return e.key + ': ' + e.value;
                    }),
                    "body": e.request.body !== undefined ? e.request.body.urlencoded.map(e => {
                        return e.key + ': ' + e.value;
                    }) : null
                },
            };
        }) : null,
    });

    // console.log(index);
});


console.log(JSON.stringify(output[0], null, 1));