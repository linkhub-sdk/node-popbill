var Util = require('util');
var BaseService = require('./BaseService');

module.exports = KakaoService;
Util.inherits(KakaoService, BaseService);

function KakaoService(config) {
    BaseService.call(this, config);
    this._scopes.push('153');
    this._scopes.push('154');
    this._scopes.push('155');
}

//GetURL (UserID)
KakaoService.prototype.getURL = function (CorpNum, TOGO, UserID, success, error) {
    var uri;
    TOGO == 'SENDER' ? uri = '/Message/?TG=' : uri = '/KakaoTalk/?TG=';

    this._executeAction({
        uri: uri + TOGO,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    })
};

KakaoService.prototype.getPlusFriendMgtURL = function (CorpNum, UserID, callback, err) {
    this._executeAction({
        uri: '/KakaoTalk/?TG=PLUSFRIEND',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (callback) callback(response.url);
        },
        error: err
    });
};

KakaoService.prototype.getSenderNumberMgtURL = function (CorpNum, UserID, callback, err) {
    this._executeAction({
        uri: '/Message/?TG=SENDER',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (callback) callback(response.url);
        },
        error: err
    });
};

KakaoService.prototype.getATSTemplateMgtURL = function (CorpNum, UserID, callback, err) {
    this._executeAction({
        uri: '/KakaoTalk/?TG=TEMPLATE',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (callback) callback(response.url);
        },
        error: err
    });
};

KakaoService.prototype.getSentListURL = function (CorpNum, UserID, callback, err) {
    this._executeAction({
        uri: '/KakaoTalk/?TG=BOX',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (callback) callback(response.url);
        },
        error: err
    });
};

//ListPlusFriendID
BaseService.addMethod(KakaoService.prototype, 'listPlusFriendID', function (CorpNum, success, error) {
    this.listPlusFriendID(CorpNum, '', success, error);
});
//ListPlusFriendID (UserID)
BaseService.addMethod(KakaoService.prototype, 'listPlusFriendID', function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/KakaoTalk/ListPlusFriendID',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error
    })
});

//GetSenderNumberList
BaseService.addMethod(KakaoService.prototype, 'getSenderNumberList', function (CorpNum, success, error) {
    this.getSenderNumberList(CorpNum, '', success, error);
});
//GetSenderNumberList (UserID)
BaseService.addMethod(KakaoService.prototype, 'getSenderNumberList', function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/Message/SenderNumber',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error
    })
});

//ListATSTemplate
BaseService.addMethod(KakaoService.prototype, 'listATSTemplate', function (CorpNum, success, error) {
    this.listATSTemplate(CorpNum, '', success, error);
});
//ListATSTemplate (UserID)
BaseService.addMethod(KakaoService.prototype, 'listATSTemplate', function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/KakaoTalk/ListATSTemplate',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error
    })
});

//SendATS one
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, receiver, receiverName, success, error) {
    this.sendATS_one(CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, receiver, receiverName, "", "", success, error);
});
//SendATS one (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, receiver, receiverName, UserID, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altmsg: altContnet
    };

    this.sendATS_same(CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, msg, UserID, "", success, error);
});

//SendATS one (RequestNum)
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, receiver, receiverName, UserID, requestNum, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altmsg: altContnet
    };

    this.sendATS_same(CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, msg, UserID, requestNum, success, error);
});

//SendATS multi
BaseService.addMethod(KakaoService.prototype, 'sendATS_multi', function (CorpNum, templateCode, snd, altSendType, sndDT, msgs, success, errpr) {
    this.sendATS_multi(CorpNum, templateCode, snd, altSendType, sndDT, msgs, "", "", success, errpr)
});

//SendATS multi (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendATS_multi', function (CorpNum, templateCode, snd, altSendType, sndDT, msgs, UserID, success, errpr) {
    this.sendATS_multi(CorpNum, templateCode, snd, altSendType, sndDT, msgs, UserID, "", success, errpr)
});

//SendATS multi (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendATS_multi', function (CorpNum, templateCode, snd, altSendType, sndDT, msgs, UserID, requestNum, success, error) {
    var msg = [];

    if (Array.isArray(msgs)) {
        for (var i in msgs) {
            msg.push({
                rcv: msgs[i].rcv,
                rcvnm: msgs[i].rcvnm,
                msg: msgs[i].msg,
                altmsg: msgs[i].altmsg
            });
        }
    } else {
        msg.push({
            rcv: msgs.rcv,
            rcvnm: msgs.rcvnm,
            msg: msgs.msg,
            altmsg: msgs.rcvnm
        });
    }

    this.sendATS_same(CorpNum, templateCode, snd, '', '', altSendType, sndDT, msg, UserID, requestNum, success, error);
});

//SendATS same
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, msgs, success, error) {
    this.sendATS_same(CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, msgs, "", "", success, error)
});

//SendATS smae (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, msgs, UserID, success, error) {
    this.sendATS_same(CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, msgs, UserID, "", success, error)
});

//SendATS smae (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, snd, content, altContent, altSendType, sndDT, msgs, UserID, requestNum, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }
    var req = {
        templateCode: templateCode,
        snd: snd,
        content: content,
        altContent: altContent,
        altSendType: altSendType,
        sndDT: sndDT,
        requestNum: requestNum,
        msgs: []
    };

    if (Array.isArray(msgs)) {
        for (var i in msgs) {
            req.msgs.push({
                rcv: msgs[i].rcv,
                rcvnm: msgs[i].rcvnm,
                msg: msgs[i].msg,
                altmsg: msgs[i].altmsg
            });
        }
    } else {
        req.msgs.push({
            rcv: msgs.rcv,
            rcvnm: msgs.rcvnm,
            msg: msgs.msg,
            altmsg: msgs.altmsg
        });
    }
    var postData = this._stringify(req);

    this._executeAction({
        uri: '/ATS',
        CorpNum: CorpNum,
        Data: postData,
        UserID: UserID,
        Method: 'POST',
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });

});


//SendFTS one
BaseService.addMethod(KakaoService.prototype, 'sendFTS_one', function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, success, error) {
    this.sendFTS_one(CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, "", "", success, error);
});

//SendFTS one (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_one', function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, success, error) {
    this.sendFTS_one(CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, "", success, error);
});

//SendFTS one (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_one', function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, requestNum, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altmsg: altContent
    };

    this.sendFTS_same(CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, adsYN, msg, btns, UserID, requestNum, success, error);
});



//SendFTS multi
BaseService.addMethod(KakaoService.prototype, 'sendFTS_multi', function (CropNum, plusFriendID, snd, altSendType, sndDT, adsYN, msgs, btns, success, error) {
    this.sendFTS_multi(CropNum, plusFriendID, snd, altSendType, sndDT, adsYN, msgs, btns, "", "", success, error);
});

//SendFTS multi (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_multi', function (CropNum, plusFriendID, snd, altSendType, sndDT, adsYN, msgs, btns, UserID, success, error) {
    this.sendFTS_multi(CropNum, plusFriendID, snd, altSendType, sndDT, adsYN, msgs, btns, UserID, "", success, error);
});

//SendFTS multi (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_multi', function (CorpNum, plusFriendID, snd, altSendType, sndDT, adsYN, msgs, btns, UserID, requestNum, success, error) {
    var msg = [];

    if (Array.isArray(msgs)) {
        for (var i in msgs) {
            msg.push({
                rcv: msgs[i].rcv,
                rcvnm: msgs[i].rcvnm,
                msg: msgs[i].msg,
                altmsg: msgs[i].altmsg
            });
        }
    } else {
        msg.push({
            rcv: msgs.rcv,
            rcvnm: msgs.rcvnm,
            msg: msgs.msg,
            altmsg: msgs.rcvnm
        });
    }

    var btn = [];

    if (Array.isArray(btns)) {
        for (var i in btns) {
            btn.push({
                t: btns[i].t,
                n: btns[i].n,
                u1: btns[i].u1,
                u2: btns[i].u2
            });
        }
    } else {
        btn.push({
            t: btns.t,
            n: btns.n,
            u1: btns.u1,
            u2: btns.u2
        });
    }

    this.sendFTS_same(CorpNum, plusFriendID, snd, '', '', altSendType, sndDT, adsYN, msg, btn, UserID, requestNum, success, error);
});

//SendFTS same
BaseService.addMethod(KakaoService.prototype, 'sendFTS_same', function (CropNum, plusFriendID, snd, content, altContent, altSendType, sndDT, adsYN, msgs, btns, success, error) {
    this.sendFTS_same(CropNum, plusFriendID, snd, content, altContent, altSendType, sndDT, adsYN, msgs, btns, "", "", success, error);
});

//SendFTS same (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_same', function (CropNum, plusFriendID, snd, content, altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, success, error) {
    this.sendFTS_same(CropNum, plusFriendID, snd, content, altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, "", success, error);
});

//SendFTS same (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_same', function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, requestNum, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        plusFriendID: plusFriendID,
        snd: snd,
        content: content,
        altContent: altContent,
        altSendType: altSendType,
        sndDT: sndDT,
        adsYN: adsYN,
        requestNum: requestNum,
        msgs: [],
        btns: []
    };

    if (Array.isArray(msgs)) {
        for (var i in msgs) {
            req.msgs.push({
                rcv: msgs[i].rcv,
                rcvnm: msgs[i].rcvnm,
                msg: msgs[i].msg,
                altmsg: msgs[i].altmsg
            });
        }
    } else {
        req.msgs.push({
            rcv: msgs.rcv,
            rcvnm: msgs.rcvnm,
            msg: msgs.msg,
            altmsg: msgs.altmsg
        });
    }

    if (Array.isArray(btns)) {
        for (var i in btns) {
            req.btns.push({
                t: btns[i].t,
                n: btns[i].n,
                u1: btns[i].u1,
                u2: btns[i].u2
            });
        }
    } else {
        req.btns.push({
            t: btns.t,
            n: btns.n,
            u1: btns.u1,
            u2: btns.u2
        });
    }

    var postData = this._stringify(req);
    this._executeAction({
        uri: '/FTS',
        CorpNum: CorpNum,
        Data: postData,
        Method: 'POST',
        UserID: UserID,
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });
});

//SenddFMS one
BaseService.addMethod(KakaoService.prototype, "sendFMS_one", function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, success, error) {
    this.sendFMS_one(CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, "", "", success, error);
});

//SenddFMS one (UserID)
BaseService.addMethod(KakaoService.prototype, "sendFMS_one", function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, UserID, success, error) {
    this.sendFMS_one(CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, UserID, "", success, error);
});

//SenddFMS one  (requestNum)
BaseService.addMethod(KakaoService.prototype, "sendFMS_one", function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, UserID, requestNum, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altmsg: altContent
    };

    this.sendFMS_same(CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msg, btns, UserID, requestNum, success, error);
});

//SenddFMS multi
BaseService.addMethod(KakaoService.prototype, "sendFMS_multi", function (CorpNum, plusFriendID, snd, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, success, error) {
    this.sendFMS_multi(CorpNum, plusFriendID, snd, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, "", "", success, error);
});

//SenddFMS multi (UserID)
BaseService.addMethod(KakaoService.prototype, "sendFMS_multi", function (CorpNum, plusFriendID, snd, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, success, error) {
    this.sendFMS_multi(CorpNum, plusFriendID, snd, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, "", success, error);
});

//SenddFMS multi (requestNum)
BaseService.addMethod(KakaoService.prototype, "sendFMS_multi", function (CorpNum, plusFriendID, snd, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, requestNum, success, error) {

    var msg = [];

    if (Array.isArray(msgs)) {
        for (var i in msgs) {
            msg.push({
                rcv: msgs[i].rcv,
                rcvnm: msgs[i].rcvnm,
                msg: msgs[i].msg,
                altmsg: msgs[i].altmsg
            });
        }
    } else {
        msg.push({
            rcv: msgs.rcv,
            rcvnm: msgs.rcvnm,
            msg: msgs.msg,
            altmsg: msgs.rcvnm
        });
    }

    var btn = [];

    if (Array.isArray(btns)) {
        for (var i in btns) {
            btn.push({
                t: btns[i].t,
                n: btns[i].n,
                u1: btns[i].u1,
                u2: btns[i].u2
            });
        }
    } else {
        btn.push({
            t: btns.t,
            n: btns.n,
            u1: btns.u1,
            u2: btns.u2
        });
    }

    this.sendFMS_same(CorpNum, plusFriendID, snd, '', '', altSendType, sndDT, adsYN, imageURL, FilePath, msg, btn, UserID, requestNum, success, error);
});

//SenddFMS same
BaseService.addMethod(KakaoService.prototype, "sendFMS_same", function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, success, error) {
    this.sendFMS_same(CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, "", "", success, error);
});

//SenddFMS same (UserID)
BaseService.addMethod(KakaoService.prototype, "sendFMS_same", function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, success, error) {
    this.sendFMS_same(CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, "", success, error);
});

//SenddFMS same (requestNum)
BaseService.addMethod(KakaoService.prototype, "sendFMS_same", function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, requestNum, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        plusFriendID: plusFriendID,
        snd: snd,
        content: content,
        altContent: altContent,
        altSendType: altSendType,
        sndDT: sndDT,
        adsYN: adsYN,
        imageURL: imageURL,
        requestNum: requestNum,
        msgs: [],
        btns: []
    };

    if (Array.isArray(msgs)) {
        for (var i in msgs) {
            req.msgs.push({
                rcv: msgs[i].rcv,
                rcvnm: msgs[i].rcvnm,
                msg: msgs[i].msg,
                altmsg: msgs[i].altmsg
            });
        }
    } else {
        req.msgs.push({
            rcv: msgs.rcv,
            rcvnm: msgs.rcvnm,
            msg: msgs.msg,
            altmsg: msgs.altmsg
        });
    }


    if (Array.isArray(btns)) {
        for (var i in btns) {
            req.btns.push({
                t: btns[i].t,
                n: btns[i].n,
                u1: btns[i].u1,
                u2: btns[i].u2
            });
        }
    } else {
        req.btns.push({
            t: btns.t,
            n: btns.n,
            u1: btns.u1,
            u2: btns.u2
        });
    }

    var postData = this._stringify(req);

    var files = [];
    for (var i in FilePath) {
        files.push({
            fieldName: 'file',
            fileName: FilePath[i]
        });
    }

    this._executeAction({
        uri: '/FMS',
        CorpNum: CorpNum,
        Data: postData,
        Method: 'POST',
        UserID: UserID,
        Files: files,
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });
});

//CancelReserve
BaseService.addMethod(KakaoService.prototype, "cancelReserve", function (CorpNum, ReceiptNum, success, error) {
    this.cancelReserve(CorpNum, ReceiptNum, '', success, error);
});
//CancelReserve (UserID)
BaseService.addMethod(KakaoService.prototype, "cancelReserve", function (CorpNum, ReceiptNum, UserID, success, error) {
    if (!ReceiptNum || 0 === ReceiptNum.length) {
        this._throwError(-99999999, '카카오톡 접수번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/KakaoTalk/' + ReceiptNum + '/Cancel',
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

//CancelReserveRN
BaseService.addMethod(KakaoService.prototype, "cancelReserveRN", function (CorpNum, RequestNum, success, error) {
    this.cancelReserveRN(CorpNum, RequestNum, '', success, error);
});
//CancelReserveRN (UserID)
BaseService.addMethod(KakaoService.prototype, "cancelReserveRN", function (CorpNum, RequestNum, UserID, success, error) {
    if (!RequestNum || 0 === RequestNum.length) {
        this._throwError(-99999999, '카카오톡 전송요청번호를 입력하지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/KakaoTalk/Cancel/' + RequestNum,
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

//GetMessages
BaseService.addMethod(KakaoService.prototype, "getMessages", function (CorpNum, ReceiptNum, success, error) {
    this.getMessages(CorpNum, ReceiptNum, '', success, error);
});
//GetMessages (UserID)
BaseService.addMethod(KakaoService.prototype, "getMessages", function (CorpNum, ReceiptNum, UserID, success, error) {
    if (!ReceiptNum || 0 === ReceiptNum.length) {
        this._throwError(-99999999, '카카오톡 접수번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/KakaoTalk/' + ReceiptNum,
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

//GetMessagesRN
BaseService.addMethod(KakaoService.prototype, "getMessagesRN", function (CorpNum, RequestNum, success, error) {
    this.getMessagesRN(CorpNum, RequestNum, '', success, error);
});
//GetMessagesRN (UserID)
BaseService.addMethod(KakaoService.prototype, "getMessagesRN", function (CorpNum, RequestNum, UserID, success, error) {
    if (!RequestNum || 0 === RequestNum.length) {
        this._throwError(-99999999, '카카오톡 전송요청번호를 입력하지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/KakaoTalk/Get/' + RequestNum,
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

//Search
BaseService.addMethod(KakaoService.prototype, "search", function (CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, success, error) {
    this.search(CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, '', success, error);
});

BaseService.addMethod(KakaoService.prototype, "search", function (CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, UserID, success, error) {
    this.search(CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, '', UserID, success, error);
});

BaseService.addMethod(KakaoService.prototype, "search", function (CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, QString, UserID, success, error) {
    if (!SDate || 0 === SDate.length) {
        this._throwError(-99999999, '시작일자가 입력되지 않았습니다.', error);
        return;
    }

    if (!EDate || 0 === EDate.length) {
        this._throwError(-99999999, '종료일자가 입력되지 않았습니다.', error);
        return;
    }

    var targetURI;

    targetURI = '/KakaoTalk/Search';
    targetURI += '?SDate=' + SDate;
    targetURI += '&EDate=' + EDate;
    targetURI += '&State=' + State.toString();
    targetURI += '&Item=' + Item.toString();
    targetURI += '&ReserveYN=' + ReserveYN;
    if (SenderYN) targetURI += '&SenderYN=1';
    targetURI += '&Page=' + Page;
    targetURI += '&PerPage=' + PerPage;
    targetURI += '&Order=' + Order;
    if (QString !== "") {
        targetURI += '&QString=' + encodeURIComponent(QString);
    }

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});



//GetUnitCost
BaseService.addMethod(KakaoService.prototype, "getUnitCost", function (CorpNum, KakaoType, success, error) {
    this.getUnitCost(CorpNum, KakaoType, '', success, error);
});
//GetUnitCost (UserID)
BaseService.addMethod(KakaoService.prototype, "getUnitCost", function (CorpNum, KakaoType, UserID, success, error) {
    if (!KakaoType || 0 === KakaoType.length) {
        this._throwError(-99999999, '카카오톡 유형이 입력되지 않았습니다', error);
        return;
    }
    this._executeAction({
        uri: '/KakaoTalk/UnitCost?Type=' + KakaoType,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (respnse) {
            if (success) success(respnse.unitCost);
        },
        error: error
    });
});

//GetChargeInfo
BaseService.addMethod(KakaoService.prototype, 'getChargeInfo', function (CorpNum, KakaoType, success, error) {
    this.getChargeInfo(CorpNum, KakaoType, '', success, error)
});
//GetChargeInfo (UserID)
BaseService.addMethod(KakaoService.prototype, 'getChargeInfo', function (CorpNum, KakaoType, UserID, success, error) {
    if (!KakaoType || 0 === KakaoType.length) {
        this._throwError(-99999999, '카카오톡 유형이 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/KakaoTalk/ChargeInfo?Type=' + KakaoType,
        CorpNum: CorpNum,
        UserId: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});
