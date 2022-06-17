
// setTimeout(() => {
//     console.log('Hola Mundo');
// }, 1000);

const getUsuarioById = ( id, callback ) => {
    const user = {
        id,
        nombre: 'Antonio'
    }

    setTimeout(() => {
        callback( user )
    },  1500);
}

getUsuarioById( 10, (miUsuario) => {
    console.log( miUsuario.id );
    console.log( miUsuario.nombre.toUpperCase() );
} );