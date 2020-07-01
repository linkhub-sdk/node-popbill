var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var accountCheckService = popbill.AccountCheckService();

accountCheckService.getChargeInfo('1234567890', 'testkorea',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});

accountCheckService.getUnitCost('1234567890',
	function(response){
		console.log('Unitcost : ' + response);
	}, function(error){
		console.log(error);
	});

accountCheckService.getBalance('1234567890',
	function(response){
		console.log('Balance : ' + response);
	}, function(error){
		console.log(error);
	});


accountCheckService.checkAccountInfo('1234567890', '0004', '94324511758',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	});
