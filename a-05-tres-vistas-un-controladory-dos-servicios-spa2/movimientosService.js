(function () {
	// se registran dentro de un módulo con la palabra clave factory
	angular.module('cashFlow').service('movimientosService', movimientosService);

	// Las factorías, y los servicios, son funciones estándar
	// Una gran diferencia con los controladores es que son singleton
	// Eso los convierte en un buen lugar para compartir datos
	function movimientosService()  {
		// el array de movimientos y el total lo mantiene el servicio
		// de esta forma sobrevive a las recargas de controladores
		var movimientos = [];
		// Normalmente estos datos se persisten en servidores remotos
		// o al menos se almacenan en el browser
		var total = {
			ingresos: 0,
			gastos: 0
		};


		/** lista de los movimientos actuales */
		this.getMovimientos =   function ()  {
			return movimientos;
		};
		/** objeto total actual */
		this.getTotal =   function ()  {
			return total;
		};
		/** guardar un nuevo movimiento */
		this.postMovimiento =   function (movimiento)  {
			movimiento.tipo = tipo(movimiento);
			movimientos.push(movimiento);
			console.log(movimiento);
			total.ingresos += movimiento.esIngreso * movimiento.importe;
			total.gastos += movimiento.esGasto * movimiento.importe;
		};
		/** acceso al balance */
		this.balance = function () {
			return total.ingresos - total.gastos
		}

		/** función privada auxiliar para trasnformar el tipo de movimiento */
		var tipo = function (movimiento) {
			return movimiento.esIngreso && 'Ingreso' || 'Gasto'
		}

        this.getTipo= tipo;
	};

}());
