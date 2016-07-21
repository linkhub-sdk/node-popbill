var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var htTaxinvoiceService = popbill.HTTaxinvoiceService();

htTaxinvoiceService.getChargeInfo('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
  });

KeyType = popbill.MgtKeyType.SELL;

htTaxinvoiceService.requestJob('1234567890', KeyType, 'W', '20160601', '20160831',
  function(response){
    console.log(response);
  }, function (error){
    console.log(error);
});

jobID = "016072111000000004";

htTaxinvoiceService.getJobState('1234567890', jobID,
  function(response){
    console.log(response);
  }, function (error){
    console.log(error);
});

htTaxinvoiceService.listActiveJob('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});
BaseService.addMethod(HTTaxinvoiceService.prototype, "search", function(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, Page, PerPage, Order, UserID, success, error){

Type = ['N', 'M'];
TaxType = ['T','N','Z'];
PurposeType = ['R', 'C', 'N'];
TaxRegIDType = 'S';
TaxRegIDYN = '0';
TaxRegID = '';

htTaxinvoiceService.search('1234567890', '016072111000000004', Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, 1, 10, 'D', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

htTaxinvoiceService.summary('1234567890', '016072111000000004', Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

ntsconfirmNum = '20160720410000290000009b';

htTaxinvoiceService.getTaxinvoice('1234567890', ntsconfirmNum, 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

htTaxinvoiceService.getXML('1234567890', ntsconfirmNum, 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

htTaxinvoiceService.getFlatRatePopUpURL('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

htTaxinvoiceService.getCertificatePopUpURL('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

htTaxinvoiceService.getFlatRateState('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});

htTaxinvoiceService.getCertificateExpireDate('1234567890', 'testkorea',
  function(response){
    console.log(response);
  }, function(error){
    console.log(error);
});
