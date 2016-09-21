(function () {

	angular.module('servicios').service('maestrosService', maestrosService);

	function maestrosService($http) {
		// Retornamos una promesa
		this.gettingCategorias = $http.get('/maestros');
	}

}());
