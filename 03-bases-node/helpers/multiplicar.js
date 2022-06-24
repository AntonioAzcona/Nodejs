const colors = require('colors');
const fs = require('fs');

const crearArchivo = async ({ base = 5, listar = false, hasta = 10 }) => {
    try {

        let salida  = '';
        let consola = '';
        
        for (let i = 1; i <= hasta; i++) {
            salida += `${base} x ${i} = ${ base * i }\n`;
            consola += `${base} ${ 'x'.blue } ${i} ${ '='.magenta } ${ base * i }\n`;
        }

        if(listar){
            console.log('================'.red);
            console.log('TABLA DEL: ', base, ''.green);
            console.log('================'.blue);

            console.log(colors.green(consola));
        } 

        fs.writeFileSync( `./salida/tabla-${base}.txt`, salida);

        return `tabla-${base}.txt`;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    crearArchivo
}