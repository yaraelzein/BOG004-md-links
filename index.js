const { rejects } = require('assert');
const fs = require('fs')

module.exports = (path, options) => {
  let mdFiles = [];
  //console.log(path, options) inicia ejecucion mdLikns
  if (typeof path != 'string') {
    console.log('error. path debe ser un string')
    process.exit(1)
  }

  if (path === ''){
    console.log('error. path vacio')
    process.exit(1)
  }

  if (path.match(".+(.md)") == null){
    //si la ruta no es directa, ejemplo: ./path
    //validar si podemos ver el directorio
    fs.access(path, (error) => {
      if (error) {
        console.log("la ruta NO existe")
        process.exit(1)
      }
    })

    // let readdirPromesa = new Promise((resolve, reject) => {

    // })
    fs.readdir(path, (error, files) => {
      if (error) {
        console.log("No se logro leer el directorio")
      } else {
        files.forEach((file) => {
          if (file.match(".+(.md)") != null){
            mdFiles.push("/" + file)
          }
        })
      }
    })
    setTimeout(function(){
      console.log(mdFiles)
    }, 250);
  }
  //si la ruta es directa, ejemplo: ./path/file.md
  if(mdFiles.length != 0){
    console.log("tiene link");
  }
  console.log(path + "/" + mdFiles)
  fs.readFile(path, 'utf-8', (error, data) => {
    if (error) {
      console.log('error data')
    } else {
      console.log(data)
    }
  })

  console.log("paso")
}