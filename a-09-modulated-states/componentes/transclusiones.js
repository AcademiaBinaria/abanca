(function () {

	angular.module('abComponentes')
		.directive('abFirma', firma)
		.directive('abCabecera', cabecera)

	function firma() {
		return {
			transclude: {
				autor: 'autor',
				empresa: '?empresa'
			},
			template: '<footer class="container"><hr/><p class="text-center">Desarrollado con AngularJS by Google. Por <span ng-transclude="autor"></span> - <span ng-transclude="empresa"></span></p></footer>'
		};
	};

	function cabecera() {
		return {
			transclude: {
				mensaje: 'mensaje'
			},
			templateUrl: './componentes/tpl-cabecera.html'
		};
	};
}())
