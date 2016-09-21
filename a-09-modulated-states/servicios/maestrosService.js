(function () {

	angular.module('servicios').service('maestrosService', maestrosService);

	function maestrosService() {
		this.categorias = {
			categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
			categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
		};
	}

}());
