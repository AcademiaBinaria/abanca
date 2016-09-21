// tenemos que cambiar la dependencia hacia el nuevo módulo
angular.module('cashFlow', ['ui.router']);

// las rutas ahora se maneja con el concepto de estado
angular.module('cashFlow').config(function ($stateProvider) {
	// Las rutas pasan a ser opcionales,
	// en la práctica sólo se usan si vienen de aplicaciones externas y por cuestiones de SEO
	$stateProvider
		.state('total', {
			url: '/',
			controller: 'CajaCtrl as caja',
			templateUrl: 'total.html'
		})
        .state('home', {
			url: '',
			controller: 'CajaCtrl as caja',
			templateUrl: 'total.html'
		})
		.state('nuevo', {
			url: '/nuevo',
			controller: 'CajaCtrl as caja',
			templateUrl: 'nuevo.html'
		})
		.state('lista', {
			url: '/lista',
			controller: 'CajaCtrl as caja',
			templateUrl: 'lista.html'
		}).state('not-found', {
			url: '*path',
			templateUrl: 'not-found.html'
		});
	// realmente no existe un estado 'not found',
	// pero pueden llegar rutas no controladas
});
