var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = CashbillService;
Util.inherits(CashbillService,BaseService);

function CashbillService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('140');
};

BaseService.addMethod(CashbillService.prototype, "getChargeInfo", function(CorpNum, success, error){
  this.getChargeInfo(CorpNum,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "getChargeInfo", function(CorpNum, UserID, success, error) {
  this._executeAction({
    uri : '/Cashbill/ChargeInfo',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "getURL", function(CorpNum, TOGO, success, error){
  this.getURL(CorpNum, TOGO, '',success,error);
});

BaseService.addMethod(CashbillService.prototype, "getURL", function(CorpNum, TOGO, UserID, success, error){
  this._executeAction({
    uri : '/Cashbill?TG=' + TOGO,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
});

CashbillService.prototype.getUnitCost = function(CorpNum,success,error) {
  this._executeAction({
    uri : '/Cashbill?cfg=UNITCOST',
    CorpNum : CorpNum,
    success : function(response){
      if(success) success(response.unitCost);
    },
    error : error
  });
};

CashbillService.prototype.checkMgtKeyInUse = function (CorpNum, MgtKey, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri :'/Cashbill/'+MgtKey,
    CorpNum : CorpNum,
    success : function(response){
      if(success) {
        if(response.itemKey != null) {
          success(true);
        } else {
          success(false);
        }
      }
    },
    error : error
  });
};

BaseService.addMethod(CashbillService.prototype, "register", function(CorpNum, Cashbill, success, error){
  this.register(CorpNum,Cashbill,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "register", function(CorpNum, Cashbill, UserID, success, error){
  if(Object.keys(Cashbill).length === 0) {
    this._throwError(-99999999,'현금영수증 정보가 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(Cashbill);

  this._executeAction({
    uri : '/Cashbill',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'POST',
    Data : postData,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "update", function(CorpNum, MgtKey, Cashbill, success, error){
  this.update(CorpNum,MgtKey,Cashbill,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "update", function(CorpNum, MgtKey, Cashbill, UserID, success, error){
    if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }
  if(Object.keys(Cashbill).length === 0) {
    this._throwError(-99999999,'현금영수증 정보가 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(Cashbill);

  this._executeAction({
    uri : '/Cashbill/'+MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'PATCH',
    Data : postData,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "delete", function(CorpNum, MgtKey, success, error){
  this.delete(CorpNum,MgtKey,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "delete", function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri :'/Cashbill/'+MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'DELETE',
    success :function(response){
      if(success) success(response);
    },
    error : error
  });
});


BaseService.addMethod(CashbillService.prototype, "issue", function(CorpNum, MgtKey, success, error){
  this.issue(CorpNum, MgtKey, '', '', success, error);
});

BaseService.addMethod(CashbillService.prototype, "issue", function(CorpNum, MgtKey, Memo, success, error){
  this.issue(CorpNum, MgtKey, Memo, '', success, error);
});

BaseService.addMethod(CashbillService.prototype, "issue", function(CorpNum, MgtKey, Memo, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo
  };

  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Cashbill/' + MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Data : postData,
    Method : 'ISSUE',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "cancelIssue", function(CorpNum, MgtKey, success, error){
  this.cancelIssue(CorpNum,MgtKey,'','',success,error);
});

BaseService.addMethod(CashbillService.prototype, "cancelIssue", function(CorpNum, MgtKey, Memo, success, error){
  this.cancelIssue(CorpNum,MgtKey,Memo,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "cancelIssue", function(CorpNum, MgtKey, Memo, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Cashbill/' + MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Data : postData,
    Method : 'CANCELISSUE',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "sendEmail", function(CorpNum, MgtKey, Receiver, success, error){
  this.sendEmail(CorpNum,MgtKey,Receiver,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "sendEmail", function(CorpNum, MgtKey, Receiver, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  if(!Receiver || 0 === Receiver.length) {
    this._throwError(-99999999,'수신자 이메일이 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    receiver : Receiver
  };
  var postData = this._stringify(req);
  this._executeAction({
    uri : '/Cashbill/' + MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Data : postData,
    Method : 'EMAIL',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "sendSMS", function(CorpNum, MgtKey, Sender, Receiver, Contents, success, error){
  this.sendSMS(CorpNum,MgtKey,Sender,Receiver,Contents,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "sendSMS", function(CorpNum, MgtKey, Sender, Receiver, Contents, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  if(!Sender || 0 === Sender.length) {
    this._throwError(-99999999,'발신번호가 입력되지 않았습니다.',error);
    return;
  }

  if(!Receiver || 0 === Receiver.length) {
    this._throwError(-99999999,'수신번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    sender : Sender,
    receiver : Receiver,
    contents : Contents
  };

  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Cashbill/' + MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Data : postData,
    Method : 'SMS',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "sendFAX", function(CorpNum, MgtKey, Sender, Receiver, success, error){
  this.sendFAX(CorpNum,MgtKey,Sender,Receiver,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "sendFAX", function(CorpNum, MgtKey, Sender, Receiver, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  if(!Sender || 0 === Sender.length) {
    this._throwError(-99999999,'발신번호가 입력되지 않았습니다.',error);
    return;
  }

  if(!Receiver || 0 === Receiver.length) {
    this._throwError(-99999999,'수신번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    sender : Sender,
    receiver : Receiver
  };

  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Cashbill/' + MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Data : postData,
    Method : 'FAX',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "getDetailInfo", function(CorpNum, MgtKey, success, error){
  this.getDetailInfo(CorpNum, MgtKey, '', success, error);
});

BaseService.addMethod(CashbillService.prototype, "getDetailInfo", function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/' + MgtKey + '?Detail',
    CorpNum : CorpNum,
    UserID : UserID,
    Method :'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "getInfo", function(CorpNum, MgtKey, success, error){
  this.getInfo(CorpNum, MgtKey, '', success, error);
});

BaseService.addMethod(CashbillService.prototype, "getInfo", function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/'+MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "getInfos", function(CorpNum, MgtKeyList, success, error){
  this.getInfos(CorpNum, MgtKeyList, '', success, error);
});

BaseService.addMethod(CashbillService.prototype, "getInfos", function(CorpNum, MgtKeyList, UserID, success, error){
  if(!MgtKeyList || 0 === MgtKeyList.length) {
    this._throwError(-99999999,'문서관리번호 배열이 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(MgtKeyList);

  this._executeAction({
    uri : '/Cashbill/States',
    CorpNum : CorpNum,
    UserID : UserID,
    Data : postData,
    Method : 'POST',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "getLogs", function(CorpNum, MgtKey, success, error){
  this.getLogs(CorpNum, MgtKey, '', success, error);
});

BaseService.addMethod(CashbillService.prototype, "getLogs", function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/' + MgtKey + '/Logs',
    CorpNum : CorpNum,
    UserID : UserID,
    Method :'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "getPrintURL", function(CorpNum, MgtKey, success, error){
  this.getPrintURL(CorpNum, MgtKey, '', success, error);
});

BaseService.addMethod(CashbillService.prototype, "getPrintURL", function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/' + MgtKey + '?TG=PRINT',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "getEPrintURL", function(CorpNum, MgtKey, success, error){
  this.getEPrintURL(CorpNum, MgtKey, '', success, error);
});

BaseService.addMethod(CashbillService.prototype, "getEPrintURL", function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/' + MgtKey + '?TG=EPRINT',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "getMassPrintURL", function(CorpNum, MgtKeyList, success, error){
  this.getMassPrintURL(CorpNum, MgtKeyList, '', success, error);
});

BaseService.addMethod(CashbillService.prototype, "getMassPrintURL", function(CorpNum, MgtKeyList, UserID, success, error){
  if(!MgtKeyList || 0 === MgtKeyList.length) {
    this._throwError(-99999999,'문서관리번호 배열이 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(MgtKeyList);
  this._executeAction({
    uri : '/Cashbill/Prints',
    CorpNum : CorpNum,
    UserID : UserID,
    Data : postData,
    Method : 'POST',
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "getMailURL", function(CorpNum, MgtKey, success, error){
  this.getMailURL(CorpNum, MgtKey, '', success, error);
});

BaseService.addMethod(CashbillService.prototype, "getMailURL", function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/' + MgtKey + '?TG=MAIL',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "getPopUpURL", function(CorpNum, MgtKey, success, error){
  this.getPopUpURL(CorpNum, MgtKey, '', success, error);
});

BaseService.addMethod(CashbillService.prototype, "getPopUpURL", function(CorpNum, MgtKey, UserID, success, error){
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Cashbill/' + MgtKey + '?TG=POPUP',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
});


BaseService.addMethod(CashbillService.prototype, "registIssue", function(CorpNum, Cashbill, success, error){
  this.registIssue(CorpNum,Cashbill,'','',success,error);
});

BaseService.addMethod(CashbillService.prototype, "registIssue", function(CorpNum, Cashbill, Memo, success, error){
  this.registIssue(CorpNum,Cashbill,Memo,'',success,error);
});

BaseService.addMethod(CashbillService.prototype, "registIssue", function(CorpNum, Cashbill, Memo, UserID, success, error){
  if(Object.keys(Cashbill).length === 0) {
    this._throwError(-99999999,'현금영수증 정보가 입력되지 않았습니다.',error);
    return;
  }

  Cashbill.memo = Memo;

  var postData = this._stringify(Cashbill);

  this._executeAction({
    uri : '/Cashbill',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'ISSUE',
    Data : postData,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(CashbillService.prototype, "search", function(CorpNum, DType, SDate, EDate, State, TradeType, TradeUsage, TaxationType, Order, Page, PerPage, success, error){
    return this.search (CorpNum, DType, SDate, EDate, State, TradeType, TradeUsage, TaxationType, "", Order, Page, PerPage, success, error);
});

BaseService.addMethod(CashbillService.prototype, "search", function(CorpNum, DType, SDate, EDate, State, TradeType, TradeUsage, TaxationType, QString, Order, Page, PerPage, success, error){
  if(!DType || 0 === DType.length) {
    this._throwError(-99999999,'검색일자 유형이 입력되지 않았습니다.',error);
    return;
  }

  if(!SDate || 0 === SDate.length) {
    this._throwError(-99999999,'시작일자가 입력되지 않았습니다.',error);
    return;
  }

  if(!EDate || 0 === EDate.length) {
    this._throwError(-99999999,'시작일자가 입력되지 않았습니다.',error);
    return;
  }

  targetURI = '/Cashbill/Search?DType=' + DType;
  targetURI += '&SDate=' + SDate;
  targetURI += '&EDate=' + EDate;
  targetURI += '&State=' + State.toString();
  targetURI += '&TradeType=' + TradeType.toString();
  targetURI += '&TradeUsage=' + TradeUsage.toString();
  targetURI += '&TaxationType=' + TaxationType.toString();
  targetURI += '&Order=' + Order;
  targetURI += '&Page=' + Page;
  targetURI += '&PerPage=' + PerPage;

  if ( QString !== "" ){
    targetURI += '&QString=' + encodeURIComponent(QString);
  }

  this._executeAction({
    uri : targetURI,
    CorpNum : CorpNum,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});
