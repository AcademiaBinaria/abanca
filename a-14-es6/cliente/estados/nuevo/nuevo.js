import '../../componentes/componentes.js'
import '../../servicios/servicios.js'

angular.module('nuevo', ['ui.router', 'abFiltros', 'abComponentes', 'servicios'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('nuevo', {
                url: '/nuevo',
                template: '<ab-nuevo></ab-nuevo>'
            })
    })
    .component('abNuevo', {
        templateUrl: './estados/nuevo/nuevo.html',
        controller: function (movimientosService, maestrosService) {

            var _this= this;
            _this.nuevoMovimiento = new movimientosService.movimientos();
            _this.nuevoMovimiento.esIngreso = 1;
            _this.nuevoMovimiento.fecha = new Date();

            _this.maestros = maestrosService.get();

            _this.guardarMovimiento = function () {
                _this.nuevoMovimiento.fecha = new Date(_this.nuevoMovimiento.fecha);
                _this.nuevoMovimiento.$save()
                    .then(function (result) {
                        _this.nuevoMovimiento.importe = 0;
                    }, function (error) {
                        console.error(error);
                        _this.nuevoMovimiento.importe = -9999;
                    });
            };


        }
    })


