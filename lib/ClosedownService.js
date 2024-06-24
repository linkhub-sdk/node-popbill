var Util = require('util')
var BaseService = require('./BaseService')

module.exports = ClosedownService
Util.inherits(ClosedownService, BaseService)

function ClosedownService(configs) {
    BaseService.call(this, configs)
    this._scopes.push('170')
}

ClosedownService.prototype.getChargeInfo = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }


    this._executeAction({
        uri: '/CloseDown/ChargeInfo',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(ClosedownService.prototype, 'getChargeInfo', function(CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', success, error)
})

ClosedownService.prototype.getUnitCost = function(CorpNum, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }


    this._executeAction({
        uri: '/CloseDown/UnitCost',
        CorpNum: CorpNum,
        success: function(response) {
            if (success) success(response.unitCost)
        },
        error: error,
    })
}

ClosedownService.prototype.checkCorpNum = function(CorpNum, CheckCorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(CheckCorpNum)) {
        this._throwError('조회할 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/CloseDown?CN=' + CheckCorpNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(ClosedownService.prototype, 'checkCorpNum', function(CorpNum, CheckCorpNum, success, error) {
    this.checkCorpNum(CorpNum, CheckCorpNum, null, success, error)
})

ClosedownService.prototype.checkCorpNums = function(CorpNum, CorpNumList, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(CorpNumList)) {
        this._throwError('조회할 사업자번호배열이 입력되지 않았습니다.', error)
        return
    }

    var postData = this._stringify(CorpNumList)

    this._executeAction({
        uri: '/CloseDown',
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

BaseService.addMethod(ClosedownService.prototype, 'checkCorpNums', function(CorpNum, CorpNumList, success, error) {
    this.checkCorpNums(CorpNum, CorpNumList, null, success, error)
})