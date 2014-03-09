/*global angular */

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
define(['asset!angular', 'asset!angular-route'], function(angular) {
	'use strict';

	var dependencies = [
		'asset!js/controllers/todoCtrl', 
		'asset!index', 
		'asset!js/services/todoStorage',
		'asset!js/directives/todoEscape',
		'asset!js/directives/todoFocus',
	];

	require(dependencies, function(todoCtrl, indexHtml) {
		angular.module('todomvc', ['ngRoute']).config(function ($routeProvider) {
			$routeProvider.when('/', {
				controller: toDoCtrl,
				template: indexHtml
			}).when('/:status', {
				controller: toDoCtrl,
				templateUrl: indexHtml
			}).otherwise({
				redirectTo: '/'
			});
		});
	});
});