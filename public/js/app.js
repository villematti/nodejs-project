angular.module('nodejsApp',['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial','ui.router'])
	.config(function($provide, authProvider, $urlRouterProvider,
		$stateProvider, $httpProvider, jwtInterceptorProvider) {

		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/assets/js/components/home/home.tpl.html'
			})
	});