(function () {
	angular.module('servicios').service('movimientosService', movimientosService);


	function movimientosService($http)  {

		// la nomenclatura en gerundio ayuda a dar sensación de trabajo en curso

		this.gettingMovimientos =   function ()  {
			return $http.get('movimientos');
		};

		this.gettingTotal =   function ()  {
			return $http.get('movimientos/totales');
		};

		this.postingMovimiento =   function (movimiento)  {
			movimiento.tipo = tipo(movimiento);
			return $http.post('movimientos', movimiento);
		};

		var tipo = function (movimiento) {
			return movimiento.esIngreso && 'Ingreso' || 'Gasto'
		}


	};

}());
