import './valoracion/valoracion.js'
import './menu/menu.js'
import './transclusiones.js'

angular.module('abComponentes', ['ngMaterial', 'abValoracion', 'abMenu','abTransclusiones'])
    .component('abContenido', {
        template: '<section layout="row" layout-wrap><span flex="10"></span><span flex ui-view flex="80"></span><span flex="10"></span></section>'
    })
    .component('abFilaMovimiento', {
        templateUrl: './componentes/tpl-fila-movimiento.html',
        bindings: {
            movimiento: '='
        }
    })
    .component('abContador', {
        templateUrl: './componentes/tpl-contador.html',
        bindings: {
            texto: '@',
            valor: '='
        }
    })
    .directive('abFilaMovimiento2', function () {
        return {
            restrict: 'A',
            templateUrl: './componentes/tpl-fila-movimiento2.html',
            scope: {
                movimiento: '='
            }
        }
    })


export default 'abComponentes';