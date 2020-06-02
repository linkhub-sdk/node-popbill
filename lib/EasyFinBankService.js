var Util         = require('util');
var BaseService = require('./BaseService');
var linkhub = require('linkhub');

module.exports = EasyFinBankService;
Util.inherits(EasyFinBankService, BaseService);

function EasyFinBankService(configs) {
    BaseService.call(this, configs);
    this._scopes.push('180');
}

BaseService.addMethod(EasyFinBankService.prototype, 'getBankAccountInfo', function(CorpNum, BankCode, AccountNumber, success, error){
  this.getBankAccountInfo(CorpNum, BankCode, AccountNumber, '', success, error);
});


BaseService.addMethod(EasyFinBankService.prototype, 'getBankAccountInfo', function(CorpNum, BankCode, AccountNumber, UserID, success, error){
  if (!BankCode || 0 === BankCode.length) {
      this._throwError(-99999999, '은행코드가 입력되지 않았습니다.', error);
      return;
  }
  if (!AccountNumber || 0 === AccountNumber.length) {
      this._throwError(-99999999, '계좌번호가 입력되지 않았습니다.', error);
      return;
  }

  this._executeAction({
    uri : "/EasyFin/Bank/BankAccount/" + BankCode + "/"+ AccountNumber,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(EasyFinBankService.prototype, 'registBankAccount', function (CorpNum, BankAccountInfo, callback, err) {
    this.registBankAccount(CorpNum, BankAccountInfo, '', callback, err);
});

BaseService.addMethod(EasyFinBankService.prototype, 'registBankAccount', function (CorpNum, BankAccountInfo, UserID, callback, err) {
    var uri = "/EasyFin/Bank/BankAccount/Regist";
    if (!BankAccountInfo.UsePeriod && 0 === BankAccountInfo.UsePeriod.length) uri += "?UsePeriod="+BankAccountInfo.UsePeriod;

    var postData = linkhub.stringify(BankAccountInfo);

    this._executeAction({
        uri: uri,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        success: function (response) {
            if (callback) callback(response);
        },
        error: err
    });
});

BaseService.addMethod(EasyFinBankService.prototype, 'updateBankAccount', function (CorpNum, BankAccountInfo, callback, err) {
    this.updateBankAccount(CorpNum, BankAccountInfo, '', callback, err);
});

BaseService.addMethod(EasyFinBankService.prototype, 'updateBankAccount', function (CorpNum, BankAccountInfo, UserID, callback, err) {
    if (!BankAccountInfo.BankCode || 0 === BankAccountInfo.BankCode.length) {
        this._throwError(-99999999, '은행코드가 입력되지 않았습니다.', err);
        return;
    }
    if (!BankAccountInfo.AccountNumber || 0 === BankAccountInfo.AccountNumber.length) {
        this._throwError(-99999999, '계좌번호가 입력되지 않았습니다.', err);
        return;
    }

    var uri = "/EasyFin/Bank/BankAccount/"+BankAccountInfo.BankCode+"/"+BankAccountInfo.AccountNumber+"/Update";

    var postData = linkhub.stringify(BankAccountInfo);

    this._executeAction({
        uri: uri,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        success: function (response) {
            if (callback) callback(response);
        },
        error: err
    });
});

BaseService.addMethod(EasyFinBankService.prototype, 'closeBankAccount', function (CorpNum, BankCode, AccountNumber, CloseType, callback, err) {
    this.closeBankAccount(CorpNum, BankCode, AccountNumber, CloseType, '', callback, err);
});

BaseService.addMethod(EasyFinBankService.prototype, 'closeBankAccount', function (CorpNum, BankCode, AccountNumber, CloseType, UserID, callback, err) {

    if (!BankCode || 0 === BankCode.length) {
        this._throwError(-99999999, '은행코드가 입력되지 않았습니다.', err);
        return;
    }
    if (!AccountNumber || 0 === AccountNumber.length) {
        this._throwError(-99999999, '계좌번호가 입력되지 않았습니다.', err);
        return;
    }

    if (!CloseType || 0 === CloseType.length) {
        this._throwError(-99999999, '계좌 정액제 해지유형이 입력되지 않았습니다.', err);
        return;
    }

    if (CloseType != "중도" && CloseType != "일반") {
        this._throwError(-99999999, '계좌 정액제 해지유형이 올바르지 않습니다.', err);
        return;
    }

    var uri = "/EasyFin/Bank/BankAccount/Close";
    uri += '?BankCode=' + BankCode;
    uri += '&AccountNumber=' + AccountNumber;
    uri += '&CloseType=' + encodeURIComponent(CloseType);;

    var postData = "";

    this._executeAction({
        uri: uri,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        success: function (response) {
            if (callback) callback(response);
        },
        error: err
    });
});

BaseService.addMethod(EasyFinBankService.prototype, 'revokeCloseBankAccount', function (CorpNum, BankCode, AccountNumber, callback, err) {
    this.revokeCloseBankAccount(CorpNum, BankCode, AccountNumber, '', callback, err);
});

BaseService.addMethod(EasyFinBankService.prototype, 'revokeCloseBankAccount', function (CorpNum, BankCode, AccountNumber, UserID, callback, err) {

    if (!BankCode || 0 === BankCode.length) {
        this._throwError(-99999999, '은행코드가 입력되지 않았습니다.', err);
        return;
    }

    if (!AccountNumber || 0 === AccountNumber.length) {
        this._throwError(-99999999, '계좌번호가 입력되지 않았습니다.', err);
        return;
    }

    var uri = "/EasyFin/Bank/BankAccount/RevokeClose";
    uri += '?BankCode=' + BankCode;
    uri += '&AccountNumber=' + AccountNumber;

    var postData = "";

    this._executeAction({
        uri: uri,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        success: function (response) {
            if (callback) callback(response);
        },
        error: err
    });
});



BaseService.addMethod(EasyFinBankService.prototype, "getChargeInfo", function (CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, "getChargeInfo", function (CorpNum, UserID, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/EasyFin/Bank/ChargeInfo',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(EasyFinBankService.prototype, "getBankAccountMgtURL", function (CorpNum, success, error) {
    this.getBankAccountMgtURL(CorpNum, '', success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, "getBankAccountMgtURL", function (CorpNum, UserID, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank?TG=BankAccount',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
});

BaseService.addMethod(EasyFinBankService.prototype, "listBankAccount", function (CorpNum, success, error) {
    this.listBankAccount(CorpNum, "", success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, "listBankAccount", function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/EasyFin/Bank/ListBankAccount',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(EasyFinBankService.prototype, "requestJob", function (CorpNum, BankCode, AccountNumber, SDate, EDate, success, error) {
    this.requestJob(CorpNum, BankCode, AccountNumber, SDate, EDate, "", success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, "requestJob", function (CorpNum, BankCode, AccountNumber, SDate, EDate, UserID, success, error) {
    targetURI = '/EasyFin/Bank/BankAccount'
    targetURI += '?BankCode=' + BankCode;
    targetURI += '&AccountNumber=' + AccountNumber;
    targetURI += '&SDate=' + SDate;
    targetURI += '&EDate=' + EDate;

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        success: function (response) {
            if (success) success(response.jobID);
        },
        error: error
    });
});

BaseService.addMethod(EasyFinBankService.prototype, "getJobState", function (CorpNum, JobID, success, error) {
    this.getJobState(CorpNum, JobID, "", success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, "getJobState", function (CorpNum, JobID, UserID, success, error) {
    if (JobID.length !== 18) {
        this._throwError(-99999999, '작업아이디(jobID)가 올바르지 않습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank/' + JobID + '/State',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(EasyFinBankService.prototype, "listActiveJob", function (CorpNum, success, error) {
    this.listActiveJob(CorpNum, "", success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, "listActiveJob", function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/EasyFin/Bank/JobList',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(EasyFinBankService.prototype, "search", function (CorpNum, JobID, TradeType, SearchString, Page, PerPage, Order,  success, error) {
    this.search(CorpNum, JobID, TradeType, SearchString, Page, PerPage, Order, "", success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, "search", function (CorpNum, JobID, TradeType, SearchString, Page, PerPage, Order, UserID, success, error) {
    if (JobID.length !== 18) {
        this._throwError(-99999999, '작업아이디(jobID)가 올바르지 않습니다.', error);
    }

    targetURI = '/EasyFin/Bank/' + JobID;
    targetURI += '?TradeType=' + TradeType.toString();

    if (SearchString !== "") {
      targetURI += '&SearchString=' + encodeURIComponent(SearchString);
    }

    targetURI += '&Page=' + Page;
    targetURI += '&PerPage=' + PerPage;
    targetURI += '&Order=' + Order;

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(EasyFinBankService.prototype, "summary", function (CorpNum, JobID, TradeType, SearchString, success, error) {
    this.summary(CorpNum, JobID, TradeType, SearchString, "", success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, "summary", function (CorpNum, JobID, TradeType, SearchString, UserID, success, error) {
    if (JobID.length !== 18) {
        this._throwError(-99999999, '작업아이디(jobID)가 올바르지 않습니다.', error);
    }

    targetURI = '/EasyFin/Bank/' + JobID + '/Summary';
    targetURI += '?TradeType=' + TradeType.toString();

    if (SearchString !== "") {
      targetURI += '&SearchString=' + encodeURIComponent(SearchString);
    }

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(EasyFinBankService.prototype, "saveMemo", function (CorpNum, TID, Memo, success, error) {
    this.saveMemo(CorpNum, TID, Memo, "", success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, "saveMemo", function (CorpNum, TID, Memo, UserID, success, error) {
    targetURI = '/EasyFin/Bank/SaveMemo'
    targetURI += '?TID=' + TID;
    targetURI += '&Memo=' + encodeURIComponent(Memo);

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(EasyFinBankService.prototype, "getFlatRatePopUpURL", function (CorpNum, success, error) {
    this.getFlatRatePopUpURL(CorpNum, "", success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, "getFlatRatePopUpURL", function (CorpNum, UserID, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank?TG=CHRG',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
});

BaseService.addMethod(EasyFinBankService.prototype, "getFlatRateState", function (CorpNum, BankCode, AccountNumber,  success, error) {
    this.getFlatRateState(CorpNum, BankCode, AccountNumber, "", success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, "getFlatRateState", function (CorpNum, BankCode, AccountNumber, UserID, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank/Contract/'+BankCode+'/'+AccountNumber,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(EasyFinBankService.prototype, "getChargeInfo", function (CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, "getChargeInfo", function (CorpNum, UserID, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/EasyFin/Bank/ChargeInfo',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});
