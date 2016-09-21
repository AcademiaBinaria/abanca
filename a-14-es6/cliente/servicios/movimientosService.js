
	angular.module('movimientos',['ngResource']).service('movimientosService', movimientosService);


	function movimientosService($resource)  {
		this.movimientos =  $resource("/api/priv/movimientos/");
		this.total =  $resource("/api/priv/movimientos/totales/");

	};


