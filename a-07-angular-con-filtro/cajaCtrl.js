(function () {
	angular.module('cashFlow').controller('CajaCtrl', cajaCtrl);

	function cajaCtrl(movimientosService, maestrosService) {
		var vm = this;

		vm.titulo = "Controla tu Cash Flow";
		vm.maestros = maestrosService.categorias;
		vm.nuevoMovimiento = {
			esIngreso: 1,
			esGasto: 0,
			importe: 0,
			fecha: new Date()
		};
		vm.valorCorte = 1;
		vm.movimientos = movimientosService.getMovimientos();
		vm.total = movimientosService.getTotal();

		vm.guardarMovimiento = function () {
			var auxCopyMov = angular.copy(vm.nuevoMovimiento);
			movimientosService.postMovimiento(auxCopyMov);
			vm.nuevoMovimiento.importe = 0;
		}
		vm.balance = movimientosService.balance;
	}

}());
