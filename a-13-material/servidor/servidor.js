"use strict";
var express = require('express');
var bodyParser = require('body-parser');

var seguridad = require('./seguridad.js');
var usuarios = require('./usuarios.js');
var sesiones = require('./sesiones.js');
var maestros = require('./maestros.js');
var movimientos = require('./movimientos.js');

var app = express();

// Permite recuperar como objetos JavaScript el contenido emitido por el cliente
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(function (peticion, respuesta, siguiente) {
	console.log("recibida petición: " + peticion.url);
	siguiente();
});

app.use(express.static(__dirname + './../cliente'));

seguridad.usarSeguridad(app, '/api/priv/');

usuarios(app, '/api/pub/usuarios');
sesiones(app, '/api/pub/sesiones');
maestros(app, '/api/pub/maestros');
movimientos(app, '/api/priv/movimientos')

app.listen(3000);
console.log('listening on port 3000');
