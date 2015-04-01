
app.controller('phoneManageController',['$scope','$resource','$location','$modal','$filter','TaskDFactory',function($scope,$resource,$location,$modal,$filter,TaskDFactory){
//  console.log($location.hash());
//  var username = '1234';
  //,{'query': {method: 'GET', isArray: false }
  $scope.columns = [
                    {text:"Phone No.",dataType:"number"},
                    {text:"Call Duration"},
                    {text:"Call Interval"},
                    {text:"Call Times"},
                    {text:"Call Display"},
                    {text:"Call Time"},
                    {text:"Action",}
  ];
  var phones = TaskDFactory.get(function (data) {
    //get /api/v1/xxx/phones
    console.log(data);
    $scope.phones = data.phones;
    $scope.sounds = data.sounds;
    //$scope.selsound = $scope.sounds[0];
  });


  $scope.deletePhone = function(phone){
    if(confirm("Are you sure to remove the phone")){
//      Data.delete("products/"+product.id).then(function(result){
//        $scope.products = _.without($scope.products, _.findWhere($scope.products, {id:product.id}));
//      });
       TaskDFactory.delete({taskid:phone.PK_TASKDETAIL},function(result){
         if( result.status == "ok" ){
          $scope.phones = _.without($scope.phones, _.findWhere($scope.phones, {PK_TASKDETAIL:phone.PK_TASKDETAIL}));
          console.log(phone.PHONE_NUM+' was deleted');
         }else{
          console.log('oopoos,there is an error');
         }
       });
    }
  };

  $scope.open = function (phone,size) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/phoneAdd.html',
      controller: 'phoneAddCtrl',
      size: size,
      resolve: {
        item: function () {
          return phone;
        },
        sounds: function() {
          return $scope.sounds;
        }
      }
    });
    modalInstance.result.then(function(selectedObject) {
        if(selectedObject.save == "insert"){
            $scope.phones.push(selectedObject);
            console.log($scope.phones);
        }else if( selectedObject.save == 'update'){
          phone.PHONE_NUM = selectedObject.PHONE_NUM;
          phone.CALL_DURATION = selectedObject.CALL_DURATION;
          phone.CALL_INTERVAL = selectedObject.CALL_INTERVAL;
          phone.CALL_TIMES = selectedObject.CALL_TIMES;
          phone.CALL_DISPLAY = selectedObject.CALL_DISPLAY;
          phone.CALL_NEXTTIME = selectedObject.CALL_NEXTTIME;
          phone.CALL_VOICE = selectedObject.CALL_VOICE;
        }
    });
  };
}]);


/**
 * phoneAddCtrl
 * @param  {[type]} $scope         angular scope
 * @param  {[type]} $location      angular ngRoute
 * @param  {[type]} $resource      angular ngResource
 * @param  {[type]} $modalInstance angular ui bootstrap
 * @param  {[type]} item           a phone item
 * @param  {[type]} sounds         current sounds list
 * @param  {[type]} TaskDFactory)  {             $scope.sounds [description]
 * @return {[type]}                [description]
 */
app.controller('phoneAddCtrl',['$scope','$location','$resource','$modalInstance','item','sounds','TaskDFactory',function ($scope,$location,$resource,$modalInstance,item,sounds,TaskDFactory) {
  $scope.sounds = angular.copy(sounds);
  $scope.selsound = $scope.sounds[0];
  if( typeof(item) != "undefined"){
    $scope.phone = angular.copy(item);
    $scope.title =  'Edit Task' ;
    $scope.buttonText = 'Update Task' ;
    $scope.dt = $scope.phone.CALL_NEXTTIME ? $scope.phone.CALL_NEXTTIME : new Date();
  }else{
    $scope.title =  'Add Phone' ;
    $scope.buttonText = 'Add New Phone' ;
    $scope.dt = new Date();
  }

  $scope.cancel = function () {
    $modalInstance.dismiss('Close');
  };

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.dt ? $scope.dt : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.hstep = 1;
  $scope.mstep = 15;
  $scope.ismeridian = false;
  $scope.addPhone = function (phone) {
    var x = angular.copy(phone);
    $scope.dt.setSeconds(0);
    x.CALL_NEXTTIME = $scope.dt;
    x.CALL_BOOKTIME = $scope.dt;
    x.CALL_VOICE = $scope.selsound.file_path;
    x.CALL_VOICE_LEN = $scope.selsound.file_desc;
    console.log($scope.dt.getTime());
    if(phone.PK_TASKDETAIL > 0  ){
      //update the taskdetail
      TaskDFactory.update(x,function(result) {
        if(result.status != 'error'){
          x.save = 'update';
          $modalInstance.close(x);
        }else{
          console.log(result);
        }
      })
    }else{
      //insert a new one
      x.CALL_STATUS = 0;
      TaskDFactory.save(x,function(result) {
        if(result.status != 'error'){
          x.PK_TASKDETAIL = result.insertId;
          x.save = 'insert';
          console.log(x);
          $modalInstance.close(x);
        }else{
          console.log(result);
        }
      })
    }
  };

}]);
