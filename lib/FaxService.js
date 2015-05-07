var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = FaxService;
Util.inherits(FaxService,BaseService);

function FaxService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('160');
};

FaxService.prototype.getUnitCost = function(CorpNum,success,error) {
  this._executeAction({
    uri : '/FAX/UnitCost',
    CorpNum : CorpNum,
    success : function(response){
      if(success) success(response.unitCost);
    },
    error : error
  });
};

FaxService.prototype.sendFax = function(CorpNum,options,callback,err) {

  if(!options) {
    this._throwError(-99999999,"전송 정보가 입력되지 않았습니다.",err);
    return;
  }
  if(!options.FilePaths) {
    this._throwError(-99999999,"전송할 파일목록이 입력되지 않았습니다.",err);
    return;
  }

  var req = {
    snd : options.SenderNum,
    fCnt : typeof options.FilePaths === 'string' ?  1 : options.FilePaths.length,
    sndDT : options.ReserveDT,
    rcvs : []
  };

  if(typeof options.Receiver === 'string') {
    req.rcvs.push({rcvnm : options.Receiver});
  }
  else if(Array.isArray(options.Receiver)) {
    for(var i in options.Receiver) {
      if(typeof options.Receiver[i] === 'string')
        req.rcvs.push({rcvnm : options.Receiver[i]});
      else
        req.rcvs.push({rcv : options.Receiver[i].receiveName , rcvnm : options.Receiver[i].receiveNum});
    }
  }
  else {
    req.rcvs.push({rcv : options.Receiver.receiveName , rcvnm : options.Receiver.receiveNum});
  }

  var postData = this._stringify(req);
  
  var files = [];

  for(var i in options.FilePaths) {
    files.push({
      fieldName : 'file',
      fileName : options.FilePaths[i]
    });
  }

  this._executeAction({
    uri : '/FAX',
    Method : 'POST',
    CorpNum : CorpNum,
    UserID : options.UserID,
    Data : postData,
    Files : files,
    success : function(response){
      if(callback) callback(response.receiptNum);
    },
    error : err
  });
};