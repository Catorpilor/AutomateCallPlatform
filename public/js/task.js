app.factory('TaskDFactory', ['$resource', function($resource) {
  return $resource('/api/v1/taskDetail', null,{
    'update': { method:'PUT' }
  });
}]);
