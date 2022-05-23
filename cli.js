#!/usr/local/bin/node
const mdLinks = require('./index');
const process = require('process');
const chalk = require('chalk');

const cli = () => {
    const [, , path, posicion1, posicion2] = process.argv;
    let isValid = false
    let stats = false

    if(posicion1 == '--validate' || posicion2 == '--validate'){
        isValid = true
    }

    if(posicion1 == '--stats' || posicion2 == '--stats'){
        stats = true
    }



    mdLinks(path, {'validate': isValid, 'stats': stats})
        .then((response)=> {
            console.log(response);
        })
        .catch((err) => console.log(err));
}

cli()
