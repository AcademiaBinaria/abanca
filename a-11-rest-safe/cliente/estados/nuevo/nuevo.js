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
				vm.nuevoMovimiento = {
					esIngreso: 1,
					esGasto: 0,
					importe: 0,
					fecha: new Date()
				};

				// llamamos a un metodo de carga asíncrono
				maestrosService.gettingCategorias
					.success(function (result) {
						// en un futuro llegarán los datos de forma asíncrona
						vm.maestros = result;
					});

				// la función que invoca el usuario es también asíncrona
				vm.guardarMovimiento = function () {
					var auxCopyMov = angular.copy(vm.nuevoMovimiento);
					movimientosService.postingMovimiento(auxCopyMov)
						.success(function (result) {
							// en un futuro confirmarán el guardado
							vm.nuevoMovimiento.importe = 0;
						}).error(function (err) {
							// avisar al usuario del error
							console.error(error);
							vm.nuevoMovimiento.importe = -9999;
						});
				}
			}
		})

}());
