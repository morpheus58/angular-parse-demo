/*
    app.js
    code for our demo application
 */

"use strict";

//this is the base URL for all task objects managed by your application
//requesting this with a GET will get all tasks objects
//sending a POST to this will insert a new task object
//sending a PUT to this URL + '/' + task.objectId will update an existing task
//sending a DELETE to this URL + '/' + task.objectId will delete an existing task
var tasksUrl = 'https://api.parse.com/1/classes/tasks';

angular.module('ToDoApp', [])
    .config(function($httpProvider) {
        //Parse required two extra headers sent with every HTTP request: X-Parse-Application-Id, X-Parse-REST-API-Key
        //the first needs to be set to your application's ID value
        //the second needs to be set to your application's REST API key
        //both of these are generated by Parse when you create your application via their web site
        //the following lines will add these as default headers so that they are sent with every
        //HTTP request we make in this application
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'sCdcof2qId88N9xxhiKNE6VkuApvlgDIDhQf1RXU';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = '28ao9DcUXXMlcXhh4LreyQKjBIzqI2YK9iIP4Knx';
    })
    .controller('TasksController', function ($scope, $http) {
        $scope.refreshTasks = function () {
            $scope.loading = true;
            $http.get(tasksUrl + '?where={"done":false}')
                .success(function (data) {
                    $scope.tasks = data.results;
                })
                .error(function (err) {
                    $scope.errorMessage = err;
                })
                .finally(function () {
                    $scope.loading = false;
                });
        };
        $scope.refreshTasks();
        $scope.newTask = {done:  false};
        $scope.addTask = function () {
            $http.post(tasksUrl, $scope.newTask)
                .success(function (responseData) {
                    $scope.newTask.objectId = responseData.objectId;
                    $scope.tasks.push($scope.newTask);
                    $scope.newTask = {done: false};
                })
                .error(function(err){
                    $scope.errorMessage = err;
                });
        };

        $scope.updateTask = function (task) {
            $http.put(tasksUrl + '/' + task.objectId, task)
                .success(function () {

                })
                .error(function (err) {
                    $scope.errorMessage = err;
                });
        };
    });

