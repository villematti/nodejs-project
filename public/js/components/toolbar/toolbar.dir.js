(function() {


angular
		.module('nodejsApp')
		.directive('toolbar', toolbar);

		function toolbar() {
			return {
				templateUrl: '/assets/js/components/toolbar/toolbar.tpl.html',
				controller: toolbarController,
				controllerAs: 'toolbar'
			};
		}

		function toolbarController(auth, store, $location) {
			
		}


})();