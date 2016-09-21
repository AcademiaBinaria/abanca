(function () {
	angular.module('abValoracion', [])
		.component('abValoracion', {
			templateUrl: './tpl-valoracion.html',
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
            console.log(vm.valor)
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
