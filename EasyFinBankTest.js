var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var easyFinBankService = popbill.EasyFinBankService();

easyFinBankService.getChargeInfo('1234567890',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

easyFinBankService.getChargeInfo('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

easyFinBankService.getBankAccountMgtURL('1234567890',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

easyFinBankService.getBankAccountMgtURL('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

easyFinBankService.listBankAccount('1234567890',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});


easyFinBankService.listBankAccount('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

easyFinBankService.requestJob('1234567890', '0048', '131020538645', '20191002', '20191230',
  function(response){
    console.log(response);
  }, function (error){
    console.log(error);
});

easyFinBankService.getJobState('1234567890', '019123016000000002',
  function(response){
    console.log(response);
  }, function (error){
    console.log(error);
});


easyFinBankService.listActiveJob('1234567890',
  function(response){
    console.log(response);
  }, function (error){
    console.log(error);
});

TradeType = ['I', 'O'];
easyFinBankService.search('1234567890', '019123109000000004', TradeType, "", 1, 10, 'D', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

TradeType = ['I', 'O'];
easyFinBankService.summary('1234567890', '019123109000000004', TradeType, "",
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

easyFinBankService.saveMemo('1234567890', '01912181100000000120191221000001', '메모저장-nodejs', "",
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

easyFinBankService.getFlatRatePopUpURL('1234567890',
  function(response){
    console.log(response);
  }, function (error){
    console.log(error);
});

easyFinBankService.getFlatRateState('1234567890', '0048', '131020538645', 'testkorea',
  function(response){
    console.log(response);
  }, function (error){
    console.log(error);
});

easyFinBankService.getChargeInfo('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function (error){
    console.log(error);
});
