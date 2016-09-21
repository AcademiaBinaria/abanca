import configurador from './config.js'
import './componentes/componentes.js'
import './estados/estados.js'
import './filtros/filtros.js'

angular.module('cashFlow', ['ngCookies', 'ui.router', 'estados', 'abFiltros', 'abComponentes'])

angular.element(document).ready(() => angular.bootstrap(document, ['cashFlow']))

configurador()