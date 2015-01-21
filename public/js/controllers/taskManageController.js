app.controller('taskManageController',['$scope','$resource','$location','$modal','$filter','TaskDFactory',function($scope,$resource,$location,$modal,$filter,TaskDFactory){
//  console.log($location.hash());
//  var username = '1234';
  //,{'query': {method: 'GET', isArray: false }
  //
  //
  //get task list
  var tasklist = $resource('/api/v1/task');
  var taskdata = tasklist.get(function (data) {
    //get /api/v1/xxx/phones
    console.log(data);
    $scope.tasks = data.tasks;
    $scope.phones = data.phonelists;
    $scope.strategies = data.strategies;
  });

  //get task details
  var taskdetails = $resource('/api/v1/tasksDetail');
  taskdetails.get(function(data) {
    if(data.status == 'ok'){
      //retrieve the data from server
      _($scope.tasks).forEach(function(obj){
        obj.phones = _.where(data.taskdetail,{PK_TASK:obj.PK_TASK});
      });

     //$scope.tasksDetail = taskdata;
    }
  });

  $scope.columns = [
                    {text:"Phone No.",dataType:"number"},
                    {text:"Call Duration"},
                    {text:"Call Interval"},
                    {text:"Call Times"},
                    {text:"Call Display"},
                    {text:"Action",}
  ];


  $scope.deletetaskDetail = function(task){
    if(confirm("Are you sure to remove the task")){
//      Data.delete("products/"+product.id).then(function(result){
//        $scope.products = _.without($scope.products, _.findWhere($scope.products, {id:product.id}));
//      });
       TaskDFactory.delete({taskdetailID:task.PK_TASKDETAIL},function(result){
          console.log(result);
         if( result.status == "ok" ){
          _.findWhere($scope.tasks,{PK_TASK:task.PK_TASK}).phones = _.without(_.findWhere($scope.tasks,{PK_TASK:task.PK_TASK}).phones, _.findWhere(_.findWhere($scope.tasks,{PK_TASK:task.PK_TASK}).phones, {PK_TASKDETAIL:task.PK_TASKDETAIL}));
          //$scope.strategies = _.without($scope.strategies, _.findWhere($scope.strategies, {PK_TASKDETAIL:task.PK_TASKDETAIL}));
          console.log(task.PK_TASKDETAIL+' was deleted');
         }else{
          console.log('oopoos,there is an error');
         }
       });
    }
  };

  $scope.openTask = function (p,size) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/taskAdd.html',
      controller: 'taskAddCtrl',
      size: size,
      resolve: {
        item: function () {
          return p;
        },
        phones: function() {
          return $scope.phones;
        },
        strategies: function() {
          return $scope.strategies
        }
      }
    });
    modalInstance.result.then(function(selectedObject) {
      $scope.tasks.push(selectedObject);
      console.log($scope.tasks);
    });
  };

  $scope.open = function(task,size) {
    var modalInstance = $modal.open({
      templateUrl: 'partials/editTaskDetail.html',
      controller: 'taskDetaiEditCtrl',
      size: size,
      resolve: {
        item: function () {
          return task;
        }
      }
    });
    modalInstance.result.then(function(selectedObject) {
      task.CALL_DURATION = selectedObject.CALL_DURATION;
      task.CALL_INTERVAL = selectedObject.CALL_INTERVAL;
      task.CALL_TIMES = selectedObject.CALL_TIMES;
      task.CALL_DISPLAY = selectedObject.CALL_DISPLAY;
    });
  };




}]);

app.controller('taskAddCtrl',['$scope','$modalInstance','$resource','item','phones','strategies','TaskDFactory',function ($scope,$modalInstance,$resource,item,phones,strategies,TaskDFactory) {
  if(typeof(item)!=  "undefined" ){
    $scope.task = angular.copy(item);
    $scope.checkedList = _.pick($scope.task.phones,'PHONE_NUM');
    $scope.title =  'Edit Task' ;
    $scope.buttonText = 'Update Task';
    $scope.tacticId = item.tacticId;
  }else{
    $scope.title = 'Add Task';
    $scope.buttonText = 'Add New Task';
    $scope.checkedList = [];
    $scope.tacticId = '';
  }

  _(phones).forEach(function(obj) {
    if( typeof (_.find($scope.checkedList, {'PHONE_NUM':obj.PHONE_NUM})) != "undefined" )
      obj.status = true;
    else
      obj.status = false;
  })
  $scope.phones = phones;

  _(strategies).forEach(function(obj) {
    if( obj.PK_TACTICS == $scope.tacticId )
      obj.status = true;
    else
      obj.status = false;
  })
  $scope.strategies = strategies;
  $scope.singleModel = 2;

  var original = item;

  $scope.isClean = function() {
      return angular.equals(original, $scope.strategy);
  }
  $scope.cancel = function () {
      $modalInstance.dismiss('Close');
  };

  $scope.radio = {model: $scope.strategies[0].PK_TACTICS};

  $scope.taskName='';


  $scope.addTask = function() {
    var x = {};
    x.TASK_NAME = $scope.taskName;
    var stra = _.where($scope.strategies,{'PK_TACTICS':$scope.radio.model});
    x.phones = _.where($scope.phones,{'status':true});
    -(x.phones).forEach(function(obj) {
      obj.CALL_DISPLAY = stra[0].CALL_DISPLAY;
      obj.CALL_DURATION = stra[0].CALL_DURATION;
      obj.CALL_INTERVAL = stra[0].CALL_INTERVAL;
      obj.CALL_TIMES = stra[0].CALL_TIMES;
      obj.strategy = stra[0];
    });
    x.TASK_STATUS = $scope.singleModel;
    console.log(x);
    var taskMan = $resource('/api/v1/task');
    var newtask = new taskMan(x);
    newtask.$save(function(result) {
      if(result.status != 'error'){
        x.PK_TASK = result.taskid;
        TaskDFactory.save(x,function(result) {
            if(result.status != 'error'){
              var ids = result.insertId*1;
              -(x.phones).forEach(function(obj) {
                obj.PK_TASKDETAIL = ids++;
                obj.PK_TASK = x.PK_TASK;
              });
              $modalInstance.close(x);
            }
        });
      }
    });
  }
}]);

app.controller('taskDetaiEditCtrl',['$scope','TaskDFactory','$modalInstance','item',function ($scope,TaskDFactory,$modalInstance,item) {

  $scope.taskD = angular.copy(item);
  $scope.title =  'Edit Detail' ;
  $scope.buttonText = 'Update Task Detail' ;

  var original = item;

  $scope.isClean = function() {
      return angular.equals(original, $scope.strategy);
  }
  $scope.cancel = function () {
      $modalInstance.dismiss('Close');
  };

  //var strategyMan = $resource('/api/v1/'+apiverb,null);

  $scope.saveTaskD = function (taskd) {
      //product.uid = $scope.uid;
     TaskDFactory.update(taskd,function(result) {
        if(result.status != 'error'){
          var x = angular.copy(taskd);
          $modalInstance.close(x);
        }else{
          console.log(result);
        }
      });
  };

}]);

