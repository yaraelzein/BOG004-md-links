const { reject } = require('bluebird');
const fs = require('fs');
const http = require('http');
const https = require('https'); 
const { resolve } = require('path');
// const fetch = require('node-fetch');

const validateFalse = (path) => new Promise ((resolve, reject) => {
    const dataLine = [];

    fs.readFile(path, 'utf-8',(error, data) => {
        if (error) {
            reject("Error leyendo el archivo")
        }

        const regexText = '\\[(.+)\\]';
        const regexUrl = '\\(.*?\\)';

        splitPath = data.split('\n');

        splitPath.forEach(line => {
            let text = line.match(regexText)[0].slice(1, -1);
            let url = line.match(regexUrl)[0].slice(1, -1);

            let solution = `${path} ${url} ${text}`
            dataLine.push(solution); 
        });

        resolve(dataLine.flat())
    })
})
//cojo path hago splitpath
//RETORNO SPLIT PATH.LENGHT
const stats = (path, isValid) => new Promise ((resolve, reject) => {
    
    let dataLine = [];
    let listPromes = [];
    let url = "";
    let myPromise = [];
    let broken = 0;
    const regexUrl = '\\(.*?\\)';

    fs.readFile(path, 'utf-8',(error, data) => {
        if(error) {
            reject ('error')
        }
        dataLine = data.split('\n');
        
        if (isValid == false) {
            resolve ({
                'Total': dataLine.length,
                'unique': dataLine.length 
            })
        } else {
            dataLine.forEach((line) => {
                url = line.match(regexUrl)[0].slice(1, -1);

                myPromise = getStatusCode(url)
                listPromes.push(myPromise)
            })

            Promise.all(listPromes).then((resolvePromise) => {
                resolvePromise.forEach((status) => {
                    if (status[0] >= 400) {
                        broken++;
                    }
                })
                resolve ({
                    'Total': dataLine.length,
                    'unique': dataLine.length,
                    'broken': broken
                })
            })
        }
    })
})

const validateTrue = (path) => new Promise ((resolve) => {
    const dataLine = [];
    let myStatusCode = []
    let solution = ""
    let url = ""
    let text = ""
    let returnSolution = []
    let menssage = ""
    let listUrlAndText = []
    fs.readFile(path, 'utf-8',(error, data) => {
        if (error) {
            console.log("Error leyendo el archivo")
        }
        const regexText = '\\[(.+)\\]';
        const regexUrl = '\\(.*?\\)';

        splitPath = data.split('\n');

        splitPath.forEach((data) => {
            text = data.match(regexText)[0].slice(1, -1);
            url = data.match(regexUrl)[0].slice(1, -1);

            myStatusCode = getStatusCode(url)

            dataLine.push(myStatusCode)
            listUrlAndText.push({
                text,
                url
            })

        })
        // solution = `${path} ${url} ${text} ${value[0]}`

        dataLine.forEach((obj) => {

        })


        Promise.all(dataLine).then((resolvePromise) => {
            let i
            for (i = 0; i < resolvePromise.length; i++) {
                if (resolvePromise[i][0] < 400) {
                    menssage = "ok"
                } else {
                    menssage = "fail"
                }
                solution = solution = `${path} ${listUrlAndText[i].url} ${menssage} ${resolvePromise[i][0]} ${listUrlAndText[i].text}`
                returnSolution.push(solution)
            }

            resolve(returnSolution)
        })
    })
})

const getStatusCode = (url) => {
    const listPromises = []

    if (url.indexOf("http://") == 0) {
        listPromises.push(checkHttp(url))
    }

    if (url.indexOf("https://") == 0) {
        listPromises.push(checkHttps(url))
    }

    return Promise.all(listPromises)
}

const checkHttp = (url) => new Promise ((resolve) => {
   http.get(url, (res) => {
       const { statusCode } = res
       resolve(statusCode)
   })
})

const checkHttps = (url) => new Promise ((resolve) => {
    https.get(url, (res) => {
        resolve(res.statusCode)
    }).on('error', (e) => {
        resolve(400)
    })
})



module.exports = {
    validateFalse,
    validateTrue,
    stats
}