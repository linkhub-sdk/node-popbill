var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = BizInfoCheckService;
Util.inherits(BizInfoCheckService,BaseService);

function BizInfoCheckService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('171');
};

BaseService.addMethod(BizInfoCheckService.prototype, 'getChargeInfo', function(CorpNum, success, error){
  this.getChargeInfo(CorpNum, '', success, error);
});

BaseService.addMethod(BizInfoCheckService.prototype, 'getChargeInfo', function(CorpNum, UserID, success, error) {
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/BizInfo/ChargeInfo',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

BaseService.addMethod(BizInfoCheckService.prototype,'getUnitCost', function(CorpNum,success,error) {
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/BizInfo/UnitCost',
    CorpNum : CorpNum,
    success : function(response){
      if(success) success(response.unitCost);
    },
    error : error
  });
});

BaseService.addMethod(BizInfoCheckService.prototype,'checkBizInfo' , function(MemberCorpNum, CheckCorpNum, success, error){
    this.checkBizInfo(MemberCorpNum, CheckCorpNum, '', success, error)
});

BaseService.addMethod(BizInfoCheckService.prototype,'checkBizInfo', function(MemberCorpNum, CheckCorpNum, UserID, success, error){
  if(!MemberCorpNum || 0 === MemberCorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  if(!CheckCorpNum || 0 === CheckCorpNum.length) {
    this._throwError(-99999999,'조회할 사업자번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/BizInfo/Check?CN=' + CheckCorpNum,
    CorpNum : MemberCorpNum,
    UserID: UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
});

