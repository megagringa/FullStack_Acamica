# Delilah Resto :Api de pedidos
Trabajo número 3 del curso de Desarrollo Web Full Stack de Acámica. 

## Lenguajes y tecnologias 
-Node.js 
-Postman
-XAMPP

- #### Descarga de Node.js
  Pagina oficial de[Node.js](https://nodejs.org/).
  
- #### Comandos de instalación:Ubuntu

  Tipeando: 

      $ sudo apt install nodejs
      $ sudo apt install npm


  Puedes encontrar más información en la página oficial de [NPM](https://npmjs.org/).

Si la instalación es exitosa los siguientes comandos tipeados pueden ser ejecutados. // Las versiones pueden ser superiores en el momento que se observe este repositorio.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

### Postman y XAMPP
Dirígete a [Postman](https://www.postman.com/downloads/) y sigue las instrucciones de descarga.
Dirígete a [XAMPP](https://www.apachefriends.org/es/index.html) y sigue las instrucciones de descarga.

## Para empezar 
- Clona el repositorio
```
https://github.com/megagringa/FullStack_Acamica/DelilahResto.git
```
- Ejecutar XAMPP u otro programa de MySQL y Apache.
- Importar la base de datos "database.sql" que se está dentro de la carpeta "database" en la raiz del proyecto, este archivo contiene la creacion de tablas en mysql y la insercion de datos de prueba para la verificacion del correcto funcionamiento del API
- Abrir una consola en la carpeta donde se clono el repositorio
- instalar las dependecias del proyecto con el comando `npm install`
- Para configurar los datos de acceso a la base de datos abrir el archivo config.js dentro de /src/config y verificar que los datos de acceso a la base de datos sean correctos 
- Iniciar el proyecto con el comando `npm run start` para iniciar el servidor o con el comando `npm run dev` para iniciarlo en modo desarrollo
- Si no ocurre ningun error inesperado debe aparecer en la consola el mensaje "server on port 3000"
- El servidor se encuentra corriendo en la direccion: http://localhost:3000

- En la carpeta "postman_collection" se encuentra el archivo de exportacion de la coleccion de peticiones de postman con las pruebas de las peticiones que se pueden realizar al API, este archivo puede ser importado en postman para verificar el correcto funcionamiento de la misma.
- En la raiz del proyecto se encuentra el archivo spec.yml en donde se encuentra la documentacion del API en Open API.
