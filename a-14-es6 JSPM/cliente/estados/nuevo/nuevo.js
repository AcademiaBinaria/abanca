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
				/*
				vm.nuevoMovimiento = {
					esIngreso: 1,
					esGasto: 0,
					importe: 0,
					fecha: new Date()
				};
				*/
				// constructor de un resurso con super poderes
				vm.nuevoMovimiento = new movimientosService.movimientos();
				vm.nuevoMovimiento.esIngreso = 1;
				vm.nuevoMovimiento.fecha = new Date();
				/*
				maestrosService.gettingCategorias
					.success(function (result) {
						vm.maestros = result;
					});
				*/
				// la nueva llamada tiene sintaxis síncrona
				vm.maestros = maestrosService.get();

				// la función que invoca el usuario es también asíncrona
				/*
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
				*/

				// la sintaxis asíncrona sigue disponible cuando sea necesario
				// se usa el nuevo patrón promesa .then(ok(result), error(error))
				vm.guardarMovimiento = function () {
					vm.nuevoMovimiento.fecha = new Date(vm.nuevoMovimiento.fecha);
					vm.nuevoMovimiento.$save()
						.then(function (result) {
							// cuando ha terminado el guardado del movimiento
							// es momento de pedir una actualización de datos
							vm.nuevoMovimiento.importe = 0;
						}, function (error) {
							console.error(error);
							vm.nuevoMovimiento.importe = -9999;
						});
				};


			}
		})

}());
