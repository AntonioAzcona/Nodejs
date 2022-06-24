const { crearArchivo } = require('./helpers/multiplicar');
const argv = require('./config/yargs');
const colors = require('colors');
 
console.clear();

crearArchivo(argv)
    .then(nombreArchivo => console.log(colors.rainbow(nombreArchivo), 'creado'))
    .catch(err => console.log(err));

