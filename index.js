const { rejects } = require('assert');
const { error } = require('console');
const fs = require('fs')//las funciones reciben un callback
const http = require('http')
const https = require('https')
const { validateFalse, validateTrue, stats} = require('./src/funciones')

module.exports = (path, options) => new Promise((resolve, reject) => {
  let pathValidator = [];
  let pwd = [];
  let newPath = ""
  
  //console.log(path, options) inicia ejecucion mdLikns
  if (typeof path != 'string') {
    reject("Error. path deberia ser un string")
  }
  
  if (path === ''){
    reject('Error. path vacio')
  }
  
  //es realtivo o abosluto
  pathValidator = path.split("/");
  
  if (pathValidator[0] === "."){
    pwd = __dirname.split("/");
    // remove the first element in pathValidator & pwd
    pathValidator.shift();
    pwd.shift();
    // create path absolute
    newPath = "/".concat(pwd.concat(pathValidator).join("/"))
  }

  //llamar funcion: existe directorio
  existDir(newPath).then(
    promiseValue => {
      if (promiseValue == 0); {
        reject('Error. No existe el directorio')
      }
    }
  )

  if (options['stats'] == true){
    resolve(stats(path, options['validate']))
  }

  if (options['validate'] == true){
    validateTrue(path).then(
      value => {
        resolve(value)
      }
    )
  }
  else
  {
    validateFalse(path).then(
      value => {
        resolve(value)
      }
    )
  }
})


//funcion: existe directorio
    const existDir = (path) => {
      return new Promise (function (resolve) {
        fs.stat(path, (err, stats) => {
          if(err) {
            console.log(error);
          }
          else {
            console.log('stat object for: path');
            // console.log(stats);
          } 
        })
      })
    }
//

