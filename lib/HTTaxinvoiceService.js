var Util = require('util')
var BaseService = require('./BaseService')

module.exports = HTTaxinvoiceService
Util.inherits(HTTaxinvoiceService, BaseService)

function HTTaxinvoiceService(configs) {
    BaseService.call(this, configs)
    this._scopes.push('111')
}

HTTaxinvoiceService.prototype.getChargeInfo = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Taxinvoice/ChargeInfo',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'getChargeInfo', function(CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', success, error)
})

HTTaxinvoiceService.prototype.requestJob = function(CorpNum, QueryType, DType, SDate, EDate, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(QueryType)) {
        this._throwError('세금계산서 유형이 입력되지 않았습니다.', error)
        return
    }

    if (!this._isNullOrEmpty(QueryType)) {
        if (QueryType !== 'SELL' && QueryType !== 'BUY' && QueryType !== 'TRUSTEE') {
            this._throwError('세금계산서 유형이 올바르지 않습니다', error)
            return;
        }
    }

    if (this._isNullOrEmpty(DType)) {
        this._throwError('조회할 일자 유형이 입력되지 않았습니다.', error)
        return
    }

    if (!this._isNullOrEmpty(DType)) {
        if (DType !== 'W' && DType !== 'I' && DType !== 'S') {
            this._throwError('조회할 일자 유형이 올바르지 않습니다', error)
            return;
        }
    }

    if (this._isNullOrEmpty(SDate)) {
        this._throwError('조회 시작일자가 입력되지 않았습니다.', error)
        return
    }

    if (!this._isValidDate(SDate)) {
        this._throwError('시작일자 유형이 올바르지 않습니다.', error)
        return
    }

    if (this._isNullOrEmpty(EDate)) {
        this._throwError('조회 종료일자가 입력되지 않았습니다.', error)
        return
    }

    if (!this._isValidDate(EDate)) {
        this._throwError('종료일자 유형이 올바르지 않습니다.', error)
        return
    }


    var targetURI = '/HomeTax/Taxinvoice/' + QueryType
    targetURI += '?DType=' + DType
    targetURI += '&SDate=' + SDate
    targetURI += '&EDate=' + EDate

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        success: function(response) {
            if (success) success(response.jobID)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'requestJob', function(CorpNum, Type, DType, SDate, EDate, success, error) {
    this.requestJob(CorpNum, Type, DType, SDate, EDate, '', success, error)
})

HTTaxinvoiceService.prototype.getJobState = function(CorpNum, JobID, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    if (this._isNullOrEmpty(JobID)) {
        this._throwError('작업아이디가 입력되지 않았습니다.', error)
        return
    }

    if (JobID.length !== 18) {
        this._throwError('작업아이디(jobID)가 올바르지 않습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Taxinvoice/' + JobID + '/State',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'getJobState', function(CorpNum, JobID, success, error) {
    this.getJobState(CorpNum, JobID, '', success, error)
})

HTTaxinvoiceService.prototype.listActiveJob = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/HomeTax/Taxinvoice/JobList',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'listActiveJob', function(CorpNum, success, error) {
    this.listActiveJob(CorpNum, '', success, error)
})

HTTaxinvoiceService.prototype.search = function(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, Page, PerPage, Order, UserID, SearchString, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    if (this._isNullOrEmpty(JobID)) {
        this._throwError('작업아이디(jobID) 입력되지 않았습니다.', error)
        return
    }

    if (JobID.length !== 18) {
        this._throwError('작업아이디(jobID)가 올바르지 않습니다.', error)
        return;
    }

    var targetURI = '/HomeTax/Taxinvoice/' + JobID + '?Type='
    if (!this._isNullOrEmpty(Type)) targetURI += Type.toString()
    if (!this._isNullOrEmpty(TaxType)) targetURI += '&TaxType=' + TaxType.toString()
    if (!this._isNullOrEmpty(PurposeType)) targetURI += '&PurposeType=' + PurposeType.toString()
    if (!this._isNullOrEmpty(TaxRegIDType)) targetURI += '&TaxRegIDType=' + TaxRegIDType
    if (!this._isNullOrEmpty(TaxRegID)) targetURI += '&TaxRegID=' + TaxRegID
    if (!this._isNullOrEmpty(TaxRegIDYN)) targetURI += '&TaxRegIDYN=' + TaxRegIDYN
    if (!this._isNullOrEmpty(SearchString)) targetURI += '&SearchString=' + encodeURIComponent(SearchString)
    if (!this._isNullOrEmpty(Page)) targetURI += '&Page=' + Page
    if (!this._isNullOrEmpty(PerPage)) targetURI += '&PerPage=' + PerPage
    if (!this._isNullOrEmpty(Order)) targetURI += '&Order=' + Order

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'search', function(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, Page, PerPage, Order, success, error) {
    this.search(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, Page, PerPage, Order, '', success, error)
})

BaseService.addMethod(HTTaxinvoiceService.prototype, 'search', function(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, Page, PerPage, Order, UserID, success, error) {
    this.search(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, Page, PerPage, Order, UserID, '', success, error)
})

HTTaxinvoiceService.prototype.summary = function(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, UserID, SearchString, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    if (this._isNullOrEmpty(JobID)) {
        this._throwError('작업아이디(jobID) 입력되지 않았습니다.', error)
        return
    }

    if (JobID.length !== 18) {
        this._throwError('작업아이디(jobID)가 올바르지 않습니다.', error)
        return;
    }

    var targetURI = '/HomeTax/Taxinvoice/' + JobID + '/Summary' + '?Type='
    if (!this._isNullOrEmpty(Type)) targetURI += Type.toString()
    if (!this._isNullOrEmpty(TaxType)) targetURI += '&TaxType=' + TaxType.toString()
    if (!this._isNullOrEmpty(PurposeType)) targetURI += '&PurposeType=' + PurposeType.toString()
    if (!this._isNullOrEmpty(TaxRegIDType)) targetURI += '&TaxRegIDType=' + TaxRegIDType
    if (!this._isNullOrEmpty(TaxRegID)) targetURI += '&TaxRegID=' + TaxRegID
    if (!this._isNullOrEmpty(TaxRegIDYN)) targetURI += '&TaxRegIDYN=' + TaxRegIDYN
    if (!this._isNullOrEmpty(SearchString)) targetURI += '&SearchString=' + encodeURIComponent(SearchString)

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'summary', function(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, success, error) {
    this.summary(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, '', success, error)
})

BaseService.addMethod(HTTaxinvoiceService.prototype, 'summary', function(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, UserID, success, error) {
    this.summary(CorpNum, JobID, Type, TaxType, PurposeType, TaxRegIDType, TaxRegIDYN, TaxRegID, UserID, '', success, error)
})

HTTaxinvoiceService.prototype.getTaxinvoice = function(CorpNum, NTSConfirmNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    if (this._isNullOrEmpty(NTSConfirmNum)) {
        this._throwError('국세청승인번호(NTSConfirmNum) 입력되지 않았습니다.', error)
        return
    }

    if (NTSConfirmNum.length !== 24) {
        this._throwError('국세청승인번호(NTSConfirmNum)가 올바르지 않습니다.', error)
    }

    this._executeAction({
        uri: '/HomeTax/Taxinvoice/' + NTSConfirmNum,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'getTaxinvoice', function(CorpNum, NTSConfirmNum, success, error) {
    this.getTaxinvoice(CorpNum, NTSConfirmNum, '', success, error)
})

HTTaxinvoiceService.prototype.getXML = function(CorpNum, NTSConfirmNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    if (this._isNullOrEmpty(NTSConfirmNum)) {
        this._throwError('국세청승인번호가 입력되지 않았습니다..', error)
        return;
    }

    if (NTSConfirmNum.length !== 24) {
        this._throwError('국세청승인번호(NTSConfirmNum)가 올바르지 않습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Taxinvoice/' + NTSConfirmNum + '?T=xml',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'getXML', function(CorpNum, NTSConfirmNum, success, error) {
    this.getXML(CorpNum, NTSConfirmNum, '', success, error)
})

HTTaxinvoiceService.prototype.getFlatRatePopUpURL = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/HomeTax/Taxinvoice?TG=CHRG',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response.url)
        },
        error: error,
    })
}


BaseService.addMethod(HTTaxinvoiceService.prototype, 'getFlatRatePopUpURL', function(CorpNum, success, error) {
    this.getFlatRatePopUpURL(CorpNum, '', success, error)
})

HTTaxinvoiceService.prototype.getCertificatePopUpURL = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/HomeTax/Taxinvoice?TG=CERT',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'getCertificatePopUpURL', function(CorpNum, success, error) {
    this.getCertificatePopUpURL(CorpNum, '', success, error)
})

HTTaxinvoiceService.prototype.getFlatRateState = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/HomeTax/Taxinvoice/Contract',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'getFlatRateState', function(CorpNum, success, error) {
    this.getFlatRateState(CorpNum, '', success, error)
})

HTTaxinvoiceService.prototype.getCertificateExpireDate = function(CorpNum, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/HomeTax/Taxinvoice/CertInfo',
        CorpNum: CorpNum,
        success: function(response) {
            if (success) success(response.certificateExpiration)
        },
        error: error,
    })
}

HTTaxinvoiceService.prototype.checkCertValidation = function(CorpNum, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/HomeTax/Taxinvoice/CertCheck',
        CorpNum: CorpNum,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

HTTaxinvoiceService.prototype.checkDeptUser = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Taxinvoice/DeptUser',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'checkDeptUser', function(CorpNum, success, error) {
    this.checkDeptUser(CorpNum, '', success, error);
});

HTTaxinvoiceService.prototype.registDeptUser = function(CorpNum, DeptUserID, DeptUserPWD, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    if (this._isNullOrEmpty(DeptUserID)) {
        this._throwError('홈택스 전자세금계산서 부서사용자 아이디가 입력되지 않았습니다.', error)
        return
    }
    if (this._isNullOrEmpty(DeptUserPWD)) {
        this._throwError('홈택스 전자세금계산서 부서사용자 비밀번호가 입력되지 않았습니다.', error)
        return
    }

    var req = {
        id: DeptUserID,
        pwd: DeptUserPWD,
    }
    var postData = this._stringify(req)

    this._executeAction({
        uri: '/HomeTax/Taxinvoice/DeptUser',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'registDeptUser', function(CorpNum, DeptUserID, DeptUserPWD, success, error) {
    this.registDeptUser(CorpNum, DeptUserID, DeptUserPWD, '', success, error)
})

HTTaxinvoiceService.prototype.checkLoginDeptUser = function(CorpNum, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/HomeTax/Taxinvoice/DeptUser/Check',
        CorpNum: CorpNum,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

HTTaxinvoiceService.prototype.deleteDeptUser = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/HomeTax/Taxinvoice/DeptUser',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'DELETE',
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'deleteDeptUser', function(CorpNum, success, error) {
    this.deleteDeptUser(CorpNum, '', success, error)
})

HTTaxinvoiceService.prototype.getPopUpURL = function(CorpNum, NTSConfirmNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    if (this._isNullOrEmpty(NTSConfirmNum)) {
        this._throwError('국세청승인번호가 입력되지 않았습니다.', error)
        return
    }

    if (NTSConfirmNum.length !== 24) {
        this._throwError('국세청승인번호가 올바르지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Taxinvoice/' + NTSConfirmNum + '/PopUp',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'getPopUpURL', function(CorpNum, NTSConfirmNum, success, error) {
    this.getPopUpURL(CorpNum, NTSConfirmNum, '', success, error)
})

HTTaxinvoiceService.prototype.getPrintURL = function(CorpNum, NTSConfirmNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }
    if (this._isNullOrEmpty(NTSConfirmNum)) {
        this._throwError('국세청승인번호가 입력되지 않았습니다.', error)
        return
    }

    if (NTSConfirmNum.length !== 24) {
        this._throwError('국세청승인번호가 올바르지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/HomeTax/Taxinvoice/' + NTSConfirmNum + '/Print',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(HTTaxinvoiceService.prototype, 'getPrintURL', function(CorpNum, NTSConfirmNum, success, error) {
    this.getPrintURL(CorpNum, NTSConfirmNum, '', success, error)
})