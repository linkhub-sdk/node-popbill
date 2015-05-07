var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var messageService = popbill.MessageService();

messageService.getUnitCost('1231212312',popbill.MessageType.SMS,
  function(UnitCost){
    console.log('UnitCost is : '  +  UnitCost);
});
