const mdLinks = require('../');

// test path invalido
const invalidPath = './markdown-examples/example1.m'
const errorPath = 'error. path no existe'

// test salida valida del path
const validPath = './markdown-examples/example1.md'
const validOutput = [
  './markdown-examples/example1.md https://www.google.com/ Google',
  './markdown-examples/example1.md https://otra-cosa.net/algun-doc.html algun documento',
  './markdown-examples/example1.md http://algo.com/2/3/ Link a algo'
]

//path vacio
const errPathvacio = 'Error. path vacio'

//test validate true
const validateFlag = './markdown-examples/example1.md'
const validateFlagValue = [
  './markdown-examples/example1.md https://www.google.com/ ok 200 Google',
  './markdown-examples/example1.md https://otra-cosa.net/algun-doc.html fail 400 algun documento',
  './markdown-examples/example1.md http://algo.com/2/3/ ok 302 Link a algo'
]

//test stats true
const statsFlag = './markdown-examples/example1.md'
const statsFlagValue = { Total: 3, unique: 3 }

//test stats & validate true
const sVFlags = './markdown-examples/example1.md'
const sVFlagsValue = { Total: 3, unique: 3, broken: 1 }

//---------------------------------------------------------------------------------------------------------
describe('mdLinks', () => {

  it('Es una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('Path invalido', () => {
    return mdLinks(invalidPath, {'validate': false}).catch((e) => {
      expect(e).toMatch(errorPath)
    })
  });
  
  it('path valido', () => {
    return mdLinks(validPath, {'validate': false}).then((valid) => {
      expect(valid).toEqual(validOutput)
    })
  });

  it('path vacio', () => {
    return mdLinks('', {'validate': false}).catch((err) => {
      expect(err).toMatch(errPathvacio)
    });
  });

  it ('validate flag true', () => {
    return mdLinks(validateFlag, {'validate': true}).then((valid) => {
      expect(valid).toEqual(validateFlagValue)
    });
  });

  it('stats flag true', () => {
    return mdLinks(statsFlag, {'stats': true, 'validate': false}).then((valid) => {
      expect(valid).toEqual(statsFlagValue)
    });
  });

  it('stats & validate flags true', () => {
    return mdLinks(sVFlags, {'stats': true, 'validate': true}).then((valid) => {
      expect(valid).toEqual(sVFlagsValue)
    });
  });

});