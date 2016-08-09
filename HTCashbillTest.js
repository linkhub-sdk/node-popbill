var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var htCashbillService = popbill.HTCashbillService();

htCashbillService.getChargeInfo('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
  });

KeyType = popbill.MgtKeyType.SELL;

htCashbillService.requestJob('1234567890', KeyType, '20160601', '20160831',
  function(response){
    console.log(response);
  }, function (error){
    console.log(error);
});

jobID = "016072114000000007";

htCashbillService.getJobState('1234567890', jobID,
  function(response){
    console.log(response);
  }, function (error){
    console.log(error);
});

htCashbillService.listActiveJob('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});


TradeType = ['N', 'C'];
TradeUsage = ['P', 'C'];

htCashbillService.search('1234567890', '016072114000000007', TradeType, TradeUsage, 1, 10, 'D', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

htCashbillService.summary('1234567890', '016072114000000007', TradeType, TradeUsage, 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

htCashbillService.getFlatRatePopUpURL('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

htCashbillService.getCertificatePopUpURL('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

htCashbillService.getFlatRateState('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

htCashbillService.getCertificateExpireDate('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});
