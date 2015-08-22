/**
* app Module
*
* Description
*/
angular.module('app', []);

angular.module('app', []).controller('TodoController', function($scope) {
	$scope.title = 'Angular Todo List';

	$scope.todos = [
		{title: 'Buy Groceries', description: 'Fruit, Cereal, Cola, Pies, etc'},
		{title: 'Print Photos',  description: 'Get photos printed at Boots'},
		{title: 'Book Holiday',  description: 'Book the hotel we found in Goa'}
	];
});