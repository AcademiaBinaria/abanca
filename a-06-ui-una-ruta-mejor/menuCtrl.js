(function () {
	angular.module('cashFlow').controller('MenuCtrl', menuCtrl);
	// Ahora el sercvicio se llama $state
	function menuCtrl($state) {
		this.soyElEstadoActivo = function (estado) {
			// Tiene funciones más amigables para consultar
			return $state.is(estado);
		}
	}
}());
