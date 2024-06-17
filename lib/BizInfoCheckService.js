var Util = require('util')
var BaseService = require('./BaseService')

module.exports = BizInfoCheckService
Util.inherits(BizInfoCheckService, BaseService)

function BizInfoCheckService(configs) {
    BaseService.call(this, configs)
    this._scopes.push('171')
}

BizInfoCheckService.prototype.getChargeInfo = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/BizInfo/ChargeInfo',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(BizInfoCheckService.prototype, 'getChargeInfo', function(CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', success, error)
})

BizInfoCheckService.prototype.getUnitCost = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/BizInfo/UnitCost',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response.unitCost)
        },
        error: error,
    })
}

BaseService.addMethod(BizInfoCheckService.prototype, 'getUnitCost', function(CorpNum, success, error) {
    this.getUnitCost(CorpNum, '', success, error)

})

BizInfoCheckService.prototype.checkBizInfo = function(CorpNum, CheckCorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(CheckCorpNum)) {
        this._throwError('조회할 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/BizInfo/Check?CN=' + CheckCorpNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(BizInfoCheckService.prototype, 'checkBizInfo', function(CorpNum, CheckCorpNum, success, error) {
    this.checkBizInfo(CorpNum, CheckCorpNum, '', success, error)
})