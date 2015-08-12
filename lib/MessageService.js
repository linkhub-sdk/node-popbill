var Util         = require('util');
var BaseService = require('./BaseService');

module.exports = MessageService;
Util.inherits(MessageService,BaseService);

function MessageService(configs) {
  BaseService.call(this,configs);
  this._scopes.push('150');
  this._scopes.push('151');
  this._scopes.push('152');
};

MessageService.prototype.getUnitCost = function(CorpNum,MessageType,success,error) {
  if(!MessageType || 0 === MessageType.length) {
    this._throwError(-99999999,'메시지 유형이 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/Message/UnitCost?Type=' + MessageType,
    CorpNum : CorpNum,
    success : function(response){
      if(success) success(response.unitCost);
    },
    error : error
  });
};

MessageService.prototype.getURL = function(CorpNum, TOGO, UserID, success, error){
  this._executeAction({
    uri : '/Message/?TG=' + TOGO,
    CorpNum : CorpNum, 
    UserID : UserID, 
    Method : 'GET',
    success : function(response){
      if(success) success(response.url);
    }, 
    error : error
  });
}

MessageService.prototype.sendSMS = function(CorpNum, Sender, Receiver, ReceiverName, Contents, reserveDT, success, error){
  var Messages = {
      Sender : Sender,
      Receiver : Receiver, 
      ReceiverName : ReceiverName,
      Contents : Contents
  };

  this.sendMessage('SMS', CorpNum, '', '', '', Messages, reserveDT, success, error);
};

MessageService.prototype.sendSMS_multi = function(CorpNum, Sender, Contents, Messages, reserveDT, success, error){
  this.sendMessage('SMS', CorpNum, Sender, '', Contents, Messages, reserveDT, success, error);
};

MessageService.prototype.sendLMS = function(CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, reserveDT, success, error){
  var Messages = {
      Sender : Sender,
      Receiver : Receiver, 
      ReceiverName : ReceiverName,
      Subject : Subject,
      Contents : Contents
  };

  this.sendMessage('LMS', CorpNum, '', '', '', Messages, reserveDT, success, error);
};

MessageService.prototype.sendLMS_multi =  function(CorpNum, Sender, Subject, Contents, Messages, reserveDT, success, error){
  this.sendMessage('LMS', CorpNum, Sender, Subject, Contents, Messages, reserveDT, success, error);
};

MessageService.prototype.sendXMS = function(CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, reserveDT, success, error){
  var Messages = {
      Sender : Sender,
      Receiver : Receiver, 
      ReceiverName : ReceiverName,
      Subject : Subject,
      Contents : Contents
  };

  this.sendMessage('XMS', CorpNum, '', '', '', Messages, reserveDT, success, error);
}

MessageService.prototype.sendXMS_multi = function(CorpNum, Sender, Subject, Contents, Messages, reserveDT, success, error){
  this.sendMessage('XMS', CorpNum, Sender, Subject, Contents, Messages, reserveDT, success, error);
};

MessageService.prototype.sendMessage = function(MsgType, CorpNum, Sender, Subject, Contents, Messages, reserveDT, success, error){
  if(!MsgType || 0 === MsgType.length) {
    this._throwError(-99999999,'메시지 유형이 입력되지 않았습니다.',error);
    return;
  }
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }
  if(!Messages || 0 === Messages.length) {
    this._throwError(-99999999,'전송할 메시지가 입력되 않았습니다.',error);
    return;
  }

  var req = {
    snd : Sender, 
    content : Contents,
    subject : Subject,
    sndDT : reserveDT,
    msgs : [],
  }

  if(Array.isArray(Messages)){
    for(var i in Messages){
      req.msgs.push({
        snd : Messages[i].Sender,
        rcv : Messages[i].Receiver,
        rcvnm : Messages[i].ReceiverName,
        msg : Messages[i].Contents,
        sjt : Messages[i].Subject,
      });
    }
  } else {
    req.msgs.push({
      snd : Messages.Sender,
      rcv : Messages.Receiver,
      rcvnm : Messages.ReceiverName,
      msg : Messages.Contents,
      sjt : Messages.Subject,
    });
  }

  var postData = this._stringify(req);
  this._executeAction({
    uri : '/' + MsgType,
    CorpNum : CorpNum,
    Data : postData,
    Method : 'POST',
    success : function(response){
      if(success) success(response.receiptNum);
    },
    error : error
  });
}

MessageService.prototype.sendMMS = function(CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, FilePaths, reserveDT, success, error){
  var Messages = {
      Sender : Sender,
      Receiver : Receiver, 
      ReceiverName : ReceiverName,
      Subject : Subject,
      Contents : Contents
  };

  this.sendMessage_MMS(CorpNum, '', '', '', Messages, FilePaths, reserveDT, success, error);
};

MessageService.prototype.sendMMS_multi = function(CorpNum, Sender, Subject, Contents, Messages, FilePaths, reserveDT, success, error){
  this.sendMessage_MMS(CorpNum, Sender, Subject, Contents, Messages, FilePaths, reserveDT, success, error);
};


MessageService.prototype.sendMessage_MMS = function(CorpNum, Sender, Subject, Contents, Messages, FilePaths, reserveDT, success, error){
  if(!CorpNum || 0 === CorpNum.length) {
    this._throwError(-99999999,'팝빌회원 사업자번호가 입력되지 않았습니다.',error);
    return;
  }

  if(!Messages || 0 === Messages.length) {
    this._throwError(-99999999,'전송할 메시지가 입력되 않았습니다.',error);
    return;
  }

  var req = {
    snd : Sender, 
    content : Contents,
    subject : Subject,
    sndDT : reserveDT,
    msgs : [],
  }

  if(Array.isArray(Messages)){
    for(var i in Messages){
      req.msgs.push({
        snd : Messages[i].Sender,
        rcv : Messages[i].Receiver,
        rcvnm : Messages[i].ReceiverName,
        msg : Messages[i].Contents,
        sjt : Messages[i].Subject,
      });
    }
  } else {
    req.msgs.push({
      snd : Messages.Sender,
      rcv : Messages.Receiver,
      rcvnm : Messages.ReceiverName,
      msg : Messages.Contents,
      sjt : Messages.Subject,
    });
  }

  var postData = this._stringify(req);

  var files = [];

  for(var i in FilePaths) {
    files.push({
      fieldName : 'file',
      fileName : FilePaths[i]
    });
  }

  this._executeAction({
    uri : '/MMS',
    CorpNum : CorpNum,
    Data : postData,
    Method : 'POST',
    Files : files,
    success : function(response){
      if(success) success(response.receiptNum);
    },
    error : error
  });  
}

MessageService.prototype.getMessages = function(CorpNum, ReceiptNum, success, error){
  if(!ReceiptNum || 0 === ReceiptNum.length) {
    this._throwError(-99999999,'접수번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/Message/' + ReceiptNum,
    CorpNum : CorpNum, 
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
}

MessageService.prototype.cancelReserve = function(CorpNum, ReceiptNum, success, error){
  if(!ReceiptNum || 0 === ReceiptNum.length) {
    this._throwError(-99999999,'접수번호가 입력되지 않았습니다.',error);
    return;
  }
  this._executeAction({
    uri : '/Message/' + ReceiptNum + '/Cancel',
    CorpNum : CorpNum, 
    Method : 'GET',
    success : function(response){
      if(success) success(response);
    }, 
    error : error
  });
}











