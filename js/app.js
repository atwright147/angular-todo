/**
* app Module
*
* Description
*/
angular.module('app', ['angular-websql']);

angular.module('app').controller('TodoController', function($scope, $webSql) {
	$scope.pageTitle = 'Angular Todo List';

	$scope.todos = [
		{title: 'Buy Groceries', description: 'Fruit, Cereal, Cola, Pies, etc'},
		{title: 'Print Photos',  description: 'Get photos printed at Boots'},
		{title: 'Book Holiday',  description: 'Book the hotel we found in Goa'}
	];

	$scope.db = $webSql.openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);

	$scope.removeItem = function(item) {
		$scope.todos.splice(item, 1);
	};

	$scope.addItem = function() {
		$scope.todos.push($scope.formData);
		$scope.formData = {};
	};

	$scope.updateItem = function(item) {
		$scope.mode = 'edit';
		var editableItem = angular.copy(item);
		$scope.formData  = editableItem;
	};

	$scope.updateItemSave = function(item) {
		$scope.mode = 'edit';
		$scope.todos.splice(item, 1);
		$scope.todos.push($scope.formData);
		$scope.formData = {};
		$scope.mode = '';
	};
});