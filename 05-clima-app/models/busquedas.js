const fs = require('fs');
const axios = require('axios');

class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerBD();
    }

    get historialCapitalizado() {

        return this.historial.map( lugar => {
            let palabras = lugar.split(" "); // [ 'madrid,' 'españa' ]
            palabras = palabras.map( p => p[0].toLocaleUpperCase() + p.substring(1)); // [ 'Madrid,' 'España' ]
            
            return palabras.join(' '); // [ 'Madrid España' ]

        });
    }

    get paramsMapbox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async obtenerCiudades( lugar = '' ) {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            const arrLugares = resp.data.features.map( lugar => (
                {
                    id: lugar.id,
                    nombre: lugar.place_name,
                    lng: lugar.center[0],
                    lat: lugar.center[1],
                }
            ));

            return arrLugares;
        } catch (error) {
            return [];
        }
    }

    get paramsWeather(){
        return {
            'appid' : process.env.OPENWEATHER_KEY,
            'units' : 'metric',
            'lang'  : 'es'  
        }
    }

    async climaLugar( lat, lon ) {
        try {
            // `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: { ...this.paramsWeather, lat, lon }
            })

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = ''){
        // TODO: Prevenir duplicados
        if( this.historial.includes(lugar.toLocaleLowerCase()) ) {
            return;
        }

        // Restringir cierto numero de resultados en mi historial
        this.historial = this.historial.splice(0,5);

        this.historial.unshift(lugar.toLocaleLowerCase());

        // Grabar en DB
        this.guardarDB();
    }

    guardarDB() {
        
        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerBD() {
        // Debe de existir
        if(!fs.existsSync(this.dbPath))
            return;
        
        const info = fs.readFileSync(this.dbPath, {encoding:'utf8'});
        const data = JSON.parse(info);
        this.historial = data.historial;
    }
}

module.exports = Busquedas;