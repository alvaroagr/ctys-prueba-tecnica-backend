# Sala de Cine

Este proyecto es el backend/base de datos para la Prueba Tecnica de **Carvajal TyS**.

## Información

Estos repositorio contiene una aplicación que permite simular la gestión de una sala de cine, cumpliendo ciertas caracteristicas.

- [x] Para acceder a la aplicación se cuenta con una autenticación previa.
- [x] Ventana que permite asociar una película a una sala. Manejar con un usuario administrador. La información de la película a cargar es:
  - Código
  - Nombre
  - Descripción
  - Imagen
- [x] Un usuario cliente puede visualizar la información de las películas disponibles.
  - Dada una película el cliente puede ver la información detallada donde se muestran las salas asociadas, la descripción de la película, la imagen y el horario a seleccionar, simulando el almacenamiento de los registros.
- [ ] Mostrar un resumen de las películas seleccionadas para un determinado tiempo y el horario de mayor concurrencia (Administrador)

## Iniciar base de datos MySQL

Para poder utilizar este backend es necesario el uso de **MySQL**.

Primero correr el comando `mysql -u <su-usuario> -p <su-contraseña>` para poder entrar a su consola.

Posteriormente utilice `create database <nombre-de-su-db>;` para crear la base de datos.

## Development server

Para correr el proyecto en servidor de desarrolo, es necesario correr `npm install` para obtener las dependencias del proyecto.
Posteriormente, debe modificar el archivo `app/config/db.config.js` segun lo que hizo al crear la base de datos en MySQL.

```
module.exports = {
  HOST: "localhost",
  USER: "<su-usuario>",
  PASSWORD: "<su-contraseña>",
  DB: "<nombre-de-su-db>",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
```

y posteriormente `npm start`. Se desplegara el backend en la dirección `http://localhost:8080/`.

## Caracteristicas Iniciales

- Usuarios
  - Usuario Administrado
    - Username: admin
    - Password: 123456
  - Usuario Cliente
    - Username: client
    - Password: 123456
- Peliculas
  - Iron Man
  - Baby Driver
  - Casablanca
- 3 Salas

## Frontend

Para ver como de despliega el frontend, es necesario clonar **este proyecto**.
