var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var closedownService = popbill.ClosedownService();

// closedownService.getChargeInfo('1234567890', 'testkorea',
// 	function(response){
// 		console.log(response);
// 	}, function(error){
// 		console.log(error);
// 	})
//
// closedownService.getUnitCost('1234567890',
// 	function(response){
// 		console.log('Unitcost : ' + response);
// 	}, function(error){
// 		console.log(error);
// 	})
//
// closedownService.getBalance('1234567890',
// 	function(response){
// 		console.log('Balance : ' + response);
// 	}, function(error){
// 		console.log(error);
// 	})

closedownService.checkCorpNum('1234567890','401-03-94930',
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})

var CorpNumList = ['1234567890','4108600477','401-03-94930']

closedownService.checkCorpNums('1234567890', CorpNumList,
	function(response){
		console.log(response);
	}, function(error){
		console.log(error);
	})
