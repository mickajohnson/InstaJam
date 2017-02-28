app.controller("successController", ["$scope", "userFactory", "$location", "$cookies", function($scope, userFactory, $location, $cookies){
  if ($cookies.get("user")){
    $scope.currentUser = $cookies.get("user");
    $scope.profile_id = $cookies.get('id');
  }
  else {
    $location.url('/')
  }
  $scope.logout = function(){
    $scope.currentUser = {};
    $cookies.remove("user");
    $location.url('/');
  }

  userFactory.showUser($scope.profile_id, function(data){
    if(data.err){
      console.log(data.err)
    }
    else{
      $scope.user = data.user
      console.log("User is", $scope.user)
    }
  })

}])
