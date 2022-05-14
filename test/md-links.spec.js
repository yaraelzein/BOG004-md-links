const mdLinks = require('../');


describe('mdLinks path', () => {
  it('debria ser un string', () => {
    const spyConsole = jest.spyOn(console, 'log');

    const spyProcess = jest.spyOn(process, "exit").mockImplementation((number) => { 
      throw new Error('process.exit: ' + number); 
    });

    expect(() => {
      mdLinks(0)
    }).toThrow();

    expect(spyConsole.mock.calls).toEqual([["error. path debe ser un string"]]);
    expect(spyProcess).toHaveBeenCalledWith(1);

    spyConsole.mockRestore()
    spyProcess.mockRestore()
  });

  it('es un string vacio', () => {
    const spyConsole = jest.spyOn(console, 'log');

    const spyProcess = jest.spyOn(process, "exit").mockImplementation((number) => { 
      throw new Error('process.exit: ' + number); 
    });

    expect(() => {
      mdLinks('')
    }).toThrow();

    expect(spyConsole.mock.calls).toEqual([["error. path vacio"]]);
    expect(spyProcess).toHaveBeenCalledWith(1);

    spyConsole.mockRestore()
    spyProcess.mockRestore()
  });

  it('existe directorio', () => {
    const spyConsole = jest.spyOn(console, 'log');

    const spyProcess = jest.spyOn(process, "exit").mockImplementation((number) => { 
      throw new Error('process.exit: ' + number); 
    });

    expect(() => {
      mdLinks('./markdown')
    }).toThrow();

    expect(spyConsole.mock.calls).toEqual([["error. no existe el directorio"]]);
    expect(spyProcess).toHaveBeenCalledWith(1);

    spyConsole.mockRestore()
    spyProcess.mockRestore()
  })

  
});
