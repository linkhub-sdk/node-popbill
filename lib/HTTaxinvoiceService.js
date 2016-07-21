var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = HTTaxinvoiceService;
Util.inherits(HTTaxinvoiceService,BaseService);

function HTTaxinvoiceService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('111');
};

HTTaxinvoiceService.prototype.getChargeInfo = function (CorpNum, UserID, success, error){
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/HomeTax/Taxinvoice/ChargeInfo',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

BaseService.addMethod(HTTaxinvoiceService.prototype, "requestJob", function(CorpNum, Type, DType, SDate, EDate, success, error){
  this.requestJob(CorpNum, Type, DType, SDate, EDate, "", success, error);
});

BaseService.addMethod(HTTaxinvoiceService.prototype, "requestJob", function(CorpNum, Type, DType, SDate, EDate, UserID, success, error){
  targetURI = '/HomeTax/Taxinvoice/' + Type;
  targetURI += '?DType=' + DType;
  targetURI += '&SDate=' + SDate;
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

BaseService.addMethod(HTTaxinvoiceService.prototype, "getJobState", function(CorpNum, JobID, success, error){
  this.getJobState(CorpNum, JobID, "", success, error);
});


BaseService.addMethod(HTTaxinvoiceService.prototype, "getJobState", function(CorpNum, JobID, UserID, success, error){
  if ( JobID.length !== 18 ) {
    this._throwError(-99999999, '작업아이디(jobID)가 올바르지 않습니다.', error);
    return;
  }

  this._executeAction({
    uri : '/HomeTax/Taxinvoice/' + JobID + '/State',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(HTTaxinvoiceService.prototype, "listActiveJob", function(CorpNum, success, error){
  this.listActiveJob(CorpNum, "", success, error);
});

BaseService.addMethod(HTTaxinvoiceService.prototype, "listActiveJob", function(CorpNum, UserID, success, error){
  this._executeAction({
    uri : '/HomeTax/Taxinvoice/JobList',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(HTTaxinvoiceService.prototype, "search", function(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, Page, PerPage, Order, success, error){
  this.search(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, Page, PerPage, Order, '', success, error);
});

BaseService.addMethod(HTTaxinvoiceService.prototype, "search", function(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, Page, PerPage, Order, UserID, success, error){
  if ( JobID.length !== 18 ){
    this._throwError(-99999999, '작업아이디(jobID)가 올바르지 않습니다.', error);
  }

  targetURI = '/HomeTax/Taxinvoice/'+JobID;
  targetURI += '?Type=' + Type.toString();
  targetURI += '&TaxType=' + TaxType.toString();
  targetURI += '&PurposeType=' + PurposeType.toString();
  targetURI += '&TaxRegIDType=' + TaxRegIDType;
  targetURI += '&TaxRegID=' + TaxRegID;

  if ( TaxRegIDYN !== '')
    targetURI += '&TaxRegIDYN=' + TaxRegIDYN;

  targetURI += '&Page=' + Page;
  targetURI += '&PerPage=' + PerPage;
  targetURI += '&Order=' + Order;

  console.log(targetURI);

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


BaseService.addMethod(HTTaxinvoiceService.prototype, "summary", function(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, success, error){
  this.summary(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, '', success, error);
});

BaseService.addMethod(HTTaxinvoiceService.prototype, "summary", function(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, UserID, success, error){
  if ( JobID.length !== 18 ){
    this._throwError(-99999999, '작업아이디(jobID)가 올바르지 않습니다.', error);
  }

  targetURI = '/HomeTax/Taxinvoice/'+JobID +'/Summary';
  targetURI += '?Type=' + Type.toString();
  targetURI += '&TaxType=' + TaxType.toString();
  targetURI += '&PurposeType=' + PurposeType.toString();
  targetURI += '&TaxRegIDType=' + TaxRegIDType;
  targetURI += '&TaxRegID=' + TaxRegID;

  if ( TaxRegIDYN !== '')
    targetURI += '&TaxRegIDYN=' + TaxRegIDYN;

  console.log(targetURI);

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

BaseService.addMethod(HTTaxinvoiceService.prototype, "getTaxinvoice", function(CorpNum, NTSConfirmNum, success, error){
  this.getTaxinvoice(CorpNum, NTSConfirmNum, '', success, error);
});

BaseService.addMethod(HTTaxinvoiceService.prototype, "getTaxinvoice", function(CorpNum, NTSConfirmNum, UserID, success, error){
  if ( NTSConfirmNum.length !== 24 ){
    this._throwError(-99999999, '국세청승인번호(NTSConfirmNum)가 올바르지 않습니다.', error);
  }

  this._executeAction({
    uri : '/HomeTax/Taxinvoice/' + NTSConfirmNum,
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(HTTaxinvoiceService.prototype, "getXML", function(CorpNum, NTSConfirmNum, success, error){
  this.getXML(CorpNum, NTSConfirmNum, '', success, error);
});

BaseService.addMethod(HTTaxinvoiceService.prototype, "getXML", function(CorpNum, NTSConfirmNum, UserID, success, error){
  if ( NTSConfirmNum.length !== 24 ){
    this._throwError(-99999999, '국세청승인번호(NTSConfirmNum)가 올바르지 않습니다.', error);
  }

  this._executeAction({
    uri : '/HomeTax/Taxinvoice/' + NTSConfirmNum + '?T=xml',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

HTTaxinvoiceService.prototype.getFlatRatePopUpURL = function (CorpNum, UserID, success, error){
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/HomeTax/Taxinvoice?TG=CHRG',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
};

HTTaxinvoiceService.prototype.getCertificatePopUpURL = function (CorpNum, UserID, success, error){
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/HomeTax/Taxinvoice?TG=CERT',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
};

BaseService.addMethod(HTTaxinvoiceService.prototype, "getFlatRateState", function(CorpNum, success, error){
  this.getFlatRateState(CorpNum, '', success, error);
});

BaseService.addMethod(HTTaxinvoiceService.prototype, "getFlatRateState", function(CorpNum, UserID, success, error){
  this._executeAction({
    uri : '/HomeTax/Taxinvoice/Contract',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});


BaseService.addMethod(HTTaxinvoiceService.prototype, "getCertificateExpireDate", function(CorpNum, success, error){
  this.getCertificateExpireDate(CorpNum, '', success, error);
});

BaseService.addMethod(HTTaxinvoiceService.prototype, "getCertificateExpireDate", function(CorpNum, UserID, success, error){
  this._executeAction({
    uri : '/HomeTax/Taxinvoice/CertInfo',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response.certificateExpiration);
    },
    error : error
  });
});
