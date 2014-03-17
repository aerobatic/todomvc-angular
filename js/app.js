/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
define(['angular', 'angular-route'], function(angular) {
	'use strict';

	var todoMvcApp = angular.module('todomvc', ['ngRoute']);

	var dependencies = [
		'asset!js/controllers/todoCtrl', 
		'asset!index', 
		'asset!js/services/todoStorage',
		'asset!js/directives/todoEscape',
		'asset!js/directives/todoFocus',
		'css!base'
	];

	require(dependencies, function(todoCtrl, indexHtml) {
		todoMvcApp.config(['$routeProvider', function ($routeProvider) {
			$routeProvider.when('/', {
				controller: todoCtrl,
				templateUrl: 'todomvc-index.html'
			}).when('/:status', {
				controller: todoCtrl,
				templateUrl: 'todomvc-index.html'
			}).otherwise({
				redirectTo: '/'
			});
		}]);

		angular.element(document).ready(function() {
			// Append index.html to the body
			angular.element(document.body).append(angular.element(indexHtml));
	    angular.bootstrap(document, ['todomvc']);
	  });
	});
});