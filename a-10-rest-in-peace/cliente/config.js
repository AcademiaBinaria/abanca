angular.module('cashFlow').config(function ($stateProvider) {
	$stateProvider
//		.state('total', {
			//			url: '/',
			//			controller: 'CajaCtrl as caja',
			//			templateUrl: './estados/total/total.html'
			//		})
			//		.state('nuevo', {
			//			url: '/nuevo',
			//			controller: 'CajaCtrl as caja',
			//			templateUrl: './estados/nuevo/nuevo.html'
			//		})
			//		.state('lista', {
			//			url: '/lista',
			//			controller: 'CajaCtrl as caja',
			//			templateUrl: './estados/lista/lista.html'
			//		})
		.state('not-found', {
			url: '*path',
			templateUrl: 'not-found.html'
		});
});
