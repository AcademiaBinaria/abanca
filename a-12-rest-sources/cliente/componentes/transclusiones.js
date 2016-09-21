(function () {

	angular.module('abComponentes')
		.directive('abFirma', firma)
		.directive('abCabecera', cabecera)

	// El uso más simple es crear directivas para usar como código reutilizable
	function firma() {
		return {
			transclude: {
				autor: 'autor',
				empresa: '?empresa'
			},
			template: '<footer class="container"><hr/><p class="text-center">Desarrollado con AngularJS by Google. Por <span ng-transclude="autor"></span> - <span ng-transclude="empresa"></span></p></footer>'
		};
	};

	// Dos mejoras, sacar el html a un fichero externo (tpl-directiva)
	// Usar Transclude para reutilizar el contenido del usuario y hacer la vista más dinámica
	// En este caso la plantilla debe usar la directiva ng-transclude
	function cabecera() {
		return {
			transclude: {
				mensaje: 'mensaje'
			},
			templateUrl: './componentes/tpl-cabecera.html'
		};
	};


}())
