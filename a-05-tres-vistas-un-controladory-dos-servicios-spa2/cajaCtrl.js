(function () {

	angular.module('cashFlow').controller('CajaCtrl', cajaCtrl);

	// El controlador ahora tiene dependencias de otros servicios
	// Las dependencias se buscan en nuestro módulo
	// o en cualquiera de sus dependencias
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
		// La parte de datos que debe compartir la delega sobre la factoría
		vm.movimientos = movimientosService.getMovimientos();
		vm.total = movimientosService.getTotal();

		vm.guardarMovimiento = function () {
			var auxCopyMov = angular.copy(vm.nuevoMovimiento);

			movimientosService.postMovimiento(auxCopyMov);
			vm.nuevoMovimiento.importe = 0;
		}
		vm.balance = movimientosService.balance;

        vm.tipo = function(nm){
            return movimientosService.getTipo(nm);
        }

        vm.tipo = movimientosService.getTipo;
	}

}());
