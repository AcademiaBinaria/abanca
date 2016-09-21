(function () {

	angular.module('nuevo', ['ui.router', 'abFiltros', 'abComponentes', 'servicios'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('nuevo', {
					url: '/nuevo',
					template: '<ab-nuevo></ab-nuevo>'
				})
		})
		.component('abNuevo', {
			templateUrl: './estados/nuevo/nuevo.html',
			controller: function (movimientosService, maestrosService) {
				var vm = this;
				vm.maestros = maestrosService.categorias;
				vm.nuevoMovimiento = {
					esIngreso: 1,
					esGasto: 0,
					importe: 0,
					fecha: new Date()
				};
				vm.guardarMovimiento = function () {
					var auxCopyMov = angular.copy(vm.nuevoMovimiento);
					movimientosService.postMovimiento(auxCopyMov);
					vm.nuevoMovimiento.importe = 0;
				}
			}
		})

}());
