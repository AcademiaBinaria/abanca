angular.module('maestros',['ngResource']).service('maestrosService', maestrosService);

function maestrosService($resource) {

    return $resource("/api/pub/maestros/");


}

