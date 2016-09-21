(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('./valoracion/valoracion.js');

require('./menu/menu.js');

require('./transclusiones.js');

angular.module('abComponentes', ['ngMaterial', 'abValoracion', 'abMenu', 'abTransclusiones']).component('abContenido', {
    template: '<section layout="row" layout-wrap><span flex="10"></span><span flex ui-view flex="80"></span><span flex="10"></span></section>'
}).component('abFilaMovimiento', {
    templateUrl: './componentes/tpl-fila-movimiento.html',
    bindings: {
        movimiento: '='
    }
}).component('abContador', {
    templateUrl: './componentes/tpl-contador.html',
    bindings: {
        texto: '@',
        valor: '='
    }
}).directive('abFilaMovimiento2', function () {
    return {
        restrict: 'A',
        templateUrl: './componentes/tpl-fila-movimiento2.html',
        scope: {
            movimiento: '='
        }
    };
});

exports.default = 'abComponentes';

},{"./menu/menu.js":2,"./transclusiones.js":3,"./valoracion/valoracion.js":4}],2:[function(require,module,exports){
'use strict';

angular.module('abMenu', ['ui.router', 'ngMaterial']).controller('MenuCtrl', menuCtrl).component('abMenuNavegacion', {
    templateUrl: './componentes/menu/tpl-menu-navegacion.html',
    controller: 'MenuCtrl'
});

function menuCtrl($state) {
    this.soyElEstadoActivo = function (estado) {
        return $state.is(estado);
    };
}

},{}],3:[function(require,module,exports){
'use strict';

angular.module('abTransclusiones', []).directive('abFirma', firma).directive('abCabecera', cabecera);

// El uso más simple es crear directivas para usar como código reutilizable
function firma() {
    return {
        transclude: {
            autor: 'autor',
            empresa: '?empresa'
        },
        template: '<footer class="container"><hr/><p class="text-center">Desarrollado con AngularJS by Google. Por <span ng-transclude="autor"></span> - <span ng-transclude="empresa"></span></p></footer>'
    };
};

// Dos mejoras, sacar el html a un fichero externo (tpl-directiva)
// Usar Transclude para reutilizar el contenido del usuario y hacer la vista más dinámica
// En este caso la plantilla debe usar la directiva ng-transclude
function cabecera() {
    return {
        transclude: {
            mensaje: 'mensaje'
        },
        templateUrl: './componentes/tpl-cabecera.html'
    };
};

},{}],4:[function(require,module,exports){
'use strict';

angular.module('abValoracion', ['ngMaterial']).component('abValoracion', {
    templateUrl: './componentes/valoracion/tpl-valoracion.html',
    bindings: {
        valor: '=',
        max: '@',
        soloLectura: '@'
    },
    controller: valoracionCtrl
});

function valoracionCtrl() {
    var vm = this;
    /** para empezar iniciamos los datos según lo recibido en el scope */
    actualizarEstrellas();

    /** responde al click en una estrella */
    vm.marcar = function (indice) {
        if (vm.soloLectura && vm.soloLectura === 'true') {
            return;
        }
        vm.valor = indice + 1;
        actualizarEstrellas();
    };

    /** actualiza los datos para repintar la vista */
    function actualizarEstrellas() {
        if (!vm.valor) vm.valor = 1;
        vm.estrellas = [];
        for (var i = 0; i < vm.max; i++) {
            var estrella = {
                marcada: i < vm.valor
            };
            vm.estrellas.push(estrella);
        }
    };
}

},{}],5:[function(require,module,exports){
'use strict';

module.exports = function configurar() {
    console.log('configurar');
    angular.module('cashFlow').config(function ($stateProvider) {
        $stateProvider.state('not-found', {
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
        console.log('configuradorInterceptores');
        $httpProvider.interceptors.push(funcionInterceptoraSeguridad);
    }

    function funcionInterceptoraSeguridad($injector, $q, $cookies, $rootScope) {
        console.log('funcionInterceptoraSeguridad');
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
                $cookies.remove("sessionId");
                $state.go('registro');
            };
            return $q.reject(response);
        };

        return interceptor;
    }
};

},{}],6:[function(require,module,exports){
'use strict';

require('../servicios/servicios.js');

require('./total/total.js');

require('./nuevo/nuevo.js');

require('./lista/lista.js');

require('./registro/registro.js');

angular.module('estados', ['ngMaterial', 'total', 'nuevo', 'lista', 'registro']);

},{"../servicios/servicios.js":14,"./lista/lista.js":7,"./nuevo/nuevo.js":8,"./registro/registro.js":9,"./total/total.js":10}],7:[function(require,module,exports){
'use strict';

require('../../componentes/componentes.js');

require('../../servicios/servicios.js');

angular.module('lista', ['ui.router', 'abFiltros', 'abComponentes', 'servicios']).config(function ($stateProvider) {
    $stateProvider.state('lista', {
        url: '/lista',
        template: '<ab-lista></ab-lista>'
    });
}).component('abLista', {
    templateUrl: './estados/lista/lista.html',
    controller: function controller(movimientosService) {
        this.valorCorte = 0;
        this.movimientos = movimientosService.movimientos.query();
    }
});

},{"../../componentes/componentes.js":1,"../../servicios/servicios.js":14}],8:[function(require,module,exports){
'use strict';

require('../../componentes/componentes.js');

require('../../servicios/servicios.js');

angular.module('nuevo', ['ui.router', 'abFiltros', 'abComponentes', 'servicios']).config(function ($stateProvider) {
    $stateProvider.state('nuevo', {
        url: '/nuevo',
        template: '<ab-nuevo></ab-nuevo>'
    });
}).component('abNuevo', {
    templateUrl: './estados/nuevo/nuevo.html',
    controller: function controller(movimientosService, maestrosService) {

        var _this = this;
        _this.nuevoMovimiento = new movimientosService.movimientos();
        _this.nuevoMovimiento.esIngreso = 1;
        _this.nuevoMovimiento.fecha = new Date();

        _this.maestros = maestrosService.get();

        _this.guardarMovimiento = function () {
            _this.nuevoMovimiento.fecha = new Date(_this.nuevoMovimiento.fecha);
            _this.nuevoMovimiento.$save().then(function (result) {
                _this.nuevoMovimiento.importe = 0;
            }, function (error) {
                console.error(error);
                _this.nuevoMovimiento.importe = -9999;
            });
        };
    }
});

},{"../../componentes/componentes.js":1,"../../servicios/servicios.js":14}],9:[function(require,module,exports){
'use strict';

angular.module('registro', ['ui.router']).config(function ($stateProvider) {
    $stateProvider.state('registro', {
        url: '/registro',
        template: '<ab-registro></ab-registro>'
    });
}).component('abRegistro', {
    templateUrl: './estados/registro/registro.html',
    controller: registroCtrl
});

function registroCtrl($state, $http, $cookies, $rootScope) {
    var urlBase = "/api/pub/";
    var vm = this;
    vm.usuario = {};
    vm.registrar = function () {
        $http.post(urlBase + 'usuarios/', vm.usuario).then(function (respuesta) {
            $rootScope.usuario = vm.usuario.email;
            $rootScope.mensaje = 'recién creado';
            $cookies.put("sessionId", respuesta.data);
            $state.go("total");
        }, function (respuesta) {
            $rootScope.mensaje = respuesta.data;
        });
    };
    vm.entrar = function () {
        $http.post(urlBase + 'sesiones/', vm.usuario).then(function (respuesta) {
            $rootScope.usuario = vm.usuario.email;
            $rootScope.mensaje = 'recién entrado';
            $cookies.put("sessionId", respuesta.data);
            $state.go("total");
        }, function (respuesta) {
            $rootScope.mensaje = respuesta.data;
        });
    };
}

},{}],10:[function(require,module,exports){
'use strict';

require('../../componentes/componentes.js');

require('../../servicios/servicios.js');

angular.module('total', ['ui.router', 'abFiltros', 'abComponentes', 'servicios']).config(function ($stateProvider) {
    $stateProvider.state('total', {
        url: '/',
        template: '<ab-total></ab-total>'
    });
}).component('abTotal', {
    templateUrl: './estados/total/total.html',
    controller: function controller(movimientosService) {
        var vm = this;
        /*
        movimientosService.gettingTotal()
            .success(function (result) {
                vm.total = result;
            })
            */
        // sintáxis síncrona
        vm.total = movimientosService.total.get();
    }
});

},{"../../componentes/componentes.js":1,"../../servicios/servicios.js":14}],11:[function(require,module,exports){
'use strict';

angular.module('abFiltros', []).filter('abLimpiarNumero', limpiarNumero).filter('abLimpiarCadena', limpiarCadena).filter('abRecortar', recortar).filter('abRellenarVacios', rellenarVacios).filter('abGranImporte', granImporte);

function limpiarNumero() {
    var funcionFiltro = function funcionFiltro(cadena) {
        if (cadena) {
            if (angular.isNumber(cadena)) {
                var numero = parseInt(cadena);
                if (numero != 0) return numero;
            }
        }
        return "";
    };
    return funcionFiltro;
}

function limpiarCadena() {
    var funcionFiltro = function funcionFiltro(cadena) {
        if (cadena) {
            var resultado = cadena.toLowerCase();
            var patron = /[^-A-Za-z0-9]+/g;
            return resultado.replace(patron, '_');
        }
    };
    return funcionFiltro;
}

function recortar() {
    var funcionFiltro = function funcionFiltro(cadena, largo, quitarInicio) {
        if (!cadena) {
            return '';
        }
        if (!largo) {
            largo = 10;
        }
        if (cadena.length <= largo) {
            return cadena;
        }
        if (quitarInicio) {
            return '...' + cadena.substring(cadena.length - largo);
        } else {
            return cadena.substring(0, largo) + '...';
        }
    };
    return funcionFiltro;
}

function rellenarVacios() {
    var funcionFiltro = function funcionFiltro(cadena) {
        try {
            if (!cadena || cadena === undefined || cadena.trim() === "") {
                return '---';
            };
        } catch (err) {
            return '---';
        }
        return cadena;
    };
    return funcionFiltro;
}

function granImporte() {
    var funcionFiltro = function funcionFiltro(movimientos, valorCorte) {
        var corte = valorCorte == undefined ? 1000 : valorCorte;
        var filtrados = [];
        for (var i = 0; i < movimientos.length; i++) {
            var mov = movimientos[i];
            if (mov.importe >= corte) {
                filtrados.push(mov);
            }
        }
        return filtrados;
    };
    return funcionFiltro;
}

},{}],12:[function(require,module,exports){
'use strict';

angular.module('maestros', ['ngResource']).service('maestrosService', maestrosService);

function maestrosService($resource) {

    return $resource("/api/pub/maestros/");
}

},{}],13:[function(require,module,exports){
'use strict';

angular.module('movimientos', ['ngResource']).service('movimientosService', movimientosService);

function movimientosService($resource) {
	this.movimientos = $resource("/api/priv/movimientos/");
	this.total = $resource("/api/priv/movimientos/totales/");
};

},{}],14:[function(require,module,exports){
'use strict';

require('./maestrosService.js');

require('./movimientosService.js');

angular.module('servicios', ['maestros', 'movimientos']);

},{"./maestrosService.js":12,"./movimientosService.js":13}],15:[function(require,module,exports){
'use strict';

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

require('./componentes/componentes.js');

require('./estados/estados.js');

require('./filtros/filtros.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('cashFlow', ['ngCookies', 'ui.router', 'estados', 'abFiltros', 'abComponentes']);

angular.element(document).ready(function () {
  return angular.bootstrap(document, ['cashFlow']);
});

(0, _config2.default)();

},{"./componentes/componentes.js":1,"./config.js":5,"./estados/estados.js":6,"./filtros/filtros.js":11}]},{},[15]);
