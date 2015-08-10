var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = ClosedownService;
Util.inherits(ClosedownService,BaseService);

function ClosedownService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('170');
};

ClosedownService.prototype.getUnitCost = function(CorpNum,success,error) {
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/CloseDown/UnitCost',
    CorpNum : CorpNum,
    success : function(response){
      if(success) success(response.unitCost);
    },
    error : error
  });
};

ClosedownService.prototype.checkCorpNum = function(UserCorpNum, CheckCorpNum, success, error){
  if(!UserCorpNum || 0 === UserCorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  if(!CheckCorpNum || 0 === CheckCorpNum.length) {
    this._throwError(-99999999,'조회할 사업자번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/CloseDown?CN=' + CheckCorpNum,
    CorpNum : UserCorpNum, 
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
};

ClosedownService.prototype.checkCorpNums = function(UserCorpNum, CorpNumList, success, error){
  if(!UserCorpNum || 0 === UserCorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  if(!CorpNumList || 0 === CorpNumList.length) {
    this._throwError(-99999999,'조회할 사업자번호배열이 입력되지 않았습니다.',error);
    return;
  }

  var postData = this._stringify(CorpNumList)
  
  this._executeAction({
    uri : '/CloseDown',
    CorpNum : UserCorpNum, 
    Data : postData,
    Method : 'POST',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
};
