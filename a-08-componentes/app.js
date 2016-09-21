// Es necesario incluir la referencia al módulo de componentes
angular.module('cashFlow', ['ui.router', 'abFiltros', 'abComponentes']);


angular.module('cashFlow').config(function ($stateProvider) {
	$stateProvider
		.state('total', {
			url: '/',
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
});
