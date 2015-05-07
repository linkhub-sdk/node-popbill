var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var faxService = popbill.FaxService();

faxService.getUnitCost('1231212312',
  function(UnitCost){
    console.log('UnitCost is : '  +  UnitCost);
});


var options = {
	SenderNum : '07075106766',
	Receiver : '11112222',
	FilePaths : ['./테스트.jpg'],
	ReserveDT : null,
	UserID : null
};

faxService.sendFax('1231212312',
	options,
	function(receiptNum){
		console.log('receiptNum is : ' + receiptNum);
	});