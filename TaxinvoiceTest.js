var popbill = require('./');

popbill.config({
  LinkID :'TESTER',
  SecretKey : 'SwWxqU+0TErBXy/9TVjIPEnI0VTUMMSQZtJf3Ed8q3I=',
  IsTest : true,
  defaultErrorHandler :  function(Error) {
    console.log('Error Occur : [' + Error.code + '] ' + Error.message);
  }
});

var taxinvoiceService = popbill.TaxinvoiceService();

taxinvoiceService.getBalance('1231212312',
  function(Point){
    console.log(Point)
  }
);

taxinvoiceService.getPartnerBalance('1231212312',
  function(Point){
    console.log(Point)
  }
);

taxinvoiceService.getUnitCost('1231212312',
  function(UnitCost){
    console.log('UnitCost is : '  +  UnitCost);
});

taxinvoiceService.getPopbillURL('1231212312','userid','CERT',
  function(url){
    console.log('url is : '  +  url);
});


taxinvoiceService.checkIsMember('1231212312',
  function(url){
    console.log('checkIsMember is : '  +  url.code);
});


var joinInfo =  {
  LinkID : 'TESTER',
  CorpNum : '1231212312',
  CEOName : '대표자성명',
  CorpName : '테스트상호',
  Addr : '주소',
  ZipCode : '우편번호',
  BizType : '업태',
  BizClass : '업종',
  ContactName : '담당자 성명',
  ContactEmail : 'test@test.com',
  ContactTEL : '070-7510-6766',
  ID : 'userid',
  PWD : 'this_is_password'
};

taxinvoiceService.joinMember(joinInfo,
  function(result){
    console.log(result);
  });