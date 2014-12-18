app.controller('strategyManageController',['$scope','$resource','$location','$modal','$filter','StrategyFactory',function($scope,$resource,$location,$modal,$filter,StrategyFactory){
//  console.log($location.hash());
//  var username = '1234';
  //,{'query': {method: 'GET', isArray: false }
  //var strategyArray = $resource('/api/v1/strategy');

  StrategyFactory.get(function (data) {
    //get /api/v1/xxx/phones
    console.log(data);
    $scope.strategies = data.strategies;
  });

  $scope.deleteStrategy = function(strategy){
    if(confirm("Are you sure to remove the strategy")){
//      Data.delete("products/"+product.id).then(function(result){
//        $scope.products = _.without($scope.products, _.findWhere($scope.products, {id:product.id}));
//      });
       StrategyFactory.delete({strategyId:strategy.PK_TACTICS},function(result){
          console.log(result);
         if( result.status == "ok" ){
          $scope.strategies = _.without($scope.strategies, _.findWhere($scope.strategies, {PK_TACTICS:strategy.PK_TACTICS}));
          console.log(strategy.TACTICS_NAME+' was deleted');
         }else{
          console.log('oopoos,there is an error');
         }
       });
    }
  };

  $scope.openStrategy = function (p,size) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/strategyAdd.html',
      controller: 'strategyAddCtrl',
      size: size,
      resolve: {
        item: function () {
          return p;
        }
      }
    });
    modalInstance.result.then(function(selectedObject) {
        if(selectedObject.save == "insert"){
            $scope.strategies.push(selectedObject);
            console.log($scope.strategies);
        }else if(selectedObject.save == "update"){
                p.TACTICS_NAME = selectedObject.TACTICS_NAME;
                p.CALL_DURATION = selectedObject.CALL_DURATION;
                p.CALL_INTERVAL = selectedObject.CALL_INTERVAL;
                p.CALL_TIMES = selectedObject.CALL_TIMES;
                p.CALL_DISPLAY = selectedObject.CALL_DISPLAY;
            }
    });
  };
}]);

app.controller('strategyAddCtrl',['$scope','StrategyFactory','$modalInstance','item',function ($scope,StrategyFactory,$modalInstance,item) {
  //var phoneArray = $resource('/api/v1/phones');
  if(typeof(item)!=  "undefined" ){
    $scope.strategy = angular.copy(item);
    $scope.title =  'Edit Strategy' ;
    $scope.buttonText = 'Update Strategy' ;
  }else{
    $scope.title = 'Add Strategy';
    $scope.buttonText = 'Add New Strategy';
  }

  var original = item;

  $scope.isClean = function() {
      return angular.equals(original, $scope.strategy);
  }
  $scope.cancel = function () {
      $modalInstance.dismiss('Close');
  };

  //var strategyMan = $resource('/api/v1/'+apiverb,null);

  $scope.saveStrategy = function (strategy) {
      //product.uid = $scope.uid;
      if(strategy.PK_TACTICS > 0){
        //update then

        StrategyFactory.update(strategy,function(result) {
          if(result.status != 'error'){
            var x = angular.copy(strategy);
            x.save = 'update';
            $modalInstance.close(x);
          }else{
            console.log(result);
          }
        });

      }else{
          //product.status = 'Active';
          //insert then
          // var strasMan = $resource('/api/v1/addStrategy');
          // var star = new strasMan({strategy:strategy});
          StrategyFactory.save({strategy:strategy},function(result){
            if(result.status != 'error'){
              var x = angular.copy(strategy);
              x.save = 'insert';
              x.PK_TACTICS = result.pk_tacid;
              console.log(x);
              $modalInstance.close(x);
            }else{
                console.log(result);
            }
          });

      }
  };

}]);
