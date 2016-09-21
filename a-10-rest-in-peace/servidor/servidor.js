"use strict";
var express = require('express');
// Paquete externo para... parsear el body :-)
var bodyParser = require('body-parser');
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

// Hasta ahora hemos visto como responder a peticiones GET devolviendo HTML
app.use(express.static(__dirname + './../cliente'));

maestros(app, '/maestros');
movimientos(app, '/movimientos')

app.listen(3000);
console.log('listening on port 3000');
