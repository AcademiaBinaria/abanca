
module.exports = function configurar() {
    console.log('configurar')
    angular.module('cashFlow').config(function ($stateProvider) {
        $stateProvider
            .state('not-found', {
                url: '*path',
                templateUrl: 'not-found.html'
            });
    });

    // Seguridad
    angular.module('cashFlow').run(function ($http, $cookies) {
        $http.defaults.headers["appId"] = 'CashFlow';
    });

    angular.module('cashFlow').config(configuradorInterceptores);


    function configuradorInterceptores($httpProvider) {
        console.log('configuradorInterceptores')
        $httpProvider.interceptors.push(funcionInterceptoraSeguridad);
    }


    function funcionInterceptoraSeguridad($injector, $q, $cookies, $rootScope) {
        console.log('funcionInterceptoraSeguridad')
        var interceptor = {};

        interceptor.request = function (request) {
            request.headers["sessionId"] = $cookies.get("sessionId");
            return request;
        };

        interceptor.responseError = function (response) {
            var $state = $injector.get('$state');
            if (response.status === 401) {
                // Si no tenemos cookie o es inválida, recibiremos un 401
                $rootScope.mensaje = "No hay derecho!!!";
                // Redirigimos al usuario a la página de registro
                $state.go('registro');
            } else if (response.status === 419) {
                $rootScope.mensaje = "Estoy caduco!!!";
                // Similar al 401, pero con sesión caducada, implica borrar el código actual
                $cookies.remove("sessionId")
                $state.go('registro');
            };
            return $q.reject(response);
        }


        return interceptor;
    }
}