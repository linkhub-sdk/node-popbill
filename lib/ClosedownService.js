var Util = require('util');
var BaseService = require('./BaseService');

module.exports = ClosedownService;
Util.inherits(ClosedownService, BaseService);

function ClosedownService(configs) {
    BaseService.call(this, configs);
    this._scopes.push('170');
}

BaseService.addMethod(ClosedownService.prototype, 'getChargeInfo', function (CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', success, error);
});

BaseService.addMethod(ClosedownService.prototype, 'getChargeInfo', function (CorpNum, UserID, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/CloseDown/ChargeInfo',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

ClosedownService.prototype.getUnitCost = function (CorpNum, UserID, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/CloseDown/UnitCost',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.unitCost);
        },
        error: error
    });
};

BaseService.addMethod(ClosedownService.prototype, 'getUnitCost', function (CorpNum, success, error) {
    this.getUnitCost(CorpNum, '', success, error);
});

ClosedownService.prototype.checkCorpNum = function (CorpNum, CheckCorpNum, UserID, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }
    if (!CheckCorpNum || 0 === CheckCorpNum.length) {
        this._throwError(-99999999, '조회할 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/CloseDown?CN=' + CheckCorpNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

BaseService.addMethod(ClosedownService.prototype, 'checkCorpNum', function (CorpNum, CheckCorpNum, success, error) {
    this.checkCorpNum(CorpNum, CheckCorpNum, '', success, error);
});

ClosedownService.prototype.checkCorpNums = function (UserCorpNum, CorpNumList, UserID, success, error) {
    if (!UserCorpNum || 0 === UserCorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }
    if (!CorpNumList || 0 === CorpNumList.length) {
        this._throwError(-99999999, '조회할 사업자번호배열이 입력되지 않았습니다.', error);
        return;
    }

    var postData = this._stringify(CorpNumList)

    this._executeAction({
        uri: '/CloseDown',
        CorpNum: UserCorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(ClosedownService.prototype, 'checkCorpNums', function (CorpNum, CheckCorpNum, success, error) {
    this.checkCorpNums(CorpNum, CheckCorpNum, '', success, error);
});