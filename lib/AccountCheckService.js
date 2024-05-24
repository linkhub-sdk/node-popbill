var Util = require('util')
var BaseService = require('./BaseService')

module.exports = AccountCheckService
Util.inherits(AccountCheckService, BaseService)

function AccountCheckService(configs) {
    BaseService.call(this, configs)
    this._scopes.push('182', '183')
}

AccountCheckService.prototype.getChargeInfo = function (CorpNum, serviceType, UserID, success, error) {
    var uri = '/EasyFin/AccountCheck/ChargeInfo'
    if (!this._isNullOrEmpty(serviceType)){
        uri += '?serviceType=' + encodeURIComponent(serviceType)
    }
    this._executeAction({
        uri: uri,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(AccountCheckService.prototype, 'getChargeInfo', function (CorpNum, UserID, success, error) {
    this.getChargeInfo(CorpNum, '', UserID, success, error)
})

BaseService.addMethod(AccountCheckService.prototype, 'getChargeInfo', function (CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', '', success, error)
})

AccountCheckService.prototype.getUnitCost = function (CorpNum, ServiceType, UserID, success, error) {
    this._executeAction({
        uri: '/EasyFin/AccountCheck/UnitCost?serviceType=' + encodeURIComponent(ServiceType),
        CorpNum: CorpNum,
        success: function (response) {
            if (success) success(response.unitCost)
        },
        error: error,
    })
}

BaseService.addMethod(AccountCheckService.prototype, 'getUnitCost', function (CorpNum, ServiceType, success, error) {
    this.getUnitCost(CorpNum, ServiceType, null, success, error)
})

BaseService.addMethod(AccountCheckService.prototype, 'getUnitCost', function (CorpNum, success, error) {
    this.getUnitCost(CorpNum, null, null, success, error)
})

AccountCheckService.prototype.checkAccountInfo = function (CorpNum, BankCode, AccountNumber, UserID, success, error) {
    if (!this._isNullOrEmpty(BankCode)) {
        this._throwError(-99999999, '기관코드가 입력되지 않았습니다.', error)
        return
    }

    if (4 !== BankCode.length) {
        this._throwError(-99999999, '기관코드가 올바르지 않습니다.', error)
        return
    }

    if (!this._isNullOrEmpty(AccountNumber)) {
        this._throwError(-99999999, '계좌번호가 입력되지 않았습니다.', error)
        return
    }

    var targetURI = '/EasyFin/AccountCheck'
    targetURI += '?c=' + BankCode
    targetURI += '&n=' + encodeURIComponent(AccountNumber)

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(AccountCheckService.prototype, 'checkAccountInfo', function (CorpNum, BankCode, AccountNumber, success, error) {
    this.checkAccountInfo(CorpNum, BankCode, AccountNumber, '', success, error)
})

AccountCheckService.prototype.checkDepositorInfo = function (CorpNum, BankCode, AccountNumber, IdentityNumType, IdentityNum, UserID, success, error) {
    if (this._isNullOrEmpty(BankCode)) {
        this._throwError(-99999999, '기관코드가 입력되지 않았습니다.', error)
        return
    }

    if (4 !== BankCode.length) {
        this._throwError(-99999999, '기관코드가 올바르지 않습니다.', error)
        return
    }

    if (this._isNullOrEmpty(AccountNumber)) {
        this._throwError(-99999999, '계좌번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(IdentityNumType)) {
        this._throwError(-99999999, '등록번호 유형이 입력되지 않았습니다.', error)
        return
    }

    if (false === /^[PB]$/.test(IdentityNumType)) {
        this._throwError(-99999999, '올바른 등록번호 유형이 아닙니다.', error)
        return
    }

    if (this._isNullOrEmpty(IdentityNum)) {
        this._throwError(-99999999, '등록번호가 입력되지 않았습니다.', error)
        return
    }

    if (false === /^\d+$/.test(IdentityNum)) {
        this._throwError(-99999999, '등록번호는 숫자만 입력 가능합니다.', error)
        return
    }

    var targetURI = '/EasyFin/DepositorCheck'
    targetURI += '?c=' + BankCode
    targetURI += '&n=' + encodeURIComponent(AccountNumber)
    targetURI += '&t=' + encodeURIComponent(IdentityNumType)
    targetURI += '&p=' + encodeURIComponent(IdentityNum)

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(AccountCheckService.prototype, 'checkDepositorInfo', function (CorpNum, BankCode, AccountNumber, IdentityNumType, IdentityNum, success, error) {
    this.checkDepositorInfo(CorpNum, BankCode, AccountNumber, IdentityNumType, IdentityNum, '', success, error)
})
