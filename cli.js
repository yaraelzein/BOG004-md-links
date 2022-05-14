const mdLinks = require("./index");
const process = require('process');


mdLinks("./markdown-examples/example1.md", {'validate': true, 'stats': true})
    .then((response)=> {
        console.log(response);
    })
    .catch((err) => console.log(err));