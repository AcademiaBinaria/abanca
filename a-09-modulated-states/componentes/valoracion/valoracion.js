(function () {
	angular.module('abValoracion', [])
		.component('abValoracion', {
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
		actualizarEstrellas();

		vm.marcar = function (indice) {
			if (vm.soloLectura && vm.soloLectura === 'true') {
				return;
			}
			vm.valor = indice + 1;
			actualizarEstrellas();
		};

		function actualizarEstrellas() {
			if (!vm.valor) vm.valor = 1;
			vm.estrellas = [];
			for (var i = 0; i < vm.max; i++) {
				var estrella = {
					marcada: (i < vm.valor)
				};
				vm.estrellas.push(estrella);
			}
		};
	}
}());
