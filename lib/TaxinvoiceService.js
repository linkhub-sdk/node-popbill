var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = TaxinvoiceService;
Util.inherits(TaxinvoiceService,BaseService);

function TaxinvoiceService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('110');
};

TaxinvoiceService.prototype.getUnitCost = function(CorpNum,success,error) {
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/Taxinvoice?cfg=UNITCOST',
    CorpNum : CorpNum,
    success : function(response){
      if(success) success(response.unitCost);
    },
    error : error
  });
};

TaxinvoiceService.prototype.getCertificateExpireDate = function(CorpNum, success, error){
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/Taxinvoice?cfg=CERT', 
    CorpNum : CorpNum,
    success : function(response){
      if(success) {
        var str = response.certificateExpiration;
        var y = str.substr(0,4),
            m = str.substr(4,2),
            d = str.substr(6,2),
            h = str.substr(8,2),
            M = str.substr(10,2),
            s = str.substr(12,2);
        
        var dateFormat = new Date(y,m-1,d,h,M,s);
        var expireDate = dateFormat.toLocaleString();

        success(expireDate);
      }
    },
    error : error
  });
};

TaxinvoiceService.prototype.checkMgtKeyInUse = function(CorpNum, KeyType, MgtKey, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri :'/Taxinvoice/'+KeyType+'/'+MgtKey,
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

BaseService.addMethod(TaxinvoiceService.prototype, 'register', function(CorpNum, Taxinvoice, success, error){
  this.register(CorpNum,Taxinvoice,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, 'register', function(CorpNum, Taxinvoice, UserID, success, error){
  this.register(CorpNum,Taxinvoice,UserID,false,success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, 'register', function(CorpNum, Taxinvoice, UserID, writeSpecification, success, error){
  if(Object.keys(Taxinvoice).length === 0) {
    this._throwError(-99999999,'세금계산서 정보가 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(Taxinvoice);
 
  if(writeSpecification) postData = '{\"writeSpecification\":true,'+ postData.substring(1);
  
  this._executeAction({
    uri : '/Taxinvoice',
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

BaseService.addMethod(TaxinvoiceService.prototype, 'update', function(CorpNum, KeyType, MgtKey, Taxinvoice, success, error){
  this.update(CorpNum,KeyType,MgtKey,Taxinvoice,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, 'update', function(CorpNum, KeyType, MgtKey, Taxinvoice, UserID, success, error){
  if(Object.keys(Taxinvoice).length === 0) {
    this._throwError(-99999999,'세금계산서 정보가 입력되지 않았습니다.',error);
    return;
  }
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(Taxinvoice);
 
  this._executeAction({
    uri : '/Taxinvoice/'+KeyType+'/'+MgtKey,
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

BaseService.addMethod(TaxinvoiceService.prototype, 'delete', function(CorpNum, KeyType, MgtKey, success, error){
  this.delete(CorpNum,KeyType,MgtKey,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, 'delete', function(CorpNum, KeyType, MgtKey, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri :'/Taxinvoice/' +KeyType +'/' + MgtKey,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'DELETE',
    success :function(response){
      if(success) success(response);
    },
    error : error
  });
});

TaxinvoiceService.prototype.getInfo = function(CorpNum, KeyType, MgtKey, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/Taxinvoice/'+KeyType+'/'+MgtKey,
    CorpNum : CorpNum,
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
};

TaxinvoiceService.prototype.getInfos = function(CorpNum, KeyType, MgtKeyList, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKeyList || 0 === MgtKeyList.length) {
    this._throwError(-99999999,'문서관리번호배열이 입력되지 않았습니다.',error);
    return;
  }
  var postData = this._stringify(MgtKeyList);

  this._executeAction({
    uri : '/Taxinvoice/'+KeyType, 
    CorpNum : CorpNum, 
    UserID : UserID,
    Data : postData,
    Method : 'POST',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

TaxinvoiceService.prototype.getDetailInfo = function(CorpNum, KeyType, MgtKey, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Taxinvoice/' + KeyType + '/' +MgtKey + '?Detail',
    CorpNum : CorpNum,
    UserID : UserID,
    Method :'GET',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
}; 

TaxinvoiceService.prototype.getLogs = function(CorpNum, KeyType, MgtKey, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/Taxinvoice/' + KeyType + '/' +MgtKey + '/Logs',
    CorpNum : CorpNum,
    UserID : UserID,
    Method :'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

BaseService.addMethod(TaxinvoiceService.prototype, "attachFile", function(CorpNum, KeyType, MgtKey, DisplayName, FilePaths, success, error){
  this.attachFile(CorpNum,KeyType,MgtKey,DisplayName,FilePaths,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "attachFile", function(CorpNum, KeyType, MgtKey, DisplayName, FilePaths, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }
  var req = {
    DisplayName : DisplayName
  };
  var postData = this._stringify(req);

  var files = [];
  for(var i in FilePaths){
    files.push({
      fileName : FilePaths[i],
      fieldName : "Filedata"
    });
  }

  this._executeAction({
    uri : '/Taxinvoice/' + KeyType + '/' + MgtKey + '/Files',
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'POST',
    Data : postData,
    Files : files, 
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

TaxinvoiceService.prototype.getFiles = function(CorpNum, KeyType, MgtKey, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'문서관리번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/Taxinvoice/' + KeyType + '/' + MgtKey + '/Files',
    CorpNum : CorpNum,
    Method : 'GET',
    success :function(response){
      if(success) success(response);
    },
    error : error
  });
};

BaseService.addMethod(TaxinvoiceService.prototype, "deleteFile", function(CorpNum, KeyType, MgtKey, FileID, success, error){
  this.deleteFile(CorpNum,KeyType,MgtKey,FileID,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "deleteFile", function(CorpNum, KeyType, MgtKey, FileID, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }
  if(!FileID || 0 === FileID.length) {
    this._throwError(-99999999,'파일아이디가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/Taxinvoice/' + KeyType + '/' + MgtKey +'/Files/' +FileID,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'DELETE', 
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(TaxinvoiceService.prototype, "send", function(CorpNum, KeyType, MgtKey, Memo, success, error){
  this.send(CorpNum,KeyType,MgtKey,Memo,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "send", function(CorpNum, KeyType, MgtKey, Memo, UserID, success, error){
  this.send(CorpNum,KeyType,MgtKey,Memo,'',UserID,success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "send", function(CorpNum, KeyType, MgtKey, Memo, EmailSubject, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }
  
  var req = {
    memo : Memo,
    emailSubject : EmailSubject
  };

  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Data : postData,
    Method : 'SEND',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

BaseService.addMethod(TaxinvoiceService.prototype, "cancelSend", function(CorpNum, KeyType, MgtKey, Memo, success, error){
  this.cancelSend(CorpNum,KeyType,MgtKey,Memo,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "cancelSend", function(CorpNum, KeyType, MgtKey, Memo, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo
  };
  var postData = this._stringify(req);
  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'CANCELSEND',
    Data : postData, 
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

BaseService.addMethod(TaxinvoiceService.prototype, "accept", function(CorpNum, KeyType, MgtKey, Memo, success, error){
  this.accept(CorpNum,KeyType,MgtKey,Memo,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "accept", function(CorpNum, KeyType, MgtKey, Memo, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Data : postData,
    Method : 'ACCEPT',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

BaseService.addMethod(TaxinvoiceService.prototype, "deny", function(CorpNum, KeyType, MgtKey, Memo, success, error){
  this.deny(CorpNum,KeyType,MgtKey,Memo,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "deny", function(CorpNum, KeyType, MgtKey, Memo, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'DENY',
    Data : postData, 
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

BaseService.addMethod(TaxinvoiceService.prototype, "issue", function(CorpNum, KeyType, MgtKey, Memo, UserID, success, error){
  this.issue(CorpNum,KeyType,MgtKey,Memo,false,UserID,success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "issue", function(CorpNum, KeyType, MgtKey, Memo, ForceIssue, UserID, success, error){
  this.issue(CorpNum,KeyType,MgtKey,Memo,'',ForceIssue,UserID,success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "issue", function(CorpNum, KeyType, MgtKey, Memo, EmailSubject, ForceIssue, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo,
    emailSubject : EmailSubject,
    forceIssue : ForceIssue
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
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

BaseService.addMethod(TaxinvoiceService.prototype, "cancelIssue", function(CorpNum, KeyType, MgtKey, Memo, success, error){
  this.cancelIssue(CorpNum,KeyType,MgtKey,Memo,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "cancelIssue", function(CorpNum, KeyType, MgtKey, Memo, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
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

BaseService.addMethod(TaxinvoiceService.prototype, "request", function(CorpNum, KeyType, MgtKey, Memo, success, error){
  this.request(CorpNum,KeyType,MgtKey,Memo,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "request", function(CorpNum, KeyType, MgtKey, Memo, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Data : postData,
    Method : 'REQUEST',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

BaseService.addMethod(TaxinvoiceService.prototype, "cancelRequest", function(CorpNum, KeyType, MgtKey, Memo, success, error){
  this.cancelRequest(CorpNum,KeyType,MgtKey,Memo,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "cancelRequest", function(CorpNum, KeyType, MgtKey, Memo, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Data : postData,
    Method : 'CANCELREQUEST',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

BaseService.addMethod(TaxinvoiceService.prototype, "refuse", function(CorpNum, KeyType, MgtKey, Memo, success, error){
  this.refuse(CorpNum,KeyType,MgtKey,Memo,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "refuse", function(CorpNum, KeyType, MgtKey, Memo, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    memo : Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Data : postData,
    Method : 'REFUSE',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

BaseService.addMethod(TaxinvoiceService.prototype, "sendToNTS", function(CorpNum, KeyType, MgtKey, success, error){
  this.sendToNTS(CorpNum,KeyType,MgtKey,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "sendToNTS", function(CorpNum, KeyType, MgtKey, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'NTS',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
});

BaseService.addMethod(TaxinvoiceService.prototype, "sendEmail", function(CorpNum, KeyType, MgtKey, Receiver, success, error){
  this.sendEmail(CorpNum,KeyType,MgtKey,Receiver,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "sendEmail", function(CorpNum, KeyType, MgtKey, Receiver, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    receiver : Receiver
  };
  var postData = this._stringify(req);
  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
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

BaseService.addMethod(TaxinvoiceService.prototype, "sendSMS", function(CorpNum, KeyType, MgtKey, Sender, Receiver, Contents, success, error){
  this.sendSMS(CorpNum,KeyType,MgtKey,Sender,Receiver,Contents,'',success,error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "sendSMS", function(CorpNum, KeyType, MgtKey, Sender, Receiver, Contents, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    sender : Sender,
    receiver : Receiver,
    contents : Contents
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
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

BaseService.addMethod(TaxinvoiceService.prototype, "sendFAX", function(CorpNum, KeyType, MgtKey, Sender, Receiver, success, error){
  this.sendFAX(CorpNum,KeyType,MgtKey,Sender,Receiver,'',success,error);
});


BaseService.addMethod(TaxinvoiceService.prototype, "sendFAX", function(CorpNum, KeyType, MgtKey, Sender, Receiver, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  var req = {
    sender : Sender,
    receiver : Receiver
  };
  var postData = this._stringify(req);
  
  this._executeAction({
    uri : '/Taxinvoice/' +KeyType + '/' + MgtKey,
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


TaxinvoiceService.prototype.getURL = function(CorpNum, TOGO, UserID, success, error){
  this._executeAction({
    uri : '/Taxinvoice?TG=' + TOGO,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
};


TaxinvoiceService.prototype.getPopUpURL = function(CorpNum, KeyType, MgtKey, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/Taxinvoice/' + KeyType + '/' + MgtKey + '?TG=POPUP',
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
};


TaxinvoiceService.prototype.getPrintURL = function(CorpNum, KeyType, MgtKey, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Taxinvoice/' + KeyType + '/' + MgtKey + '?TG=PRINT',
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
};



TaxinvoiceService.prototype.getMassPrintURL = function(CorpNum, KeyType, MgtKeyList, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKeyList || 0 === MgtKeyList.length) {
    this._throwError(-99999999,'관리번호배열이 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(MgtKeyList);
  this._executeAction({
    uri : '/Taxinvoice/' + KeyType + '?Print',
    CorpNum : CorpNum, 
    UserID : UserID, 
    Data : postData,
    Method : 'POST',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
};


TaxinvoiceService.prototype.getEPrintURL = function(CorpNum, KeyType, MgtKey, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Taxinvoice/' + KeyType + '/' + MgtKey + '?TG=EPRINT',
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
};

TaxinvoiceService.prototype.getMailURL = function(CorpNum, KeyType, MgtKey, UserID, success, error){
  if(!KeyType || 0 === KeyType.length) {
    this._throwError(-99999999,'관리번호형태가 입력되지 않았습니다.',error);
    return;
  }
  if(!MgtKey || 0 === MgtKey.length) {
    this._throwError(-99999999,'관리번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/Taxinvoice/' + KeyType + '/' + MgtKey + '?TG=MAIL',
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
};

TaxinvoiceService.prototype.getEmailPublicKeys = function(CorpNum, UserID, success, error){
  this._executeAction({
    uri : '/Taxinvoice/EmailPublicKeys',
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
};

