import config from './moduleconfig.js'
import './estados/estados.js'
import './estados/total/total.js'
import './estados/nuevo/nuevo.js'
import './estados/lista/lista.js'
import './estados/registro/registro.js'
import './servicios/servicios.js'
import './servicios/maestrosService.js'
import './servicios/movimientosService.js'
import './filtros/filtros.js'
import './componentes/componentes.js'
import './componentes/menu/menu.js'
import './componentes/transclusiones.js'
import './componentes/valoracion/valoracion.js'

angular.module('cashFlow', ['ngCookies', 'ui.router', 'estados', 'abFiltros', 'abComponentes'])

angular.element(document).ready(() => angular.bootstrap(document, ['cashFlow']))

config()