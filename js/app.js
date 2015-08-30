/**
* app Module
*
* Description
*/
angular.module('app', ['angular-websql']);

angular.module('app').filter('yesNo', function() {
	return function(data) {
		var out = 'Yes';
		if (data && typeof data == 'string' && data.toLowerCase() == 'false') {
			out = 'No';
		} else {
			out = !!data ? 'Yes' : 'No';
		}
		return out;
	}
});

angular.module('app').controller('TodoController', function($scope, $webSql) {
	$scope.pageTitle = 'Angular Todo List';

	// $scope.todos = [
	// 	{title: 'Buy Groceries', description: 'Fruit, Cereal, Cola, Pies, etc'},
	// 	{title: 'Print Photos',  description: 'Get photos printed at Boots'},
	// 	{title: 'Book Holiday',  description: 'Book the hotel we found in Goa'}
	// ];

	$scope.db = $webSql.openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
	$scope.db.createTable('todos', {
		"id":{
			"type": "INTEGER",
			"null": "NOT NULL", // default is "NULL" (if not defined)
			"primary": true, // primary
			"auto_increment": true // auto increment
		},
		"title":{
			"type": "TEXT",
			"null": "NOT NULL"
		},
		"description": {
			"type": "TEXT",
			"null": "NULL"
		},
		"complete": {
			"type": "BOOLEAN",
			"null": "NOT NULL",
			"default": 0
		},
		"created_at":{
			"type": "TIMESTAMP",
			"null": "NOT NULL",
			"default": "CURRENT_TIMESTAMP" // default value
		},
		"updated_at":{
			"type": "TIMESTAMP",
			"null": "NOT NULL",
			"default": "CURRENT_TIMESTAMP" // default value
		}
	});

	$scope.index = function() {
		$scope.db.selectAll('todos').then(function(results) {
			$scope.todos = [];
			for(var i=0; i < results.rows.length; i++) {
				$scope.todos.push(results.rows.item(i));
			}
		});
	};
	$scope.index();

	$scope.removeItem = function(itemId) {
		$scope.db.del("todos", {"id": itemId}).then(function(results) {
			$scope.index();
		});
	};

	$scope.addItem = function() {
		$scope.formData.complete = $scope.formData.complete ? 1 : 0;
		$scope.db.insert('todos', $scope.formData).then(function(results) {
			console.info(results.insertId);
			$scope.formData = {};
			$scope.index();
		});
	};

	$scope.updateItem = function(item) {
		$scope.mode = 'edit';
		var editableItem = angular.copy(item);
		$scope.formData  = editableItem;
	};

	$scope.updateItemSave = function(item) {
		$scope.mode = 'edit';
		$scope.db.update("todos", {"title": $scope.formData.title, "description": $scope.formData.description, "complete": $scope.formData.complete ? 1 : 0}, {
			'id': $scope.formData.id
		}).then(function() {
			$scope.formData = {};
			$scope.mode = '';
			$scope.index();
		});
	};

	$scope.toggleComplete = function(item) {
		$scope.db.update("todos", {"complete": !item.complete ? 1 : 0}, {
			'id': item.id
		}).then(function(result) {
			$scope.index();
		});
	};

});