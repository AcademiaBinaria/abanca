(function () {
	angular.module('cashFlow').controller('MenuCtrl', menuCtrl);
	function menuCtrl($state) {
		this.soyElEstadoActivo = function (estado) {
			return $state.is(estado);
		}
	}
}());
