var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var bizInfoCheckService = popbill.BizInfoCheckService();

// bizInfoCheckService.getChargeInfo('1234567890', 'testkorea',
// 	function(response){
// 		console.log(response);
// 	}, function(error){
// 		console.log(error);
// 	})
//
// bizInfoCheckService.getUnitCost('1234567890',
// 	function(response){
// 		console.log('Unitcost : ' + response);
// 	}, function(error){
// 		console.log(error);
// 	})
//
// bizInfoCheckService.getBalance('1234567890',
// 	function(response){
// 		console.log('Balance : ' + response);
// 	}, function(error){
// 		console.log(error);
// 	})

// bizInfoCheckService.checkBizInfo('1234567890','6798700433',"testkorea",
// 	function(response){
// 		console.log(response);
// 	}, function(error){
// 		console.log(error);
// 	})

bizInfoCheckService.checkBizInfo('1234567890','6798700433',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})