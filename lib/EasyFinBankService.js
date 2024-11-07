var Util = require('util');
var BaseService = require('./BaseService');
var linkhub = require('linkhub');

module.exports = EasyFinBankService;
Util.inherits(EasyFinBankService, BaseService);

function EasyFinBankService(configs) {
    BaseService.call(this, configs);
    this._scopes.push('180');
}

EasyFinBankService.prototype.getBankAccountInfo = function (CorpNum, BankCode, AccountNumber, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(BankCode)) {
        this._throwError('기관코드가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(AccountNumber)) {
        this._throwError('계좌번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank/BankAccount/' + BankCode + '/' + AccountNumber,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'getBankAccountInfo', function (CorpNum, BankCode, AccountNumber, success, error) {
    this.getBankAccountInfo(CorpNum, BankCode, AccountNumber, '', success, error);
});

EasyFinBankService.prototype.registBankAccount = function (CorpNum, BankAccountInfo, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    var uri = '/EasyFin/Bank/BankAccount/Regist';

    if (this._isNullOrEmpty(BankAccountInfo)) uri += '?UsePeriod=' + BankAccountInfo.UsePeriod;

    var postData = linkhub.stringify(BankAccountInfo);

    this._executeAction({
        uri: uri,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'registBankAccount', function (CorpNum, BankAccountInfo, success, error) {
    this.registBankAccount(CorpNum, BankAccountInfo, '', success, error);
});

EasyFinBankService.prototype.deleteBankAccount = function (CorpNum, BankCode, AccountNumber, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(BankCode)) {
        this._throwError('기관코드가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(AccountNumber)) {
        this._throwError('계좌번호가 입력되지 않았습니다.', error);
        return;
    }

    var uri = '/EasyFin/Bank/BankAccount/Delete';

    var BankAccountInfo = {
        BankCode: BankCode,
        AccountNumber: AccountNumber,
    };

    var postData = linkhub.stringify(BankAccountInfo);

    this._executeAction({
        uri: uri,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'deleteBankAccount', function (CorpNum, BankCode, AccountNumber, success, error) {
    this.deleteBankAccount(CorpNum, BankCode, AccountNumber, '', success, error);
});


EasyFinBankService.prototype.updateBankAccount = function (CorpNum, BankCode, AccountNumber, BankAccountInfo, UserID, success, error) {
    BankAccountInfo.BankCode = BankCode;
    BankAccountInfo.AccountNumber = AccountNumber;
    this.updateBankAccount(CorpNum, BankAccountInfo, UserID, success, error);
}

BaseService.addMethod(EasyFinBankService.prototype, 'updateBankAccount', function(CorpNum, BankAccountInfo, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(BankAccountInfo.BankCode)) {
        this._throwError('기관코드가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(BankAccountInfo.AccountNumber)) {
        this._throwError('계좌번호가 입력되지 않았습니다.', error);
        return;
    }

    var uri = '/EasyFin/Bank/BankAccount/' + BankAccountInfo.BankCode + '/' + BankAccountInfo.AccountNumber + '/Update';

    var postData = linkhub.stringify(BankAccountInfo);

    this._executeAction({
        uri: uri,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
});

BaseService.addMethod(EasyFinBankService.prototype, 'updateBankAccount', function (CorpNum, BankAccountInfo, success, error) {
    this.updateBankAccount(CorpNum, BankAccountInfo, '', success, error);
});

BaseService.addMethod(EasyFinBankService.prototype, 'updateBankAccount', function (CorpNum, BankCode, AccountNumber, BankAccountInfo, success, error) {
    this.updateBankAccount(CorpNum, BankCode, AccountNumber, BankAccountInfo, '', success, error);
});


EasyFinBankService.prototype.closeBankAccount = function (CorpNum, BankCode, AccountNumber, CloseType, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(BankCode)) {
        this._throwError('기관코드가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(AccountNumber)) {
        this._throwError('계좌번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(CloseType)) {
        this._throwError('계좌 정액제 해지유형이 입력되지 않았습니다.', error);
        return;
    }

    if (CloseType !== '중도' && CloseType !== '일반') {
        this._throwError('계좌 정액제 해지유형이 올바르지 않습니다.', error);
        return;
    }

    var uri = '/EasyFin/Bank/BankAccount/Close';
    uri += '?BankCode=' + BankCode;
    uri += '&AccountNumber=' + AccountNumber;
    uri += '&CloseType=' + encodeURIComponent(CloseType);

    this._executeAction({
        uri: uri,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'closeBankAccount', function (CorpNum, BankCode, AccountNumber, CloseType, success, error) {
    this.closeBankAccount(CorpNum, BankCode, AccountNumber, CloseType, '', success, error);
});

EasyFinBankService.prototype.revokeCloseBankAccount = function (CorpNum, BankCode, AccountNumber, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(BankCode)) {
        this._throwError('기관코드가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(AccountNumber)) {
        this._throwError('계좌번호가 입력되지 않았습니다.', error);
        return;
    }

    var uri = '/EasyFin/Bank/BankAccount/RevokeClose';
    uri += '?BankCode=' + BankCode;
    uri += '&AccountNumber=' + AccountNumber;

    this._executeAction({
        uri: uri,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'revokeCloseBankAccount', function (CorpNum, BankCode, AccountNumber, success, error) {
    this.revokeCloseBankAccount(CorpNum, BankCode, AccountNumber, '', success, error);
});

EasyFinBankService.prototype.getChargeInfo = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank/ChargeInfo',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'getChargeInfo', function (CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', success, error);
});

EasyFinBankService.prototype.getBankAccountMgtURL = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank?TG=BankAccount',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'getBankAccountMgtURL', function (CorpNum, success, error) {
    this.getBankAccountMgtURL(CorpNum, '', success, error);
});

EasyFinBankService.prototype.listBankAccount = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank/ListBankAccount',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'listBankAccount', function (CorpNum, success, error) {
    this.listBankAccount(CorpNum, '', success, error);
});

EasyFinBankService.prototype.requestJob = function (CorpNum, BankCode, AccountNumber, SDate, EDate, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(BankCode)) {
        this._throwError('기관코드가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(AccountNumber)) {
        this._throwError('계좌번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(SDate)) {
        this._throwError('시작일자가 입력되지 않았습니다.', error)
        return
    }

    if (!this._isValidDate(SDate)){
        this._throwError('시작일자가 유형이 올바르지 않습니다.', error)
        return
    }

    if (this._isNullOrEmpty(EDate)) {
        this._throwError('종료일자가 입력되지 않았습니다.', error)
        return
    }

    if (!this._isValidDate(EDate)){
        this._throwError('종료일자가 유형이 올바르지 않습니다.', error)
        return
    }
    
    var targetURI = '/EasyFin/Bank/BankAccount';
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
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'requestJob', function (CorpNum, BankCode, AccountNumber, SDate, EDate, success, error) {
    this.requestJob(CorpNum, BankCode, AccountNumber, SDate, EDate, '', success, error);
});

EasyFinBankService.prototype.getJobState = function (CorpNum, JobID, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(JobID)) {
        this._throwError('작업아이디가 입력되지 않았습니다.', error);
        return;
    }

    if (JobID.length !== 18) {
        this._throwError('작업아이디(jobID)가 올바르지 않습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank/' + JobID + '/State',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'getJobState', function (CorpNum, JobID, success, error) {
    this.getJobState(CorpNum, JobID, '', success, error);
});

EasyFinBankService.prototype.listActiveJob = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank/JobList',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'listActiveJob', function (CorpNum, success, error) {
    this.listActiveJob(CorpNum, '', success, error);
});

EasyFinBankService.prototype.search = function (CorpNum, JobID, TradeType, SearchString, Page, PerPage, Order, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(JobID)) {
        this._throwError('작업아이디가 입력되지 않았습니다.', error);
        return;
    }
    if (JobID.length !== 18) {
        this._throwError('작업아이디(jobID)가 올바르지 않습니다.', error);
        return;
    }

    var targetURI = '/EasyFin/Bank/' + JobID + '?TradeType=';
    if (!this._isNullOrEmpty(TradeType)) targetURI += TradeType.toString();
    if (!this._isNullOrEmpty(SearchString)) targetURI += '&SearchString=' + encodeURIComponent(SearchString);
    if (!this._isNullOrEmpty(Page)) targetURI += '&Page=' + Page;
    if (!this._isNullOrEmpty(PerPage)) targetURI += '&PerPage=' + PerPage;
    if (!this._isNullOrEmpty(Order)) targetURI += '&Order=' + Order;

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'search', function (CorpNum, JobID, TradeType, SearchString, Page, PerPage, Order, success, error) {
    this.search(CorpNum, JobID, TradeType, SearchString, Page, PerPage, Order, '', success, error);
});

EasyFinBankService.prototype.summary = function (CorpNum, JobID, TradeType, SearchString, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(JobID)) {
        this._throwError('작업아이디가 입력되지 않았습니다.', error);
        return;
    }

    if (JobID.length !== 18) {
        this._throwError('작업아이디(jobID)가 올바르지 않습니다.', error);
    }

    var targetURI = '/EasyFin/Bank/' + JobID + '/Summary';
    targetURI += '?TradeType=' + TradeType.toString();

    if (!this._isNullOrEmpty(SearchString)) {
        targetURI += '&SearchString=' + encodeURIComponent(SearchString);
    }

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'summary', function (CorpNum, JobID, TradeType, SearchString, success, error) {
    this.summary(CorpNum, JobID, TradeType, SearchString, '', success, error);
});

EasyFinBankService.prototype.saveMemo = function (CorpNum, TID, Memo, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(TID)) {
        this._throwError('거래내역 아이디가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(Memo)) {
        this._throwError('메모가 입력되지 않았습니다.', error);
        return;
    }
    var targetURI = '/EasyFin/Bank/SaveMemo';
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
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'saveMemo', function (CorpNum, TID, Memo, success, error) {
    this.saveMemo(CorpNum, TID, Memo, '', success, error);
});

EasyFinBankService.prototype.getFlatRatePopUpURL = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank?TG=CHRG',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'getFlatRatePopUpURL', function (CorpNum, success, error) {
    this.getFlatRatePopUpURL(CorpNum, '', success, error);
});

EasyFinBankService.prototype.getFlatRateState = function (CorpNum, BankCode, AccountNumber, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(BankCode)) {
        this._throwError('기관코드가 입력되지 않았습니다.', error);
        return;
    }

    if (BankCode.length !== 4) {
        this._throwError('기관코드가 올바르지 않습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(AccountNumber)) {
        this._throwError('계좌번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank/Contract/' + BankCode + '/' + AccountNumber,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'getFlatRateState', function (CorpNum, BankCode, AccountNumber, success, error) {
    this.getFlatRateState(CorpNum, BankCode, AccountNumber, '', success, error);
});

EasyFinBankService.prototype.getChargeInfo = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/EasyFin/Bank/ChargeInfo',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error,
    });
};

BaseService.addMethod(EasyFinBankService.prototype, 'getChargeInfo', function (CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', success, error);
});