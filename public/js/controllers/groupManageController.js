app.controller('groupManageController',['$scope','$resource','$location','$modal','$filter',function($scope,$resource,$location,$modal,$filter){
//  console.log($location.hash());
//  var username = '1234';
  //,{'query': {method: 'GET', isArray: false }
  var phoneArray = $resource('/api/v1/groups');

  var phones = phoneArray.get(function (data) {
    //get /api/v1/xxx/phones
    console.log(data);
    $scope.phones = data.phones;
  });

  $scope.deletePhone = function(phone){
    if(confirm("Are you sure to remove the phone")){
//      Data.delete("products/"+product.id).then(function(result){
//        $scope.products = _.without($scope.products, _.findWhere($scope.products, {id:product.id}));
//      });
       phoneArray.delete({phonenum:phone.PHONE_NUM},function(result){
         if( result.status == "ok" ){
          $scope.phones = _.without($scope.phones, _.findWhere($scope.phones, {PHONE_NUM:phone.PHONE_NUM}));
          console.log(phone.PHONE_NUM+' was deleted');
         }else{
          console.log('oopoos,there is an error');
         }
       });
    }
  };

  $scope.open = function (size) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/phoneAdd.html',
      controller: 'phoneAddCtrl',
      size: size
    });
    modalInstance.result.then(function(selectedObject) {
        if(selectedObject.save == "insert"){
            $scope.phones.push(selectedObject);
            console.log($scope.phones);
        }
    });
  };
}]);

app.controller('phoneAddCtrl',function ($scope,$location,$resource,$modalInstance) {
  var phoneArray = $resource('/api/v1/phones');
  $scope.cancel = function () {
    $modalInstance.dismiss('Close');
  };

  $scope.addPhone = function (phone) {
    var x = {};
    x.PHONE_NUM = phone.phoneNo;
    //var x = angular.copy(phone);
    //console.log(x);
    x.save = 'insert';
    var iphone = new phoneArray({phoneNum: phone.phoneNo});
    var result = iphone.$save();
    console.log(result);
    $modalInstance.close(x);
  };

});
