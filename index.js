const { validateFalse, validateTrue, stats, existDir} = require('./src/funciones')

module.exports = (path, options) => new Promise((resolve, reject) => {
  let pathValidator = [];
  let pwd = [];
  let newPath = ""
  
  //console.log(path, options) inicia ejecucion mdLikns 
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


  //path existe?
  const isDir = existDir(newPath)

  if (!isDir) {
    reject("error. path no existe")
  }

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
