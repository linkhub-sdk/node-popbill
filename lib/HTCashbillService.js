var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = HTCashbillService;
Util.inherits(HTCashbillService,BaseService);

function HTCashbillService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('141');
};

BaseService.addMethod (HTCashbillService.prototype, "getChargeInfo", function(CorpNum, success, error){
  this.getChargeInfo(CorpNum, '', success, error);
});

BaseService.addMethod(HTCashbillService.prototype, "getChargeInfo", function (CorpNum, UserID, success, error){
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/HomeTax/Cashbill/ChargeInfo',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod (HTCashbillService.prototype, "requestJob", function(CorpNum, Type, SDate, EDate, success, error){
  this.requestJob(CorpNum, Type, SDate, EDate, "", success, error);
});

BaseService.addMethod (HTCashbillService.prototype, "requestJob", function(CorpNum, Type, SDate, EDate, UserID, success, error){
  targetURI = '/HomeTax/Cashbill/' + Type;
  targetURI += '?SDate=' + SDate;
  targetURI += '&EDate=' + EDate;

  this._executeAction({
    uri : targetURI,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'POST',
    success : function(response){
      if(success) success(response.jobID);
    },
    error : error
  });
});

BaseService.addMethod(HTCashbillService.prototype, "getJobState", function(CorpNum, JobID, success, error){
  this.getJobState(CorpNum, JobID, "", success, error);
});

BaseService.addMethod(HTCashbillService.prototype, "getJobState", function(CorpNum, JobID, UserID, success, error){
  if ( JobID.length !== 18 ) {
    this._throwError(-99999999, '작업아이디(jobID)가 올바르지 않습니다.', error);
    return;
  }

  this._executeAction({
    uri : '/HomeTax/Cashbill/' + JobID + '/State',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(HTCashbillService.prototype, "listActiveJob", function(CorpNum, success, error){
  this.listActiveJob(CorpNum, "", success, error);
});

BaseService.addMethod(HTCashbillService.prototype, "listActiveJob", function(CorpNum, UserID, success, error){
  this._executeAction({
    uri : '/HomeTax/Cashbill/JobList',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(HTCashbillService.prototype, "search", function(CorpNum, JobID, TradeType, TradeUsage, Page, PerPage, Order, success, error){
  this.search(CorpNum, JobID, TradeType, TradeUsage, Page, PerPage, Order, '', success, error);
});

BaseService.addMethod(HTCashbillService.prototype, "search", function(CorpNum, JobID, TradeType, TradeUsage, Page, PerPage, Order, UserID, success, error){
  if ( JobID.length !== 18 ){
    this._throwError(-99999999, '작업아이디(jobID)가 올바르지 않습니다.', error);
  }

  targetURI = '/HomeTax/Cashbill/' + JobID;
  targetURI += '?TradeType=' + TradeType.toString();
  targetURI += '&TradeUsage=' + TradeUsage.toString();
  targetURI += '&Page=' + Page;
  targetURI += '&PerPage=' + PerPage;
  targetURI += '&Order=' + Order;

  this._executeAction({
    uri : targetURI,
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(HTCashbillService.prototype, "summary", function(CorpNum, JobID, TradeType, TradeUsage, success, error){
  this.summary(CorpNum, JobID, TradeType, TradeUsage, '', success, error);
});

BaseService.addMethod(HTCashbillService.prototype, "summary", function(CorpNum, JobID, TradeType, TradeUsage, UserID, success, error){
  if ( JobID.length !== 18 ){
    this._throwError(-99999999, '작업아이디(jobID)가 올바르지 않습니다.', error);
  }

  targetURI = '/HomeTax/Cashbill/' + JobID + '/Summary';
  targetURI += '?TradeType=' + TradeType.toString();
  targetURI += '&TradeUsage=' + TradeUsage.toString();

  this._executeAction({
    uri : targetURI,
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(HTCashbillService.prototype, "getFlatRatePopUpURL", function(CorpNum, success, error){
  this.getFlatRatePopUpURL(CorpNum, '', success, error);
});

BaseService.addMethod(HTCashbillService.prototype, "getFlatRatePopUpURL", function (CorpNum, UserID, success, error){
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/HomeTax/Cashbill?TG=CHRG',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
});

BaseService.addMethod(HTCashbillService.prototype, "getCertificatePopUpURL", function(CorpNum, success, error){
  this.getCertificatePopUpURL(CorpNum, '', success, error);
});

BaseService.addMethod(HTCashbillService.prototype, "getCertificatePopUpURL", function (CorpNum, UserID, success, error){
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/HomeTax/Cashbill?TG=CERT',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
});

BaseService.addMethod(HTCashbillService.prototype, "getFlatRateState", function(CorpNum, success, error){
  this.getFlatRateState(CorpNum, '', success, error);
});

BaseService.addMethod(HTCashbillService.prototype, "getFlatRateState", function(CorpNum, UserID, success, error){
  this._executeAction({
    uri : '/HomeTax/Cashbill/Contract',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});


BaseService.addMethod(HTCashbillService.prototype, "getCertificateExpireDate", function(CorpNum, success, error){
  this.getCertificateExpireDate(CorpNum, '', success, error);
});

BaseService.addMethod(HTCashbillService.prototype, "getCertificateExpireDate", function(CorpNum, UserID, success, error){
  this._executeAction({
    uri : '/HomeTax/Cashbill/CertInfo',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response.certificateExpiration);
    },
    error : error
  });
});
