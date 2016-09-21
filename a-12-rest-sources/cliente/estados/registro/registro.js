(function () {
	angular.module('registro', ['ui.router'])
		.config(function ($stateProvider) {
			$stateProvider
				.state('registro', {
					url: '/registro',
					template: '<ab-registro></ab-registro>'
				})
		})
		.component('abRegistro', {
			templateUrl: './estados/registro/registro.html',
			controller: registroCtrl
		})

	// El rootScope mantiene un ViewModel al que se puede 'bindear' cualquier vista
	// Es cómodo usarlo para compartir datos de infraestructura
	// No conviene abusar, para reducir la posibilidad de conflictos y polución de la memoria
	// El servicio $cookieStore, viene en el módulo ngCookies
	function registroCtrl($state, $http, $cookies, $rootScope) {
		var urlBase = "/api/pub/";
		var vm = this;
		vm.usuario = {};
		vm.registrar = function () {
			$http.post(urlBase + 'usuarios/', vm.usuario)
				.then(function (respuesta) {
					$rootScope.usuario = vm.usuario.email;
					$rootScope.mensaje = 'recién creado';
					$cookies.put("sessionId", respuesta.data);
					$state.go("total");
				}, function (respuesta) {
					$rootScope.mensaje = respuesta.data;
				});
		}
		vm.entrar = function () {
			$http.post(urlBase + 'sesiones/', vm.usuario)
				.then(function (respuesta) {
					$rootScope.usuario = vm.usuario.email;
					$rootScope.mensaje = 'recién entrado';
					$cookies.put("sessionId", respuesta.data);
					$state.go("total");
				}, function (respuesta) {
					$rootScope.mensaje = respuesta.data;
				});
		}
	}

}());
