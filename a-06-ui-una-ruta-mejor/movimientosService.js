(function () {
	angular.module('cashFlow').service('movimientosService', movimientosService);


	function movimientosService()  {

		var movimientos = [];

		var total = {
			ingresos: 0,
			gastos: 0
		};


		this.getMovimientos =   function ()  {
			return movimientos;
		};

		this.getTotal =   function ()  {
			return total;
		};

		this.postMovimiento =   function (movimiento)  {
			movimiento.tipo = tipo(movimiento);
			movimientos.push(movimiento);
			console.log(movimiento);
			total.ingresos += movimiento.esIngreso * movimiento.importe;
			total.gastos += movimiento.esGasto * movimiento.importe;
		};

		this.balance = function () {
			return total.ingresos - total.gastos
		}

		var tipo = function (movimiento) {
			return movimiento.esIngreso && 'Ingreso' || 'Gasto'
		}


	};

}());
