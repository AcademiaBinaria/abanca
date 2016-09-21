(function () {

	angular.module('cashFlow').service('maestrosService', maestrosService);

	function maestrosService() {
		this.categorias = {
			categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
			categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
		};
	}

}());
