var Util = require('util');
var BaseService = require('./BaseService');

module.exports = TaxinvoiceService;
Util.inherits(TaxinvoiceService, BaseService);

function TaxinvoiceService(configs) {
    BaseService.call(this, configs);
    this._scopes.push('110');
}

TaxinvoiceService.prototype.getChargeInfo = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }


    this._executeAction({
        uri: '/Taxinvoice/ChargeInfo',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'getChargeInfo', function (CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', success, error);
});

TaxinvoiceService.prototype.getUnitCost = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Taxinvoice?cfg=UNITCOST',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.unitCost);
        },
        error: error
    });
};

BaseService.addMethod(TaxinvoiceService.prototype, "getUnitCost", function (CorpNum, success, error) {
    this.getUnitCost(CorpNum, '', success, error);
});

TaxinvoiceService.prototype.getCertificateExpireDate = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Taxinvoice?cfg=CERT',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) {
                var str = response.certificateExpiration;
                var y = str.substr(0, 4);
                var m = str.substr(4, 2);
                var d = str.substr(6, 2);
                var h = str.substr(8, 2);
                var M = str.substr(10, 2);
                var s = str.substr(12, 2);

                var dateFormat = new Date(y, m - 1, d, h, M, s);
                var expireDate = dateFormat.toLocaleString();

                success(expireDate);
            }
        },
        error: error
    });
};

BaseService.addMethod(TaxinvoiceService.prototype, 'getCertificateExpireDate', function(CorpNum, success, error) {
    this.getCertificateExpireDate(CorpNum, '', success, error);
});

TaxinvoiceService.prototype.registTaxCert = function (CorpNum, certPublicKey, certPrivateKey, certCipher, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(certPublicKey)) {
        this._throwError('공동인증서 공개키가 입력되지 않았습니다', error)
        return
    }
    if (this._isNullOrEmpty(certPrivateKey)) {
        this._throwError('공동인증서 비밀키가 입력되지 않았습니다', error)
        return
    }
    if (this._isNullOrEmpty(certCipher)) {
        this._throwError('공동인증서 비밀번호가 입력되지 않았습니다', error)
        return
    }

    var req = {
        certPublicKey: this._encryptor.encryptByte(this._encryptPublicKeyInfo, Buffer.from(certPublicKey, 'base64')),
        certPrivateKey: this._encryptor.encryptByte(this._encryptPublicKeyInfo, Buffer.from(certPrivateKey, 'base64')),
        certCipher: this._encryptor.encrypt(this._encryptPublicKeyInfo, certCipher),
    };

    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Taxinvoice/Certificate',
        CorpNum: CorpNum,
        Method: 'POST',
        Data: postData,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'registTaxCert', function (CorpNum, certPublicKey, certPrivateKey, certCipher, success, error) {
    this.registTaxCert(CorpNum, certPublicKey, certPrivateKey, certCipher, '', success, error);
});

TaxinvoiceService.prototype.getTaxCertInfo = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Taxinvoice/Certificate',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'getTaxCertInfo', function (CorpNum, success, error) {
    this.getTaxCertInfo(CorpNum, '', success, error);
});

TaxinvoiceService.prototype.checkMgtKeyInUse = function (CorpNum, KeyType, MgtKey, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var _this = this

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
        CorpNum: CorpNum,
        success: function (response) {
            if (success) {
                if (!_this._isNullOrEmpty(response.itemKey)) {
                    success(true);
                } else {
                    success(false);
                }
            }
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'checkMgtKeyInUse', function(CorpNum, KeyType, MgtKey, success, error) {
    this.checkMgtKeyInUse(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.register = function (CorpNum, Taxinvoice, UserID, writeSpecification, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(Taxinvoice)) {
        this._throwError('세금계산서 정보가 입력되지 않았습니다.', error);
        return;
    }

    var postData = this._stringify(Taxinvoice);

    if (writeSpecification) postData = '{\"writeSpecification\":true,' + postData.substring(1);

    this._executeAction({
        uri: '/Taxinvoice',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'register', function (CorpNum, Taxinvoice, success, error) {
    this.register(CorpNum, Taxinvoice, '', false, success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, 'register', function (CorpNum, Taxinvoice, UserID, success, error) {
    this.register(CorpNum, Taxinvoice, UserID, false, success, error);
});

TaxinvoiceService.prototype.update = function (CorpNum, KeyType, MgtKey, Taxinvoice, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(Taxinvoice)) {
        this._throwError('세금계산서 정보가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var postData = this._stringify(Taxinvoice);

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'PATCH',
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'update', function (CorpNum, KeyType, MgtKey, Taxinvoice, success, error) {
    this.update(CorpNum, KeyType, MgtKey, Taxinvoice, '', success, error);
});

TaxinvoiceService.prototype.delete = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'DELETE',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'delete', function (CorpNum, KeyType, MgtKey, success, error) {
    this.delete(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.getInfo = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}


BaseService.addMethod(TaxinvoiceService.prototype, 'getInfo', function (CorpNum, KeyType, MgtKey, success, error) {
    this.getInfo(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.getInfos = function (CorpNum, KeyType, MgtKeyList, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호형태 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKeyList)) {
        this._throwError('문서번호배열이 입력되지 않았습니다.', error);
        return;
    }
    var postData = this._stringify(MgtKeyList);

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType,
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}


BaseService.addMethod(TaxinvoiceService.prototype, 'getInfos', function (CorpNum, KeyType, MgtKeyList, success, error) {
    this.getInfos(CorpNum, KeyType, MgtKeyList, '', success, error);
});

TaxinvoiceService.prototype.getDetailInfo = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }

  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '?Detail',
    CorpNum: CorpNum,
    UserID: UserID,
    Method: 'GET',
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'getDetailInfo', function (CorpNum, KeyType, MgtKey, success, error) {
    this.getDetailInfo(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.getXML = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }
  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '?XML',
    CorpNum: CorpNum,
    UserID: UserID,
    Method: 'GET',
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}


BaseService.addMethod(TaxinvoiceService.prototype, 'getXML', function (CorpNum, KeyType, MgtKey, success, error) {
    this.getXML(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.getLogs = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }
  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '/Logs',
    CorpNum: CorpNum,
    UserID: UserID,
    Method: 'GET',
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'getLogs', function (CorpNum, KeyType, MgtKey, success, error) {
    this.getLogs(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.attachFile = function (CorpNum, KeyType, MgtKey, DisplayName, FilePaths, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }

  if (Array.isArray(FilePaths) && FilePaths.length !== 1){
      this._throwError('첨부파일의 갯수는 1개만 가능합니다.', error);
      return;
  }


  var req = {
    DisplayName: DisplayName
  };
  var postData = this._stringify(req);

  var files = [];
  for (var i in FilePaths) {
    files.push({
      fileName: FilePaths[i],
      fieldName: "Filedata"
    });
  }

  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '/Files',
    CorpNum: CorpNum,
    UserID: UserID,
    Method: 'POST',
    Data: postData,
    Files: files,
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, "attachFile", function (CorpNum, KeyType, MgtKey, DisplayName, FilePaths, success, error) {
  this.attachFile(CorpNum, KeyType, MgtKey, DisplayName, FilePaths, '', success, error);
});

TaxinvoiceService.prototype.getFiles = function (CorpNum, KeyType, MgtKey, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }
  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '/Files',
    CorpNum: CorpNum,
    Method: 'GET',
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'getFiles', function(CorpNum, KeyType, MgtKey, success, error) {
    this.getFiles(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.deleteFile = function (CorpNum, KeyType, MgtKey, FileID, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(FileID)) {
    this._throwError('파일아이디가 입력되지 않았습니다.', error);
    return;
  }
  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '/Files/' + FileID,
    CorpNum: CorpNum,
    UserID: UserID,
    Method: 'DELETE',
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, "deleteFile", function (CorpNum, KeyType, MgtKey, FileID, success, error) {
    this.deleteFile(CorpNum, KeyType, MgtKey, FileID, '', success, error);
});

TaxinvoiceService.prototype.send = function (CorpNum, KeyType, MgtKey, Memo, EmailSubject, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }

  var req = {
    memo: Memo,
    emailSubject: EmailSubject
  };

  var postData = this._stringify(req);

  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
    CorpNum: CorpNum,
    UserID: UserID,
    Data: postData,
    Method: 'SEND',
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, "send", function (CorpNum, KeyType, MgtKey, Memo, success, error) {
    this.send(CorpNum, KeyType, MgtKey, Memo, '', success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "send", function (CorpNum, KeyType, MgtKey, Memo, UserID, success, error) {
    this.send(CorpNum, KeyType, MgtKey, Memo, '', UserID, success, error);
});

TaxinvoiceService.prototype.cancelSend = function (CorpNum, KeyType, MgtKey, Memo, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }

  var req = {
    memo: Memo
  };
  var postData = this._stringify(req);
  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
    CorpNum: CorpNum,
    UserID: UserID,
    Method: 'CANCELSEND',
    Data: postData,
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, "cancelSend", function (CorpNum, KeyType, MgtKey, Memo, success, error) {
    this.cancelSend(CorpNum, KeyType, MgtKey, Memo, '', success, error);
});

TaxinvoiceService.prototype.accept = function (CorpNum, KeyType, MgtKey, Memo, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }

  var req = {
    memo: Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
    CorpNum: CorpNum,
    UserID: UserID,
    Data: postData,
    Method: 'ACCEPT',
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, "accept", function (CorpNum, KeyType, MgtKey, Memo, success, error) {
    this.accept(CorpNum, KeyType, MgtKey, Memo, '', success, error);
});

TaxinvoiceService.prototype.deny = function (CorpNum, KeyType, MgtKey, Memo, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }

  var req = {
    memo: Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
    CorpNum: CorpNum,
    UserID: UserID,
    Method: 'DENY',
    Data: postData,
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, "deny", function (CorpNum, KeyType, MgtKey, Memo, success, error) {
    this.deny(CorpNum, KeyType, MgtKey, Memo, '', success, error);
});

TaxinvoiceService.prototype.issue = function (CorpNum, KeyType, MgtKey, Memo, EmailSubject, ForceIssue, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }

  var req = {
    memo: Memo,
    emailSubject: EmailSubject,
    forceIssue: ForceIssue
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
    CorpNum: CorpNum,
    UserID: UserID,
    Data: postData,
    Method: 'ISSUE',
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, "issue", function (CorpNum, KeyType, MgtKey, success, error) {
    this.issue(CorpNum, KeyType, MgtKey, "", "", false, "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "issue", function (CorpNum, KeyType, MgtKey, Memo, success, error) {
    this.issue(CorpNum, KeyType, MgtKey, Memo, "", false, "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "issue", function (CorpNum, KeyType, MgtKey, Memo, UserID, success, error) {
    this.issue(CorpNum, KeyType, MgtKey, Memo, "", false, UserID, success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "issue", function (CorpNum, KeyType, MgtKey, Memo, ForceIssue, UserID, success, error) {
    this.issue(CorpNum, KeyType, MgtKey, Memo, '', ForceIssue, UserID, success, error);
});

TaxinvoiceService.prototype.cancelIssue = function (CorpNum, KeyType, MgtKey, Memo, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }
  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }

  var req = {
    memo: Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
    CorpNum: CorpNum,
    UserID: UserID,
    Data: postData,
    Method: 'CANCELISSUE',
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, "cancelIssue", function (CorpNum, KeyType, MgtKey, Memo, success, error) {
    this.cancelIssue(CorpNum, KeyType, MgtKey, Memo, '', success, error);
});

TaxinvoiceService.prototype.registRequest = function (CorpNum, Taxinvoice, Memo, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }


  if (this._isNullOrEmpty(Taxinvoice)) {
    this._throwError('세금계산서 정보가 입력되지 않았습니다.', error);
    return;
  }

  Taxinvoice.memo = Memo;

  var postData = this._stringify(Taxinvoice);

  this._executeAction({
    uri: '/Taxinvoice',
    CorpNum: CorpNum,
    UserID: UserID,
    Data: postData,
    Method: 'REQUEST',
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, "registRequest", function (CorpNum, Taxinvoice, success, error) {
    this.registRequest(CorpNum, Taxinvoice, "", "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "registRequest", function (CorpNum, Taxinvoice, Memo, success, error) {
    this.registRequest(CorpNum, Taxinvoice, Memo, "", success, error);
});

TaxinvoiceService.prototype.request = function (CorpNum, KeyType, MgtKey, Memo, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

  if (this._isNullOrEmpty(KeyType)) {
    this._throwError('문서번호유형이 입력되지 않았습니다.', error);
    return;
  }

  if (KeyType !== 'BUY'){
      this._throwError('문서번호유형이 올바르지 않습니다.', error);
      return;
  }

  if (this._isNullOrEmpty(MgtKey)) {
    this._throwError('문서번호가 입력되지 않았습니다.', error);
    return;
  }

  var req = {
    memo: Memo
  };
  var postData = this._stringify(req);

  this._executeAction({
    uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
    CorpNum: CorpNum,
    UserID: UserID,
    Data: postData,
    Method: 'REQUEST',
    success: function (response) {
      if (success) success(response);
    },
    error: error
  });
}

BaseService.addMethod(TaxinvoiceService.prototype, "request", function (CorpNum, KeyType, MgtKey, Memo, success, error) {
    this.request(CorpNum, KeyType, MgtKey, Memo, '', success, error);
});

TaxinvoiceService.prototype.cancelRequest = function (CorpNum, KeyType, MgtKey, Memo, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        memo: Memo
    };
    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'CANCELREQUEST',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "cancelRequest", function (CorpNum, KeyType, MgtKey, Memo, success, error) {
    this.cancelRequest(CorpNum, KeyType, MgtKey, Memo, '', success, error);
});

TaxinvoiceService.prototype.refuse = function (CorpNum, KeyType, MgtKey, Memo, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        memo: Memo
    };
    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'REFUSE',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "refuse", function (CorpNum, KeyType, MgtKey, Memo, success, error) {
    this.refuse(CorpNum, KeyType, MgtKey, Memo, '', success, error);
});

TaxinvoiceService.prototype.sendToNTS = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'NTS',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "sendToNTS", function (CorpNum, KeyType, MgtKey, success, error) {
    this.sendToNTS(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.getSendToNTSConfig = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Taxinvoice/SendToNTSConfig',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.sendToNTS);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "getSendToNTSConfig", function (CorpNum, success, error) {
    this.getSendToNTSConfig(CorpNum, '', success, error);
});

TaxinvoiceService.prototype.sendEmail = function (CorpNum, KeyType, MgtKey, Receiver, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        receiver: Receiver
    };
    var postData = this._stringify(req);
    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'EMAIL',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "sendEmail", function (CorpNum, KeyType, MgtKey, Receiver, success, error) {
    this.sendEmail(CorpNum, KeyType, MgtKey, Receiver, '', success, error);
});

TaxinvoiceService.prototype.sendSMS = function (CorpNum, KeyType, MgtKey, Sender, Receiver, Contents, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        sender: Sender,
        receiver: Receiver,
        contents: Contents
    };
    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'SMS',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "sendSMS", function (CorpNum, KeyType, MgtKey, Sender, Receiver, Contents, success, error) {
    this.sendSMS(CorpNum, KeyType, MgtKey, Sender, Receiver, Contents, '', success, error);
});

TaxinvoiceService.prototype.sendFAX = function (CorpNum, KeyType, MgtKey, Sender, Receiver, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        sender: Sender,
        receiver: Receiver
    };
    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'FAX',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}


BaseService.addMethod(TaxinvoiceService.prototype, "sendFAX", function (CorpNum, KeyType, MgtKey, Sender, Receiver, success, error) {
    this.sendFAX(CorpNum, KeyType, MgtKey, Sender, Receiver, '', success, error);
});


TaxinvoiceService.prototype.getURL = function (CorpNum, TOGO, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Taxinvoice?TG=' + TOGO,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}


BaseService.addMethod(TaxinvoiceService.prototype, "getURL", function (CorpNum, TOGO, success, error) {
    this.getURL(CorpNum, TOGO, '', success, error);
});


TaxinvoiceService.prototype.getPopUpURL = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '?TG=POPUP',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}


BaseService.addMethod(TaxinvoiceService.prototype, "getPopUpURL", function (CorpNum, KeyType, MgtKey, success, error) {
    this.getPopUpURL(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.getViewURL = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '?TG=VIEW',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "getViewURL", function (CorpNum, KeyType, MgtKey, success, error) {
    this.getViewURL(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.getPrintURL = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '?TG=PRINT',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}


BaseService.addMethod(TaxinvoiceService.prototype, "getPrintURL", function (CorpNum, KeyType, MgtKey, success, error) {
    this.getPrintURL(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.getPDFURL = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '?TG=PDF',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}


BaseService.addMethod(TaxinvoiceService.prototype, "getPDFURL", function (CorpNum, KeyType, MgtKey, success, error) {
    this.getPDFURL(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.getOldPrintURL = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '?TG=PRINTOLD',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "getOldPrintURL", function (CorpNum, KeyType, MgtKey, success, error) {
    this.getOldPrintURL(CorpNum, KeyType, MgtKey, '', success, error);
});


TaxinvoiceService.prototype.getMassPrintURL = function (CorpNum, KeyType, MgtKeyList, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKeyList)) {
        this._throwError('문서번호배열이 입력되지 않았습니다.', error);
        return;
    }

    var postData = this._stringify(MgtKeyList);
    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '?Print',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "getMassPrintURL", function (CorpNum, KeyType, MgtKeyList, success, error) {
    this.getMassPrintURL(CorpNum, KeyType, MgtKeyList, '', success, error);
});

TaxinvoiceService.prototype.getEPrintURL = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '?TG=EPRINT',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "getEPrintURL", function (CorpNum, KeyType, MgtKey, success, error) {
    this.getEPrintURL(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.getMailURL = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '?TG=MAIL',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "getMailURL", function (CorpNum, KeyType, MgtKey, success, error) {
    this.getMailURL(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.getEmailPublicKeys = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Taxinvoice/EmailPublicKeys',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "getEmailPublicKeys", function (CorpNum, success, error) {
    this.getEmailPublicKeys(CorpNum, '', success, error);
});

TaxinvoiceService.prototype.getPDF = function (CorpNum, KeyType, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('문서번호유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '?PDF',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}


BaseService.addMethod(TaxinvoiceService.prototype, "getPDF", function (CorpNum, KeyType, MgtKey, success, error) {
    this.getPDF(CorpNum, KeyType, MgtKey, '', success, error);
});

TaxinvoiceService.prototype.search = function (CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, TaxRegIDType, TaxRegIDYN, TaxRegID, QString, InterOPYN, UserID, IssueType, RegType, CloseDownState, MgtKey, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(DType)) {
        this._throwError('검색일자 유형이 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(SDate)) {
        this._throwError('시작일자가 입력되지 않았습니다.', error)
        return
    }

    if (!this._isValidDate(SDate)){
        this._throwError('시작일자 유형이 올바르지 않습니다.', error)
        return
    }

    if (this._isNullOrEmpty(EDate)) {
        this._throwError('종료일자가 입력되지 않았습니다.', error)
        return
    }

    if (!this._isValidDate(EDate)){
        this._throwError('종료일자 유형이 올바르지 않습니다.', error)
        return
    }

    var targetURI = '/Taxinvoice/' + KeyType + '?DType=' + DType;
    targetURI += '&SDate=' + SDate;
    targetURI += '&EDate=' + EDate;

    if(!this._isNullOrEmpty(State)) targetURI += '&State=' + State.toString();
    if(!this._isNullOrEmpty(Type)) targetURI += '&Type=' + Type.toString();
    if(!this._isNullOrEmpty(TaxType)) targetURI += '&TaxType=' + TaxType.toString();
    if (!this._isNullOrEmpty(IssueType)) targetURI += '&IssueType=' + IssueType.toString();
    if (!this._isNullOrEmpty(RegType)) targetURI += '&RegType=' + RegType.toString();
    if (!this._isNullOrEmpty(CloseDownState)) targetURI += '&CloseDownState=' + CloseDownState.toString();
    if (!this._isNullOrEmpty(LateOnly))
        if (LateOnly)
            targetURI += '&LateOnly=1';
        else
            targetURI += '&LateOnly=0';
    if (!this._isNullOrEmpty(QString)) targetURI += '&QString=' + encodeURIComponent(QString);
    if (!this._isNullOrEmpty(MgtKey)) targetURI += '&MgtKey=' + encodeURIComponent(MgtKey);
    if (!this._isNullOrEmpty(Order)) targetURI += '&Order=' + Order;
    if (!this._isNullOrEmpty(Page)) targetURI += '&Page=' + Page;
    if (!this._isNullOrEmpty(PerPage)) targetURI += '&PerPage=' + PerPage;
    if (!this._isNullOrEmpty(TaxRegIDType)) targetURI += '&TaxRegIDType=' + TaxRegIDType;
    if (!this._isNullOrEmpty(TaxRegIDYN)) targetURI += '&TaxRegIDYN=' + TaxRegIDYN;
    if (!this._isNullOrEmpty(TaxRegID)) targetURI += '&TaxRegID=' + TaxRegID;
    if (!this._isNullOrEmpty(InterOPYN)) targetURI += '&InterOPYN=' + InterOPYN;

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "search", function (CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, success, error) {
    this.search(CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, "", "", "", "", "", "", null, null, null, "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "search", function (CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, UserID, success, error) {
    this.search(CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, "", "", "", "", "", UserID, null, null, null, "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "search", function (CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, TaxRegIDType, TaxRegIDYN, TaxRegID, success, error) {
    this.search(CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, TaxRegIDType, TaxRegIDYN, TaxRegID, "", "", "", null, null, null, "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "search", function (CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, TaxRegIDType, TaxRegIDYN, TaxRegID, UserID, success, error) {
    this.search(CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, TaxRegIDType, TaxRegIDYN, TaxRegID, "", "", "", null, null, null, "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "search", function (CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, TaxRegIDType, TaxRegIDYN, TaxRegID, QString, UserID, success, error) {
    this.search(CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, TaxRegIDType, TaxRegIDYN, TaxRegID, QString, "", UserID, null, null, null, "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "search", function (CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, TaxRegIDType, TaxRegIDYN, TaxRegID, QString, InterOPYN, UserID, success, error) {
    this.search(CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, TaxRegIDType, TaxRegIDYN, TaxRegID, QString, InterOPYN, UserID, null, null, null, "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "search", function (CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, TaxRegIDType, TaxRegIDYN, TaxRegID, QString, InterOPYN, UserID, IssueType, success, error) {
    this.search(CorpNum, KeyType, DType, SDate, EDate, State, Type, TaxType, LateOnly, Order, Page, PerPage, TaxRegIDType, TaxRegIDYN, TaxRegID, QString, InterOPYN, UserID, IssueType, null, null, "", success, error);
});


TaxinvoiceService.prototype.registIssue = function (CorpNum, Taxinvoice, writeSpecification, forceIssue, memo, emailSubject, dealInvoiceMgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(Taxinvoice)) {
        this._throwError('세금계산서 정보가 입력되지 않았습니다.', error);
        return;
    }

    if (forceIssue === true)
        Taxinvoice.forceIssue = forceIssue;
    if (writeSpecification === true)
        Taxinvoice.writeSpecification = writeSpecification;

    if (!this._isNullOrEmpty(memo))    Taxinvoice.memo = memo;
    if (!this._isNullOrEmpty(emailSubject))    Taxinvoice.emailSubject = emailSubject;
    if (!this._isNullOrEmpty(dealInvoiceMgtKey))    Taxinvoice.dealInvoiceMgtKey = dealInvoiceMgtKey;

    var postData = this._stringify(Taxinvoice);
    this._executeAction({
        uri: '/Taxinvoice',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'ISSUE',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "registIssue", function (CorpNum, Taxinvoice, success, error) {
    this.registIssue(CorpNum, Taxinvoice, false, false, "", "", "", "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "registIssue", function (CorpNum, Taxinvoice, writeSpecification, success, error) {
    this.registIssue(CorpNum, Taxinvoice, writeSpecification, false, "", "", "", "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "registIssue", function (CorpNum, Taxinvoice, writeSpecification, forceIssue, success, error) {
    this.registIssue(CorpNum, Taxinvoice, writeSpecification, forceIssue, "", "", "", "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "registIssue", function (CorpNum, Taxinvoice, writeSpecification, forceIssue, memo, success, error) {
    this.registIssue(CorpNum, Taxinvoice, writeSpecification, forceIssue, memo, "", "", "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "registIssue", function (CorpNum, Taxinvoice, writeSpecification, forceIssue, memo, emailSubject, success, error) {
    this.registIssue(CorpNum, Taxinvoice, writeSpecification, forceIssue, memo, emailSubject, "", "", success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, "registIssue", function (CorpNum, Taxinvoice, writeSpecification, forceIssue, memo, emailSubject, dealInvoiceMgtKey, success, error) {
    this.registIssue(CorpNum, Taxinvoice, writeSpecification, forceIssue, memo, emailSubject, dealInvoiceMgtKey, "", success, error);
});

TaxinvoiceService.prototype.bulkSubmit = function (CorpNum, SubmitID, taxinvoiceList, forceIssue, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(SubmitID)) {
        this._throwError('제출아이디가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(taxinvoiceList)) {
        this._throwError('세금계산서 정보가 입력되지 않았습니다.', error);
        return;
    }else {
      for(var taxInvoice in taxinvoiceList){
        if (this._isNullOrEmpty(taxInvoice)) {
          this._throwError('세금계산서 정보가 입력되지 않았습니다.', error);
          return;
        }
      }
    }

    var bulkRequest = {};

    if (forceIssue === true)
        bulkRequest.forceIssue = forceIssue;

    bulkRequest.invoices = taxinvoiceList;
    var postData = this._stringify(bulkRequest);

    this._executeAction({
        uri: '/Taxinvoice',
        Method: 'BULKISSUE',
        CorpNum: CorpNum,
        SubmitID: SubmitID,
        UserID: UserID,
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'bulkSubmit', function (CorpNum, SubmitID, taxinvoiceList, success, error) {
    this.bulkSubmit(CorpNum, SubmitID, taxinvoiceList, false, '', success, error);
});

BaseService.addMethod(TaxinvoiceService.prototype, 'bulkSubmit', function (CorpNum, SubmitID, taxinvoiceList, forceIssue, success, error) {
    this.bulkSubmit(CorpNum, SubmitID, taxinvoiceList, forceIssue, '', success, error);
});

TaxinvoiceService.prototype.getBulkResult = function (CorpNum, SubmitID, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(SubmitID)) {
        this._throwError('제출아이디가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Taxinvoice/BULK/' + SubmitID + '/State',
        Method: 'GET',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'getBulkResult', function (CorpNum, SubmitID, success, error) {
    this.getBulkResult(CorpNum, SubmitID, '', success, error);
});

TaxinvoiceService.prototype.attachStatement = function (CorpNum, KeyType, MgtKey, SubItemCode, SubMgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if(this._isNullOrEmpty(KeyType)){
        this._throwError("세금계산서 발행유형이 입력되지 않았습니다.", error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('세금계산서 문서번호가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(SubItemCode)) {
        this._throwError('첨부할 전자명세서코드가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(SubMgtKey)) {
        this._throwError('첨부할 전자명세서 문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        ItemCode: SubItemCode,
        MgtKey: SubMgtKey
    };

    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '/AttachStmt',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

BaseService.addMethod(TaxinvoiceService.prototype, "attachStatement", function (CorpNum, KeyType, MgtKey, SubItemCode, SubMgtKey, success, error){
   this.attachStatement(CorpNum, KeyType, MgtKey, SubItemCode, SubMgtKey, '', success, error)
});

TaxinvoiceService.prototype.detachStatement = function (CorpNum, KeyType, MgtKey, SubItemCode, SubMgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if(this._isNullOrEmpty(KeyType)){
        this._throwError("세금계산서 발행유형이 입력되지 않았습니다.", error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('세금계산서 문서번호가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(SubItemCode)) {
        this._throwError('첨부해제할 전자명세서코드가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(SubMgtKey)) {
        this._throwError('첨부해제할 전자명세서 문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        ItemCode: SubItemCode,
        MgtKey: SubMgtKey
    };

    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Taxinvoice/' + KeyType + '/' + MgtKey + '/DetachStmt',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

BaseService.addMethod(TaxinvoiceService.prototype, "detachStatement", function (CorpNum, KeyType, MgtKey, SubItemCode, SubMgtKey, success, error){
   this.detachStatement(CorpNum, KeyType, MgtKey, SubItemCode, SubMgtKey, '', success, error)
});

TaxinvoiceService.prototype.checkCertValidation = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }


    this._executeAction({
        uri: '/Taxinvoice/CertCheck',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'checkCertValidation', function (CorpNum, success, error) {
    this.checkCertValidation(CorpNum, "", success, error);
});

TaxinvoiceService.prototype.assignMgtKey = function (CorpNum, KeyType, ItemKey, MgtKey, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }


    if (this._isNullOrEmpty(KeyType)) {
        this._throwError('세금계산서 발행유형이 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(ItemKey)) {
        this._throwError('아이템키가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(MgtKey)) {
        this._throwError('문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var postData = "MgtKey=" + MgtKey;

    this._executeAction({
        uri: '/Taxinvoice/' + ItemKey + '/' + KeyType,
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        ContentsType: 'application/x-www-form-urlencoded; charset=utf-8',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'assignMgtKey', function (CorpNum, KeyType, ItemKey, MgtKey, success, error) {
    this.assignMgtKey(CorpNum, KeyType, ItemKey, MgtKey, "", success, error);
});


TaxinvoiceService.prototype.listEmailConfig = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Taxinvoice/EmailSendConfig',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "listEmailConfig", function (CorpNum, success, error) {
    this.listEmailConfig(CorpNum, "", success, error);
});

TaxinvoiceService.prototype.updateEmailConfig = function (CorpNum, EmailType, SendYN, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(EmailType)) {
        this._throwError('메일전송타입(EmailType)이 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(SendYN)) {
        this._throwError('메일전송여부(SendYN)가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Taxinvoice/EmailSendConfig?EmailType=' + EmailType + '&SendYN=' + SendYN,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, "updateEmailConfig", function (CorpNum, EmailType, SendYN, success, error) {
    this.updateEmailConfig(CorpNum, EmailType, SendYN, "", success, error);
});


TaxinvoiceService.prototype.getSealURL = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Member?TG=SEAL',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'getSealURL', function(CorpNum, success, error){
    this.getSealURL(CorpNum, '', success, error)
});

TaxinvoiceService.prototype.getTaxCertURL = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Member?TG=CERT',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}

BaseService.addMethod(TaxinvoiceService.prototype, 'getTaxCertURL', function(CorpNum, success, error){
   this.getTaxCertURL(CorpNum, '', success, error)
});