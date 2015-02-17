var app=angular.module('ContactListApp',[]);

app.controller('AppCtrl',['$scope','$http',function($scope,$http){

var reflesh=function(){
	 $http.get('/contactlist')
	 .success(function(res){
	 	//console.log("I got the data I requested");
	 	 $scope.contactlist=res;
	 	 $scope.contact="";
	 });
};

reflesh();
 $scope.add=function(){
 	//console.log($scope.contact);
 	$http.post('/contactlist',$scope.contact)
 	.success(function(res){
 		//console.log(res);
 		reflesh();
 	});
 };

 $scope.remove=function(id){
 	//console.log(id);
 	$http.delete('/contactlist/'+id).success(function(res){
 		//console.log(res);
 		reflesh();
 	});
 };

 $scope.edit=function(id){
 	//console.log(id);
 	$http.get('/contactlist/'+id).success(function(res){
 		$scope.contact=res;
 	});
 };

 $scope.update=function(){
 	$http.put('/contactlist/'+$scope.contact._id,$scope.contact)
 	.success(function(res){
 		//console.log(res);
 		reflesh();
 	});
 };
}]);