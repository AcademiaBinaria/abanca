(function () {
	var dependencias = ['abValoracion']
	angular.module('abComponentes', dependencias)
		.component('abContenido', {
			// las plantillas pueden tener directivas internas
			template: '<div class="container text-center" style="padding-top:60px;" ui-view></div>'
		})
		.component('abMenuNavegacion', {
			// En este caso la directiva tiene presentación y lógica
			// Asignamos el controlador a la vista desde la plantilla
			// aprovechamos el antiguo par vista-controlador
			// para crear un componente
			templateUrl: './tpl-menu-navegacion.html',
			controller: 'MenuCtrl as menu'
		})
        .component('abContador', {
			// parámetros por valor
			// parámetros por referencia
			templateUrl: './tpl-contador.html',
			bindings: {
				texto: '@',
				valor: '='
			}
			// hay otros tipos avanzados
			// > one-way down
			// & event up
		})
		.component('abFilaMovimiento', {
			templateUrl: './tpl-fila-movimiento.html',
			bindings: {
				movimiento: '='
			}
		})
		.directive('abFilaMovimiento2', function () {
			// Necesitamos el formato clásico cuando los valores por defecto no valen
			// Restricción de atributo para no usar esta plantilla en una fila
			return {
				restrict: 'A',
				templateUrl: './tpl-fila-movimiento2.html',
				scope: {
					movimiento: '='
				},
                controller: function () { },
                link: function (scope, element) {

                }
			}
		})
		.directive('abPluginDOM', function () {
			// Se usa para manipulaciones del DOM
			// Por ejemplo integración de plugins no portados para AngularJS
			return {
                link: function (scope, element) {
					// enlace entre el DOM y el modelo
                }
			}
		})
} ());











