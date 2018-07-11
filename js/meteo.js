var app = angular.module('w_meteo',[])
var url;


app.factory("meteo",function($http,$q){
	return {	
		get:  function(city){
			var deferred = $q.defer();
			$http.get('https://openweathermap.org/data/2.5/weather?q='+city+'&appid=b6907d289e10d714a6e88b30761fae22')
			.then(function(response){
				deferred.resolve(response.data);
			})
			.catch(function(response){
				deferred.reject(response);
			});
			return deferred.promise;
		}
	}
})


app.controller('widgetController',function($scope,meteo){
	$scope.prendi = function(){
		


		meteo.get($scope.city).then(function(data){
			$scope.weather = data;	
			$scope.weather.sys.country = '('+ $scope.weather.sys.country +')';
			$scope.weather.main.temp = $scope.weather.main.temp+' °C';
			$scope.weather.main.pressure = $scope.weather.main.pressure+' atm';
			$scope.weather.main.humidity = $scope.weather.main.humidity+' %';
			$scope.city='';			
		})
		.catch(function(response){
			console.log(response.status)
		});
		

	}
	$scope.togli = function(){
		$scope.weather.name = '';
		$scope.weather.sys.country = '';
		$scope.weather.main.temp = '';
		$scope.weather.main.pressure = '';
		$scope.weather.main.humidity = '';
		$scope.city='';	

	}
})



