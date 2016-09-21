(function () {
    angular.module('cashFlow').controller('MenuCtrl',menuCtrl);

    function menuCtrl($location) {
        this.soyLaRutaActiva = function (ruta) {
            return ruta === $location.path();
        }
    }

}());

