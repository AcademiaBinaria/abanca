(function () {

	angular.module('servicios').service('maestrosService', maestrosService);

	function maestrosService($resource) {


		// dejamos de devolver promesas
		//this.gettingCategorias = $http.get('/api/pub/maestros');

		// y devolvemos recursos...
		// que pueden ser consumidos con sintaxis síncrona
		// El uso de recursos simplifica mucho la sintaxis
		return $resource("/api/pub/maestros/");


	}

}());
