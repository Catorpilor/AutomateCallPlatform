'use strict'

//declare app level module

var app = angular.module('myApp',['ngRoute','ngResource','ui.bootstrap'],function($interpolateProvider){
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});
// app.config(['$locationProvider',function($locationProvider) {
// 	$locationProvider.html5Mode({
// 		enable: true,
// 	});
// }]);
