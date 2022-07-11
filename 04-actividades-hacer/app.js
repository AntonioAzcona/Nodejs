// import colors from 'colors';
import { guardarDB } from './helpers/guardarArchivo.js';
import { inquirerMenu,
         pausa,
         leerInput } from './helpers/inquirer.js';
import { Tareas } from './model/tareas.js';

const main = async () => {

  let opt = '';
  const tareas = new Tareas();
  
  do {
    opt = await inquirerMenu();

    switch (opt) {
      case '1':
          const desc = await leerInput('Descripción:');
          tareas.crearTarea(desc);
        break;
      case '2':
          console.log(tareas.listadoArr);
        break;
    }

    guardarDB( tareas.listadoArr );

    await pausa();
    
  } while (opt !== '0');
};
 
main();