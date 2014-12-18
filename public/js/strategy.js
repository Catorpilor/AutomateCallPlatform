app.factory('StrategyFactory', ['$resource', function($resource) {
  return $resource('/api/v1/strategy', null,{
    'update': { method:'PUT' }
  });
}]);
