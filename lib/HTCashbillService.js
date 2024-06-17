var Util = require('util');
var BaseService = require('./BaseService');

module.exports = HTCashbillService;
Util.inherits(HTCashbillService, BaseService);

function HTCashbillService(configs) {
    BaseService.call(this, configs);
    this._scopes.push('141');
}

HTCashbillService.prototype.getChargeInfo = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }


    this._executeAction({
        uri: '/HomeTax/Cashbill/ChargeInfo',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "getChargeInfo", function (CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', success, error);
});

HTCashbillService.prototype.requestJob = function (CorpNum, Type, SDate, EDate, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
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

    var targetURI = '/HomeTax/Cashbill/' + Type;
    targetURI += '?SDate=' + SDate;
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
}

BaseService.addMethod(HTCashbillService.prototype, "requestJob", function (CorpNum, Type, SDate, EDate, success, error) {
    this.requestJob(CorpNum, Type, SDate, EDate, "", success, error);
});

HTCashbillService.prototype.getJobState = function (CorpNum, JobID, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (!this._isNullOrEmpty(JobID)){
        this._throwError('작업아이디(jobID) 입력되지 않았습니다.', error)
        return
    }

    if (JobID.length !== 18) {
        this._throwError('작업아이디(jobID)가 올바르지 않습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/HomeTax/Cashbill/' + JobID + '/State',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "getJobState", function (CorpNum, JobID, success, error) {
    this.getJobState(CorpNum, JobID, "", success, error);
});

HTCashbillService.prototype.listActiveJob = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Cashbill/JobList',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "listActiveJob", function (CorpNum, success, error) {
    this.listActiveJob(CorpNum, "", success, error);
});

HTCashbillService.prototype.search = function (CorpNum, JobID, TradeType, TradeUsage, Page, PerPage, Order, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if(this._isNullOrEmpty(JobID)){
        this._throwError('작업아디가 입력되지 않았습니다.', error)
        return;
    }

    if (JobID.length !== 18) {
        this._throwError('작업아이디(jobID)가 올바르지 않습니다.', error);
    }

    var targetURI = '/HomeTax/Cashbill/' + JobID;
    if(!this._isNullOrEmpty(TradeType)) targetURI += '?TradeType=' + TradeType.toString();
    if(!this._isNullOrEmpty(TradeUsage)) targetURI += '&TradeUsage=' + TradeUsage.toString();
    if(!this._isNullOrEmpty(Page)) targetURI += '&Page=' + Page;
    if(!this._isNullOrEmpty(PerPage)) targetURI += '&PerPage=' + PerPage;
    if(!this._isNullOrEmpty(Order)) targetURI += '&Order=' + Order;

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "search", function (CorpNum, JobID, TradeType, TradeUsage, Page, PerPage, Order, success, error) {
    this.search(CorpNum, JobID, TradeType, TradeUsage, Page, PerPage, Order, '', success, error);
});

HTCashbillService.prototype.summary = function (CorpNum, JobID, TradeType, TradeUsage, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if(this._isNullOrEmpty(JobID)) {
        this._throwError('작업아이디가 입력되지 않았습니다.', error);
        return;
    }

    if (JobID.length !== 18) {
        this._throwError('작업아이디(jobID)가 올바르지 않습니다.', error);
    }

    var targetURI = '/HomeTax/Cashbill/' + JobID + '/Summary';
    if(!this._isNullOrEmpty(TradeType)) targetURI += '?TradeType=' + TradeType.toString();
    if(!this._isNullOrEmpty(TradeUsage)) targetURI += '&TradeUsage=' + TradeUsage.toString();

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "summary", function (CorpNum, JobID, TradeType, TradeUsage, success, error) {
    this.summary(CorpNum, JobID, TradeType, TradeUsage, '', success, error);
});

HTCashbillService.prototype.getFlatRatePopUpURL = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }



    this._executeAction({
        uri: '/HomeTax/Cashbill?TG=CHRG',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "getFlatRatePopUpURL", function (CorpNum, success, error) {
    this.getFlatRatePopUpURL(CorpNum, '', success, error);
});


HTCashbillService.prototype.getCertificatePopUpURL = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }


    this._executeAction({
        uri: '/HomeTax/Cashbill?TG=CERT',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "getCertificatePopUpURL", function (CorpNum, success, error) {
    this.getCertificatePopUpURL(CorpNum, '', success, error);
});

HTCashbillService.prototype.getFlatRateState= function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Cashbill/Contract',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "getFlatRateState", function (CorpNum, success, error) {
    this.getFlatRateState(CorpNum, '', success, error);
});

HTCashbillService.prototype.getCertificateExpireDate = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Cashbill/CertInfo',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.certificateExpiration);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "getCertificateExpireDate", function (CorpNum, success, error) {
    this.getCertificateExpireDate(CorpNum, '', success, error);
});

HTCashbillService.prototype.checkCertValidation = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Cashbill/CertCheck',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "checkCertValidation", function (CorpNum, success, error) {
    this.checkCertValidation(CorpNum, '', success, error);
});

HTCashbillService.prototype.checkDeptUser = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Cashbill/DeptUser',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "checkDeptUser", function (CorpNum, success, error) {
    this.checkDeptUser(CorpNum, '', success, error);
});

HTCashbillService.prototype.registDeptUser = function (CorpNum, DeptUserID, DeptUserPWD, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(DeptUserID)) {
        this._throwError('홈택스 현금영수증 부서사용자 아이디가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(DeptUserPWD)) {
        this._throwError('홈택스 현금영수증 부서사용자 비밀번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        id: DeptUserID,
        pwd: DeptUserPWD
    };
    var postData = this._stringify(req);

    this._executeAction({
        uri: '/HomeTax/Cashbill/DeptUser',
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

BaseService.addMethod(HTCashbillService.prototype, "registDeptUser", function (CorpNum, DeptUserID, DeptUserPWD, success, error) {
    this.registDeptUser(CorpNum, DeptUserID, DeptUserPWD, '', success, error);
});

HTCashbillService.prototype.checkLoginDeptUser = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Cashbill/DeptUser/Check',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "checkLoginDeptUser", function (CorpNum, success, error) {
    this.checkLoginDeptUser(CorpNum, '', success, error);
});

HTCashbillService.prototype.deleteDeptUser = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Cashbill/DeptUser',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'DELETE',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(HTCashbillService.prototype, "deleteDeptUser", function (CorpNum, success, error) {
    this.deleteDeptUser(CorpNum, '', success, error);
});