var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = FaxService;
Util.inherits(FaxService,BaseService);

function FaxService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('160');
};

FaxService.prototype.getChargeInfo = function(CorpNum, UserID, success, error) {
  this._executeAction({
    uri : '/FAX/ChargeInfo',
    CorpNum : CorpNum,
    UserID : UserID,
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
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

BaseService.addMethod(FaxService.prototype, "sendFax", function(CorpNum, Sender, SenderName, Receiver, ReceiverName, FilePaths, ReserveDT, success, error){
  var options = {
    SenderNum : Sender,
    SenderName : SenderName,
    Receiver : Receiver,
    ReceiverName : ReceiverName,
    FilePaths : FilePaths,
    ReserveDT : ReserveDT
  }
  this.sendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFax", function(CorpNum, Sender, SenderName, Receivers, FilePaths, ReserveDT, success, error){
  var options = {
      SenderNum : Sender,
      SenderName : SenderName,
      FilePaths : FilePaths,
      Receiver : Receivers,
      ReserveDT : ReserveDT
  }
  this.sendFax(CorpNum, options, success, error);
});


BaseService.addMethod(FaxService.prototype, "sendFax", function(CorpNum,options,success,error) {
  if(!options) {
    this._throwError(-99999999,"전송 정보가 입력되지 않았습니다.",error);
    return;
  }
  if(!options.FilePaths) {
    this._throwError(-99999999,"전송할 파일목록이 입력되지 않았습니다.",error);
    return;
  }

  var req = {
    snd : options.SenderNum,
    sndnm : options.SenderName,
    fCnt : typeof options.FilePaths === 'string' ?  1 : options.FilePaths.length,
    sndDT : options.ReserveDT,
    rcvs : []
  };

  if(typeof options.Receiver === 'string') {
    req.rcvs.push({rcv : options.Receiver,rcvnm : options.ReceiverName,});
  } else if(Array.isArray(options.Receiver)) {
    for(var i in options.Receiver) {
      req.rcvs.push({rcv : options.Receiver[i].receiveNum , rcvnm : options.Receiver[i].receiveName});
    }
  } else {
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
      if(success) success(response.receiptNum);
    },
    error : error
  });
});

FaxService.prototype.getFaxResult = function(CorpNum, ReceiptNum, success, error){
  if(!ReceiptNum || 0 === ReceiptNum.length) {
    this._throwError(-99999999,'접수번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/FAX/' + ReceiptNum,
    CorpNum : CorpNum,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

FaxService.prototype.getURL = function(CorpNum, TOGO, UserID, success, error){
  this._executeAction({
    uri : '/FAX/?TG=' + TOGO,
    CorpNum : CorpNum,
    UserID : UserID,
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    },
    error : error
  });
};

FaxService.prototype.cancelReserve = function(CorpNum, ReceiptNum, success, error){
  if(!ReceiptNum || 0 === ReceiptNum.length) {
    this._throwError(-99999999,'접수번호가 입력되지 않았습니다.',error);
    return;
  }

  this._executeAction({
    uri : '/FAX/' + ReceiptNum + '/Cancel',
    CorpNum : CorpNum,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
};

FaxService.prototype.search = function(CorpNum, SDate, EDate, State, ReserveYN, SenderOnly, Order, Page, PerPage, success, error){
  if(!SDate || 0 === SDate.length) {
    this._throwError(-99999999,'시작일자가 입력되지 않았습니다.',error);
    return;
  }

  if(!EDate || 0 === EDate.length) {
    this._throwError(-99999999,'시작일자가 입력되지 않았습니다.',error);
    return;
  }

  targetURI = '/FAX/Search?SDate=' + SDate;
  targetURI += '&EDate=' + EDate;
  targetURI += '&State=' + State.toString();

  if ( ReserveYN )
    targetURI += '&ReserveYN=1';
  if ( SenderOnly )
    targetURI += '&SenderOnly=1';

  targetURI += '&Order=' + Order;
  targetURI += '&Page=' + Page;
  targetURI += '&PerPage=' + PerPage;

  this._executeAction({
    uri : targetURI,
    CorpNum : CorpNum,
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    },
    error : error
  });
}
