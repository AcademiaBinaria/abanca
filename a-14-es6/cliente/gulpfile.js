
var gulp = require('gulp');
/* requerimientos de plugins de gulp */
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

/** esta es la tarea principal */
/** genera un único fichero bundle.js a partir de los *.js fuente */
gulp.task('js', function () {
	/** definición del fichero de arranque  */
	var entryPoint = {
			entries: './app.js',
			extensions: ['.js'],
			debug: false
		};
	return browserify(entryPoint) //  recorre las dependencias establecidas en código
		.transform(babelify, {presets: ["es2015"]})// trasnpila de ES6 a ES5
		.bundle() // empaqueta en un único fichero
		.pipe(source('bundle.js')) // lo nombra como bundle.js 
		.pipe(gulp.dest('./')); // y lo salva en el directorio raiz
});

/** esta tarea vigila cambios en ficheros js */
/** cuando los cambios ocurren lanza la tarea js */
/** la tarea js tambien se lanza de inicio, por ser una dependencia */
gulp.task('watchJS', ['js'], function () {
	gulp.watch('./**/*.js', ['js']);
});


/** tarea por defecto: se lanza con el comando gulp */
/** depende de la tarea  watchJS */
gulp.task('default', ['watchJS']);