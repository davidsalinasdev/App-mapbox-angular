// Para manejar archivos con NODEJS
const {
  writeFileSync, // este para crear un archivo
  mkdirSync // este para crear directorio
} = require('fs');


// Para variables de entorno
require('dotenv').config();

// En este archivo se creara el path donde se va a crear las variables de entorno
const targetPath = './src/environments/environment.ts';

// Aqui el contenido del archivo
const envFileContent = `
    export const environment ={
        mapbox_key: "${process.env['MAPBOX_KEY']}",
        otra:"PROPIEDAD DE .ENV"
    };
`;

// Creación del directorio o carpeta
mkdirSync('./src/environments', {
  recursive: true
});

// Creación del archivo
writeFileSync(targetPath, envFileContent);
