(function () {

	angular.module('abComponentes', ['abValoracion', 'abMenu'])
		.component('abContenido', {
			template: '<div class="container text-center" style="padding-top:60px;" ui-view></div>'
		})
		.component('abFilaMovimiento', {
			templateUrl: './componentes/tpl-fila-movimiento.html',
			bindings: {
				movimiento: '='
			}
		})
		.component('abContador', {
			templateUrl: './componentes/tpl-contador.html',
			bindings: {
				texto: '@',
				valor: '='
			}
		})
		.directive('abFilaMovimiento2', function () {
			return {
				restrict: 'A',
				templateUrl: './componentes/tpl-fila-movimiento2.html',
				scope: {
					movimiento: '='
				}
			}
		})
}());
