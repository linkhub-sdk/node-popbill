var Util = require('util');
var BaseService = require('./BaseService');

module.exports = MessageService;
Util.inherits(MessageService, BaseService);

function MessageService(configs) {
    BaseService.call(this, configs);
    this._scopes.push('150');
    this._scopes.push('151');
    this._scopes.push('152');
}

MessageService.prototype.getChargeInfo = function (CorpNum, MessageType, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(MessageType)) {
        this._throwError('메시지 유형이 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/Message/ChargeInfo?Type=' + MessageType,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'getChargeInfo', function (CorpNum, MessageType, success, error) {
    this.getChargeInfo(CorpNum, MessageType, '', success, error);
});

MessageService.prototype.getUnitCost = function (CorpNum, MessageType, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(MessageType)) {
        this._throwError('메시지 유형이 입력되지 않았습니다.', error);
        return;
    }

    if (!/^[SLM]MS$/.test(MessageType)){
        this._throwError('메시지 유형이 올바르지 않습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Message/UnitCost?Type=' + MessageType,
        CorpNum: CorpNum,
        success: function (response) {
            if (success) success(response.unitCost);
        },
        error: error
    });
}

MessageService.prototype.getURL = function (CorpNum, TOGO, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(TOGO)) {
        this._throwError('접근 메뉴가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Message/?TG=' + TOGO,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'getURL', function (CorpNum, TOGO, success, error) {
    this.getURL(CorpNum, TOGO, '', success, error);
});

MessageService.prototype.getSentListURL = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Message/?TG=BOX',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
};

BaseService.addMethod(MessageService.prototype, 'getSentListURL', function(CorpNum, success, error) {
    this.getSentListURL(CorpNum, '', success, error);
});

MessageService.prototype.getSenderNumberMgtURL = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Message/?TG=SENDER',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
};

BaseService.addMethod(MessageService.prototype, 'getSenderNumberMgtURL', function(CorpNum, success, error) {
    this.getSenderNumberMgtURL(CorpNum, '', success, error);
});

MessageService.prototype.checkSenderNumber = function (CorpNum, SenderNumber, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(SenderNumber)) {
        this._throwError('확인할 발신번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/Message/CheckSenderNumber/' + SenderNumber,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'checkSenderNumber', function (CorpNum, SenderNumber, success, error) {
    this.checkSenderNumber(CorpNum, SenderNumber, '', success, error);
});

MessageService.prototype.sendMessage = function (MsgType, CorpNum, Sender, SenderName, Subject, Contents, Messages, reserveDT, adsYN, requestNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    var req = {
        snd: Sender,
        sndnm: SenderName,
        adsYN: adsYN,
        content: Contents,
        subject: Subject,
        sndDT: reserveDT,
        requestNum: requestNum,
        msgs: [],
    }

    if (Array.isArray(Messages)) {
        for (var i in Messages) {
            req.msgs.push({
                snd: Messages[i].Sender,
                sndnm: Messages[i].SenderName,
                rcv: Messages[i].Receiver,
                rcvnm: Messages[i].ReceiverName,
                msg: Messages[i].Contents,
                sjt: Messages[i].Subject,
                interOPRefKey: Messages[i].interOPRefKey
            });
        }
    } else {
        req.msgs.push({
            snd: Messages.Sender,
            sndnm: Messages.SenderName,
            rcv: Messages.Receiver,
            rcvnm: Messages.ReceiverName,
            msg: Messages.Contents,
            sjt: Messages.Subject,
            interOPRefKey: Messages.interOPRefKey
        });
    }

    var postData = this._stringify(req);
    this._executeAction({
        uri: '/' + MsgType,
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });
}

MessageService.prototype.sendSMS = function (CorpNum, Sender, Receiver, ReceiverName, Contents, reserveDT, adsYN, SenderName, requestNum, UserID, success, error) {
    var Messages = {
        Sender: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Contents: Contents
    };

    this.sendMessage('SMS', CorpNum, '', '', '', '', Messages, reserveDT, adsYN, requestNum, UserID, success, error);
}

BaseService.addMethod(MessageService.prototype, 'sendSMS', function (CorpNum, Sender, Receiver, ReceiverName, Contents, reserveDT, adsYN, SenderName, requestNum, success, error) {
    var Messages = {
        Sender: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Contents: Contents
    };

    this.sendMessage('SMS', CorpNum, '', '', '', '', Messages, reserveDT, adsYN, requestNum, '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendSMS', function (CorpNum, Sender, Receiver, ReceiverName, Contents, reserveDT, success, error) {
    var Messages = {
        Sender: Sender,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Contents: Contents
    };

    this.sendMessage('SMS', CorpNum, '', '', '', '', Messages, reserveDT, false, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendSMS', function (CorpNum, Sender, Receiver, ReceiverName, Contents, reserveDT, adsYN, success, error) {
    var Messages = {
        Sender: Sender,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Contents: Contents
    };

    this.sendMessage('SMS', CorpNum, '', '', '', '', Messages, reserveDT, adsYN, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendSMS', function (CorpNum, Sender, Receiver, ReceiverName, Contents, reserveDT, adsYN, SenderName, success, error) {
    var Messages = {
        Sender: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Contents: Contents
    };

    this.sendMessage('SMS', CorpNum, '', '', '', '', Messages, reserveDT, adsYN, '', '', success, error);
});

MessageService.prototype.sendSMS_multi = function (CorpNum, Sender, Contents, Messages, reserveDT, adsYN, requestNum, SenderName, UserID, success, error) {
    this.sendMessage('SMS', CorpNum, Sender, SenderName, '', Contents, Messages, reserveDT, adsYN, requestNum, UserID, success, error);
}

BaseService.addMethod(MessageService.prototype, 'sendSMS_multi', function (CorpNum, Sender, Contents, Messages, reserveDT, success, error) {
    this.sendMessage('SMS', CorpNum, Sender, '', '', Contents, Messages, reserveDT, false, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendSMS_multi', function (CorpNum, Sender, Contents, Messages, reserveDT, adsYN, success, error) {
    this.sendMessage('SMS', CorpNum, Sender, '', '', Contents, Messages, reserveDT, adsYN, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendSMS_multi', function (CorpNum, Sender, Contents, Messages, reserveDT, adsYN, requestNum, success, error) {
    this.sendMessage('SMS', CorpNum, Sender, '', '', Contents, Messages, reserveDT, adsYN, requestNum, '', success, error);
});
BaseService.addMethod(MessageService.prototype, 'sendSMS_multi', function (CorpNum, Sender, Contents, Messages, reserveDT, adsYN, requestNum, SenderName, success, error) {
    this.sendMessage('SMS', CorpNum, Sender, SenderName, '', Contents, Messages, reserveDT, adsYN, requestNum, '', success, error);
});



MessageService.prototype.sendLMS = function(CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, reserveDT, adsYN, SenderName, requestNum, UserID, success, error) {
    var Messages = {
        Sender: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Subject: Subject,
        Contents: Contents
    };

    this.sendMessage('LMS', CorpNum, '', '', '', '', Messages, reserveDT, adsYN, requestNum, UserID, success, error);
}

BaseService.addMethod(MessageService.prototype, 'sendLMS', function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, reserveDT, success, error) {
    var Messages = {
        Sender: Sender,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Subject: Subject,
        Contents: Contents
    };

    this.sendMessage('LMS', CorpNum, '', '', '', '', Messages, reserveDT, false, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendLMS', function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, reserveDT, adsYN, success, error) {
    var Messages = {
        Sender: Sender,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Subject: Subject,
        Contents: Contents
    };

    this.sendMessage('LMS', CorpNum, '', '', '', '', Messages, reserveDT, adsYN, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendLMS', function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, reserveDT, adsYN, SenderName, success, error) {
    var Messages = {
        Sender: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Subject: Subject,
        Contents: Contents
    };

    this.sendMessage('LMS', CorpNum, '', '', '', '', Messages, reserveDT, adsYN, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendLMS', function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, reserveDT, adsYN, SenderName, requestNum, success, error) {
    var Messages = {
        Sender: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Subject: Subject,
        Contents: Contents
    };

    this.sendMessage('LMS', CorpNum, '', '', '', '', Messages, reserveDT, adsYN, requestNum, '', success, error);
});

MessageService.prototype.sendLMS_multi = function(CorpNum, Sender, Subject, Contents, Messages, reserveDT, adsYN, requestNum, SenderName, UserID, success, error){
    this.sendMessage('LMS', CorpNum, Sender, SenderName, Subject, Contents, Messages, reserveDT, adsYN, requestNum, UserID, success, error);
}

BaseService.addMethod(MessageService.prototype, 'sendLMS_multi', function (CorpNum, Sender, Subject, Contents, Messages, reserveDT, success, error) {
    this.sendMessage('LMS', CorpNum, Sender, '', Subject, Contents, Messages, reserveDT, false, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendLMS_multi', function (CorpNum, Sender, Subject, Contents, Messages, reserveDT, adsYN, success, error) {
    this.sendMessage('LMS', CorpNum, Sender, '', Subject, Contents, Messages, reserveDT, adsYN, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendLMS_multi', function (CorpNum, Sender, Subject, Contents, Messages, reserveDT, adsYN, requestNum, success, error) {
    this.sendMessage('LMS', CorpNum, Sender, '', Subject, Contents, Messages, reserveDT, adsYN, requestNum, '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendLMS_multi', function (CorpNum, Sender, Subject, Contents, Messages, reserveDT, adsYN, requestNum, SenderName, success, error) {
    this.sendMessage('LMS', CorpNum, Sender, SenderName, Subject, Contents, Messages, reserveDT, adsYN, requestNum, '', success, error);
});


MessageService.prototype.sendXMS = function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, reserveDT, adsYN, SenderName, requestNum, UserID, success, error) {
    var Messages = {
        Sender: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Subject: Subject,
        Contents: Contents
    };

    this.sendMessage('XMS', CorpNum, '', '', '', '', Messages, reserveDT, adsYN, requestNum, UserID, success, error);
}

BaseService.addMethod(MessageService.prototype, 'sendXMS', function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, reserveDT, success, error) {
    var Messages = {
        Sender: Sender,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Subject: Subject,
        Contents: Contents
    };

    this.sendMessage('XMS', CorpNum, '', '', '', '', Messages, reserveDT, false, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendXMS', function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, reserveDT, adsYN, success, error) {
    var Messages = {
        Sender: Sender,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Subject: Subject,
        Contents: Contents
    };

    this.sendMessage('XMS', CorpNum, '', '', '', '', Messages, reserveDT, adsYN, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendXMS', function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, reserveDT, adsYN, SenderName, success, error) {
    var Messages = {
        Sender: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Subject: Subject,
        Contents: Contents
    };

    this.sendMessage('XMS', CorpNum, '', '', '', '', Messages, reserveDT, adsYN, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendXMS', function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, reserveDT, adsYN, SenderName, requestNum, success, error) {
    var Messages = {
        Sender: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Subject: Subject,
        Contents: Contents
    };

    this.sendMessage('XMS', CorpNum, '', '', '', '', Messages, reserveDT, adsYN, requestNum, '', success, error);
});

MessageService.prototype.sendXMS_multi = function (CorpNum, Sender, Subject, Contents, Messages, reserveDT, adsYN, requestNum, SenderName, UserID, success, error) {
    this.sendMessage('XMS', CorpNum, Sender, SenderName, Subject, Contents, Messages, reserveDT, adsYN, requestNum, UserID, success, error);
}

BaseService.addMethod(MessageService.prototype, 'sendXMS_multi', function (CorpNum, Sender, Subject, Contents, Messages, reserveDT, success, error) {
    this.sendMessage('XMS', CorpNum, Sender, '', Subject, Contents, Messages, reserveDT, false, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendXMS_multi', function (CorpNum, Sender, Subject, Contents, Messages, reserveDT, adsYN, success, error) {
    this.sendMessage('XMS', CorpNum, Sender, '', Subject, Contents, Messages, reserveDT, adsYN, '', '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendXMS_multi', function (CorpNum, Sender, Subject, Contents, Messages, reserveDT, adsYN, requestNum, success, error) {
    this.sendMessage('XMS', CorpNum, Sender, '', Subject, Contents, Messages, reserveDT, adsYN, requestNum, '', success, error);
});
BaseService.addMethod(MessageService.prototype, 'sendXMS_multi', function (CorpNum, Sender, Subject, Contents, Messages, reserveDT, adsYN, requestNum, SenderName, success, error) {
    this.sendMessage('XMS', CorpNum, Sender, SenderName, Subject, Contents, Messages, reserveDT, adsYN, requestNum, '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendMessage', function (MsgType, CorpNum, Sender, SenderName, Subject, Contents, Messages, reserveDT, adsYN,  success, error) {
    this.sendMessage(MsgType, CorpNum, Sender, SenderName, Subject, Contents, Messages, reserveDT, adsYN, '', '', success, error)
});


MessageService.prototype.sendMessage_MMS = function (CorpNum, Sender, SenderName, Subject, Contents, Messages, FilePaths, reserveDT, adsYN, requestNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    var req = {
        snd: Sender,
        sndnm: SenderName,
        content: Contents,
        subject: Subject,
        adsYN: adsYN,
        sndDT: reserveDT,
        requestNum: requestNum,
        msgs: [],
    }

    if (Array.isArray(Messages)) {
        for (var i in Messages) {
            req.msgs.push({
                snd: Messages[i].Sender,
                sndnm: Messages[i].SenderName,
                rcv: Messages[i].Receiver,
                rcvnm: Messages[i].ReceiverName,
                msg: Messages[i].Contents,
                sjt: Messages[i].Subject,
                interOPRefKey: Messages[i].interOPRefKey
            });
        }
    } else {
        req.msgs.push({
            snd: Messages.Sender,
            sndnm: Messages.SenderName,
            rcv: Messages.Receiver,
            rcvnm: Messages.ReceiverName,
            msg: Messages.Contents,
            sjt: Messages.Subject,
            interOPRefKey: Messages.interOPRefKey
        });
    }

    var postData = this._stringify(req);

    var files = [];

    for (var i in FilePaths) {
        files.push({
            fieldName: 'file',
            fileName: FilePaths[i]
        });
    }

    this._executeAction({
        uri: '/MMS',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        Files: files,
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });
}

MessageService.prototype.sendMMS = function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, FilePaths, reserveDT, adsYN, requestNum, SenderName, UserID, success, error) {
    var Messages = {
        Sender: Sender,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        Subject: Subject,
        Contents: Contents
    };

    this.sendMessage_MMS(CorpNum, '', SenderName, '', '', Messages, FilePaths, reserveDT, adsYN, requestNum, UserID, success, error);
}

BaseService.addMethod(MessageService.prototype, 'sendMMS', function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, FilePaths, reserveDT, success, error) {
    this.sendMMS(CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, FilePaths, reserveDT, false, '', '', '', success, error)
});

BaseService.addMethod(MessageService.prototype, 'sendMMS', function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, FilePaths, reserveDT, adsYN, success, error) {
    this.sendMMS(CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, FilePaths, reserveDT, adsYN, '', '', '', success, error)
});

BaseService.addMethod(MessageService.prototype, 'sendMMS', function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, FilePaths, reserveDT, adsYN, requestNum, success, error) {
    this.sendMMS(CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, FilePaths, reserveDT, adsYN, requestNum, '', '', success, error)
});

BaseService.addMethod(MessageService.prototype, 'sendMMS', function (CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, FilePaths, reserveDT, adsYN, requestNum, UserID, success, error) {
    this.sendMMS(CorpNum, Sender, Receiver, ReceiverName, Subject, Contents, FilePaths, reserveDT, adsYN, requestNum, '', UserID, success, error)
});

MessageService.prototype.sendMMS_multi = function (CorpNum, Sender, Subject, Contents, Messages, FilePaths, reserveDT, adsYN, requestNum, SenderName, UserID, success, error) {
    this.sendMessage_MMS(CorpNum, Sender, SenderName, Subject, Contents, Messages, FilePaths, reserveDT, adsYN, requestNum, UserID, success, error);
}

BaseService.addMethod(MessageService.prototype, 'sendMMS_multi', function (CorpNum, Sender, Subject, Contents, Messages, FilePaths, reserveDT, success, error) {
    this.sendMessage_MMS(CorpNum, Sender, '', Subject, Contents, Messages, FilePaths, reserveDT, false, '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendMMS_multi', function (CorpNum, Sender, Subject, Contents, Messages, FilePaths, reserveDT, adsYN, success, error) {
    this.sendMessage_MMS(CorpNum, Sender, '', Subject, Contents, Messages, FilePaths, reserveDT, adsYN, '', success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendMMS_multi', function (CorpNum, Sender, Subject, Contents, Messages, FilePaths, reserveDT, adsYN, requestNum, success, error) {
    this.sendMessage_MMS(CorpNum, Sender, '', Subject, Contents, Messages, FilePaths, reserveDT, adsYN, requestNum, success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendMMS_multi', function (CorpNum, Sender, Subject, Contents, Messages, FilePaths, reserveDT, adsYN, requestNum, SenderName, success, error) {
    this.sendMessage_MMS(CorpNum, Sender, SenderName, Subject, Contents, Messages, FilePaths, reserveDT, adsYN, requestNum, success, error);
});

BaseService.addMethod(MessageService.prototype, 'sendMessage_MMS', function (CorpNum, Sender, SenderName, Subject, Contents, Messages, FilePaths, reserveDT, adsYN, success, error) {
    this.sendMessage_MMS(CorpNum, Sender, SenderName, Subject, Contents, Messages, FilePaths, reserveDT, adsYN, '', success, error)
});

BaseService.addMethod(MessageService.prototype, 'sendMessage_MMS', function (CorpNum, Sender, SenderName, Subject, Contents, Messages, FilePaths, reserveDT, adsYN, requestNum, success, error) {
    this.sendMessage_MMS(CorpNum, Sender, SenderName, Subject, Contents, Messages, FilePaths, reserveDT, adsYN, '', '',success, error)
});

MessageService.prototype.getMessages = function (CorpNum, ReceiptNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(ReceiptNum)){
        this._throwError('문자전송 접수번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/Message/' + ReceiptNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'getMessages', function(CorpNum, ReceiptNum, success, error) {
    this.getMessages(CorpNum, ReceiptNum, '', success, error);
});

MessageService.prototype.getMessagesRN = function (CorpNum, RequestNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(RequestNum)) {
        this._throwError('문자전송 요청번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/Message/Get/' + RequestNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'getMessagesRN', function(CorpNum, RequestNum, success, error) {
    this.getMessagesRN(CorpNum, RequestNum, '', success, error);
});

MessageService.prototype.cancelReserve = function (CorpNum, ReceiptNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(ReceiptNum)){
        this._throwError('문자전송 접수번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/Message/' + ReceiptNum + '/Cancel',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'cancelReserve', function(CorpNum, ReceiptNum, success, error) {
    this.cancelReserve(CorpNum, ReceiptNum, '', success, error);
});

MessageService.prototype.cancelReserveRN = function (CorpNum, RequestNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(RequestNum)) {
        this._throwError('문자전송 요청번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/Message/Cancel/' + RequestNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'cancelReserveRN', function(CorpNum, RequestNum, success, error) {
    this.cancelReserveRN(CorpNum, RequestNum, '', success, error);
});

MessageService.prototype.cancelReservebyRCV = function (CorpNum, ReceiptNum, ReceiveNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(ReceiptNum)){
        this._throwError('문자전송 접수번호가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(ReceiveNum)) {
        this._throwError('문자전송 수신번호가 입력되지 않았습니다.', error);
        return;
    }

    var postData = this._stringify(ReceiveNum);

    this._executeAction({
        uri: '/Message/' + ReceiptNum + '/Cancel',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'cancelReservebyRCV', function(CorpNum, ReceiptNum, ReceiveNum, success, error) {
    this.cancelReservebyRCV(CorpNum, ReceiptNum, ReceiveNum, '', success, error);
});

MessageService.prototype.cancelReserveRNbyRCV = function (CorpNum, RequestNum, ReceiveNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(RequestNum)) {
        this._throwError('문자전송 요청번호가 입력되지 않았습니다.', error);
        return;
    }
    if (this._isNullOrEmpty(ReceiveNum)) {
        this._throwError('문자전송 수신번호가 입력되지 않았습니다.', error);
        return;
    }

    var postData = this._stringify(ReceiveNum);

    this._executeAction({
        uri: '/Message/Cancel/' + RequestNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'cancelReserveRNbyRCV', function(CorpNum, RequestNum, ReceiveNum, success, error) {
    this.cancelReserveRNbyRCV(CorpNum, RequestNum, ReceiveNum, '', success, error);
});

MessageService.prototype.search = function(CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Order, Page, PerPage, QString, UserID, success, error){
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(SDate)){
        this._throwError('시작일자가 입력되지 않았습니다.', error);
        return;
    }

    if (!this._isValidDate(SDate)){
        this._throwError('시작일자 유형이 올바르지 않습니다.', error);
        return
    }

    if (this._isNullOrEmpty(EDate)) {
        this._throwError('종료일자가 입력되지 않았습니다.', error);
        return;
    }

    if (!this._isValidDate(EDate)){
        this._throwError('종료일자 유형이 올바르지 않습니다.', error);
        return
    }

    var targetURI = '/Message/Search?SDate=' + SDate + '&EDate=' + EDate;
    if (!this._isNullOrEmpty(State)) targetURI += '&State=' + State.toString();
    if (!this._isNullOrEmpty(Item)) targetURI += '&Item=' + Item.toString();
    if (!this._isNullOrEmpty(ReserveYN)) if(ReserveYN) targetURI += '&ReserveYN=1'
    if (!this._isNullOrEmpty(SenderYN)) if(SenderYN) targetURI += '&SenderYN=1'
    if (!this._isNullOrEmpty(Order))targetURI += '&Order=' + Order;
    if (!this._isNullOrEmpty(Page))targetURI += '&Page=' + Page;
    if (!this._isNullOrEmpty(PerPage))targetURI += '&PerPage=' + PerPage;
    if (!this._isNullOrEmpty(QString))targetURI += '&QString=' + encodeURIComponent(QString);

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'search', function (CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Order, Page, PerPage, success, error) {
    this.search(CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Order, Page, PerPage, "", success, error)
});

BaseService.addMethod(MessageService.prototype, 'search', function (CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Order, Page, PerPage, QString, success, error) {
    this.search(CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Order, Page, PerPage, QString, '', success, error)
});

BaseService.addMethod(MessageService.prototype, 'search', function (CorpNum, SDate, EDate, success, error){
    this.search(CorpNum, SDate, EDate, '', '', '', '', '', '', '', '', success, error)
});

MessageService.prototype.getAutoDenyList = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }


    this._executeAction({
        uri: '/Message/Denied',
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'getAutoDenyList', function(CorpNum, success, error) {
    this.getAutoDenyList(CorpNum, '', success, error);
});

MessageService.prototype.getSenderNumberList = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Message/SenderNumber',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}


BaseService.addMethod(MessageService.prototype, 'getSenderNumberList', function (CorpNum, success, error) {
    this.getSenderNumberList(CorpNum, '', success, error);
});


MessageService.prototype.checkAutoDenyNumber = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Message/AutoDenyNumberInfo',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'checkAutoDenyNumber', function (CorpNum, success, error) {
    this.checkAutoDenyNumber(CorpNum, '', success, error);
});

MessageService.prototype.getStates = function (CorpNum, ReceiptNumList, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(ReceiptNumList)) {
        this._throwError('문자전송 접수번호 배열이 입력되지 않았습니다.', error);
        return;
    }

    var postData = this._stringify(ReceiptNumList);

    this._executeAction({
        uri: '/Message/States',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(MessageService.prototype, 'getStates', function (CorpNum, ReceiptNumList, success, error) {
    this.getStates(CorpNum, ReceiptNumList, "", success, error);
});