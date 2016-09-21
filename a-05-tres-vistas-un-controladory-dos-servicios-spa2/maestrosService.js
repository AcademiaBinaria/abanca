(function () {

	// se registran dentro de un módulo con la palabra clave service
	angular.module('cashFlow').service('maestrosService', maestrosService);

	function maestrosService() {

		var privado = "";

		var srv = this;
		this.categorias = {
			categoriasIngresos: ['Nómina', 'Ventas', 'Intereses Depósitos'],
			categoriasGastos: ['Hipotéca', 'Compras', 'Impuestos']
		};

	}


}());
