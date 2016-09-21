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
            scope:{year:"@"},
			template: '<footer class="container"><hr/><p class="text-center">Desarrollado con AngularJS by Google. Por <span ng-transclude="autor"></span> - {{year}} - <span ng-transclude="empresa"></span></p></footer>'
		};
	};

	// Mejor sacar el html a un fichero externo (tpl-directiva.html)
	function cabecera() {
		return {
			transclude: {
				mensaje: 'mensaje'
			},
			templateUrl: './tpl-cabecera.html'
		};
	};


}())
