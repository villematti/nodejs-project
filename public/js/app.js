angular.module('nodejsApp',['auth0', 'angular-storage', 'angular-jwt', 'ngMaterial','ui.router'])
	.config(function($provide, authProvider, $urlRouterProvider,
		$stateProvider, $httpProvider, jwtInterceptorProvider) {

		authProvider.init({
			domain: 'villematti.eu.auth0.com',
			clientID : 'EbEcGeftNjBSYbOOxNnifGsJx1ng0pez'
		});

		jwtInterceptorProvider.tokenGetter = function(store) {
			return store.get('id_token');
		}

		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/assets/js/components/home/home.tpl.html'
			})

		function redirect($q, $injector, $timeout, store, $location) {

			var auth;
        	$timeout(function() {
          		auth = $injector.get('auth');
			});

			return {
				responseError: function(rejection) {
					
					if (rejection.status === 401) {
						auth.signout();
						store.remove('profile');
						store.remove('id_token');
						$location.path('/home');
					}

					return $q.reject(rejection);
				}
			};
		};

		$provide.factory('redirect', redirect);
		$httpProvider.interceptors.push('redirect');
		$httpProvider.interceptors.push('jwtInterceptor');
	})
	.run(function($rootScope, auth, store, jwtHelper, $location) {

		$rootScope.$on('$locationChangeStart', function() {

			var token = store.get('id_token');
			if (token) {
				if (!jwtHelper.isTokenExpired(token)) {
					if(!auth.isAuthenticated) {
						auth.authenticate(store.get.profile, token);
					}
				}
			} else {
				$location.path('/home');
			}
		});

	});