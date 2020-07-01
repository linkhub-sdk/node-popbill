var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = AccountCheckService;
Util.inherits(AccountCheckService,BaseService);

function AccountCheckService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('182');
};

BaseService.addMethod(AccountCheckService.prototype, 'getChargeInfo', function(CorpNum, success, error){
  this.getChargeInfo(CorpNum, '', success, error);
});

BaseService.addMethod(AccountCheckService.prototype, 'getChargeInfo', function(CorpNum, UserID, success, error) {
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/EasyFin/AccountCheck/ChargeInfo',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

AccountCheckService.prototype.getUnitCost = function(CorpNum,success,error) {
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/EasyFin/AccountCheck/UnitCost',
    CorpNum : CorpNum,
    success : function(response){
      if(success) success(response.unitCost);
    },
    error : error
  });
};

BaseService.addMethod(AccountCheckService.prototype, "checkAccountInfo", function (CorpNum, BankCode, AccountNumber, success, error) {
    this.checkAccountInfo(CorpNum, BankCode, AccountNumber, "", success, error);
});

BaseService.addMethod(AccountCheckService.prototype, "checkAccountInfo", function (CorpNum, BankCode, AccountNumber, UserID, success, error) {

    if(!BankCode || 0 === BankCode.length) {
      this._throwError(-99999999,'기관코드가 입력되지 않았습니다.',error);
      return;
    }

    if(!AccountNumber || 0 === AccountNumber.length) {
      this._throwError(-99999999,'계좌번호가 입력되지 않았습니다.',error);
      return;
    }

    targetURI = '/EasyFin/AccountCheck'
    targetURI += '?c=' + BankCode;
    targetURI += '&n=' + encodeURIComponent(AccountNumber);

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
