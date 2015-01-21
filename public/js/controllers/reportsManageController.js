
app.controller('reportsManageController',['$scope','$resource','$interval','$filter',function($scope,$resource,$interval,$filter){
  $scope.columns = [
                    {text:"Phone No.",dataType:"number"},
                    {text:"Start Time"},
                    {text:"End Time"},
                    {text:"Result"}
  ];
  var baseReports = $resource('/api/v1/reports_b');
  baseReports.get(function(data) {
    $scope.reports = _.sortBy(data.reports, 'CALL_STATUS');
  });
  var reportsArray = $resource('/api/v1/reports');

  $interval(function() {
    reportsArray.get(function(data) {
      console.log('reports from interval');
      $scope.reports = _.sortBy(data.reports, 'CALL_STATUS');
    });
  },50000);

  // TaskDFactory.get(function (data) {
  //   //get /api/v1/xxx/phones
  //   console.log(data);
  //   $scope.reports = _.pick(data.phones,'PHONE_NUM','CALL_BOOKTIME','CALL_ENDTIME','CALL_TIMES','CALLDETAIL_SUCCESS','CALLDETAIL_FAILED');
  // });


}]);


