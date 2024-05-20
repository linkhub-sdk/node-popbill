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
    TOGO === 'SENDER' ? uri = '/Message/?TG=' : uri = '/KakaoTalk/?TG=';

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

BaseService.addMethod(KakaoService.prototype, 'getURL', function (CorpNum, TOGO, success, error) {
    this.getURL(CorpNum, TOGO, '', success, error);
});

KakaoService.prototype.getPlusFriendMgtURL = function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/KakaoTalk/?TG=PLUSFRIEND',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
};

BaseService.addMethod(KakaoService.prototype, 'getPlusFriendMgtURL', function (CorpNum, success, error) {
    this.getPlusFriendMgtURL(CorpNum, '', success, error);
});

KakaoService.prototype.getSenderNumberMgtURL = function (CorpNum, UserID, success, err) {
    this._executeAction({
        uri: '/Message/?TG=SENDER',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: err
    });
};

BaseService.addMethod(KakaoService.prototype, 'getSenderNumberMgtURL', function (CorpNum, success, error) {
    this.getSenderNumberMgtURL(CorpNum, '', success, error);
});

KakaoService.prototype.getATSTemplateMgtURL = function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/KakaoTalk/?TG=TEMPLATE',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
};

BaseService.addMethod(KakaoService.prototype, 'getATSTemplateMgtURL', function (CorpNum, success, error) {
    this.getATSTemplateMgtURL(CorpNum, '', success, error);
});

KakaoService.prototype.getSentListURL = function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/KakaoTalk/?TG=BOX',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
};

BaseService.addMethod(KakaoService.prototype, 'getSentListURL', function (CorpNum, success, error) {
    this.getSentListURL(CorpNum, '', success, error);
});

//ListPlusFriendID (UserID)
KakaoService.prototype.listPlusFriendID = function (CorpNum, UserID, success, error) {
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
};

//ListPlusFriendID
BaseService.addMethod(KakaoService.prototype, 'listPlusFriendID', function (CorpNum, success, error) {
    this.listPlusFriendID(CorpNum, '', success, error);
});

//GetSenderNumberList (UserID)
KakaoService.prototype.getSenderNumberList = function (CorpNum, UserID, success, error) {
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
};

//GetSenderNumberList
BaseService.addMethod(KakaoService.prototype, 'getSenderNumberList', function (CorpNum, success, error) {
    this.getSenderNumberList(CorpNum, '', success, error);
});

//GetATSTemplate (UserID)
KakaoService.prototype.getATSTemplate = function (CorpNum, templateCode, UserID, success, error) {

    this._executeAction({
        uri: '/KakaoTalk/GetATSTemplate/' + templateCode.trim(),
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error
    });
};

//GetATSTemplate
BaseService.addMethod(KakaoService.prototype, 'getATSTemplate', function (CorpNum, templateCode, success, error) {
    this.getATSTemplate(CorpNum, templateCode, '', success, error);
});

//ListATSTemplate (UserID)
KakaoService.prototype.listATSTemplate = function (CorpNum, UserID, success, error) {
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
};

//ListATSTemplate
BaseService.addMethod(KakaoService.prototype, 'listATSTemplate', function (CorpNum, success, error) {
    this.listATSTemplate(CorpNum, '', success, error);
});

//CheckSenderNumber (UserID)
KakaoService.prototype.checkSenderNumber = function (CorpNum, SenderNumber, UserID, success, error) {
    if (this._isNullOrEmpty(SenderNumber)) {
        this._throwError(-99999999, '확인할 발신번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/KakaoTalk/CheckSenderNumber/' + SenderNumber,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

//CheckSenderNumber
BaseService.addMethod(KakaoService.prototype, 'checkSenderNumber', function (CorpNum, SenderNumber, success, error) {
    this.checkSenderNumber(CorpNum, SenderNumber, '', success, error);
});

//SendATS one (altSubject)
KakaoService.prototype.sendATS_one = function (CorpNum, templateCode, Sender, content, altSubject, altContnet, altSendType, sndDT, receiver, receiverName, UserID, requestNum, btns, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altsjt: altSubject,
        altmsg: altContnet
    };

    this.sendATS_same(CorpNum, templateCode, Sender, content, altSubject, altContnet, altSendType, sndDT, msg, UserID, requestNum, btns, success, error);
};

//SendATS one
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, Sender, content, altContnet, altSendType, sndDT, receiver, receiverName, success, error) {
    this.sendATS_one(CorpNum, templateCode, Sender, content, altContnet, altSendType, sndDT, receiver, receiverName, "", "", null, success, error);
});

//SendATS one (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, Sender, content, altContnet, altSendType, sndDT, receiver, receiverName, UserID, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altmsg: altContnet
    };

    this.sendATS_same(CorpNum, templateCode, Sender, content, null, altContnet, altSendType, sndDT, msg, UserID, "", null, success, error);
});

//SendATS one (RequestNum)
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, Sender, content, altContnet, altSendType, sndDT, receiver, receiverName, UserID, requestNum, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altmsg: altContnet
    };

    this.sendATS_same(CorpNum, templateCode, Sender, content, null, altContnet, altSendType, sndDT, msg, UserID, requestNum, null, success, error);
});
//SendATS one (btns)
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, Sender, content, altContnet, altSendType, sndDT, receiver, receiverName, UserID, requestNum, btns, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altmsg: altContnet
    };

    this.sendATS_same(CorpNum, templateCode, Sender, content, null, altContnet, altSendType, sndDT, msg, UserID, requestNum, btns, success, error);
});

//SendATS multi (btns)
KakaoService.prototype.sendATS_multi = function (CorpNum, templateCode, Sender, altSendType, sndDT, msgs, UserID, requestNum, btns, success, error) {
    this.sendATS_same(CorpNum, templateCode, Sender, '', '', '', altSendType, sndDT, msgs, UserID, requestNum, btns, success, error);
};

//SendATS multi
BaseService.addMethod(KakaoService.prototype, 'sendATS_multi', function (CorpNum, templateCode, Sender, altSendType, sndDT, msgs, success, error) {
    this.sendATS_multi(CorpNum, templateCode, Sender, altSendType, sndDT, msgs, "", "", success, error)
});

//SendATS multi (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendATS_multi', function (CorpNum, templateCode, Sender, altSendType, sndDT, msgs, UserID, success, error) {
    this.sendATS_multi(CorpNum, templateCode, Sender, altSendType, sndDT, msgs, UserID, "", success, error)
});

//SendATS multi (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendATS_multi', function (CorpNum, templateCode, Sender, altSendType, sndDT, msgs, UserID, requestNum, success, error) {
    this.sendATS_same(CorpNum, templateCode, Sender, '', '', '', altSendType, sndDT, msgs, UserID, requestNum, null, success, error);
});

//SendATS same (altSubject)
KakaoService.prototype.sendATS_same = function (CorpNum, templateCode, Sender, content, altSubject, altContent, altSendType, sndDT, msgs, UserID, requestNum, btns, success, error) {
    if (this._isNullOrEmpty(CorpNum)) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        templateCode: templateCode,
        snd: Sender,
        content: content,
        altSubject: altSubject,
        altContent: altContent,
        altSendType: altSendType,
        sndDT: sndDT,
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
                altsjt: msgs[i].altsjt,
                altmsg: msgs[i].altmsg,
                interOPRefKey: msgs[i].interOPRefKey,
                btns: msgs[i].btns
            });
        }
    } else {
        req.msgs.push({
            rcv: msgs.rcv,
            rcvnm: msgs.rcvnm,
            msg: msgs.msg,
            altsjt: msgs.altsjt,
            altmsg: msgs.altmsg,
            interOPRefKey: msgs.interOPRefKey,
            btns: msgs.btns
        });
    }

    if (btns != null) {
        if (Array.isArray(btns)) {
            for (var i in btns) {
                req.btns.push({
                    t: btns[i].t,
                    n: btns[i].n,
                    u1: btns[i].u1,
                    u2: btns[i].u2,
                    tg: btns[i].tg
                });
            }
        } else {
            req.btns.push({
                t: btns.t,
                n: btns.n,
                u1: btns.u1,
                u2: btns.u2,
                tg: btns.tg
            });
        }
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

};

//SendATS same
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, success, error) {
    this.sendATS_same(CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, "", "", null, success, error)
});

//SendATS same (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, UserID, success, error) {
    this.sendATS_same(CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, UserID, "", null, success, error)
});

//SendATS same (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, UserID, requestNum, success, error) {
    this.sendATS_same(CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, UserID, requestNum, null, success, error)
});

//SendATS same (btns)
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, UserID, requestNum, btns, success, error) {
    this.sendATS_same(CorpNum, templateCode, Sender, content, null, altContent, altSendType, sndDT, msgs, UserID, requestNum, btns, success, error)
});

//SendFTS one (altSubject)
KakaoService.prototype.sendFTS_one = function (CorpNum, plusFriendID, Sender, content, altSubject, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, requestNum, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altsjt: altSubject,
        altmsg: altContent
    };

    this.sendFTS_same(CorpNum, plusFriendID, Sender, content, altSubject, altContent, altSendType, sndDT, adsYN, msg, btns, UserID, requestNum, success, error);
};

//SendFTS one
BaseService.addMethod(KakaoService.prototype, 'sendFTS_one', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, success, error) {
    this.sendFTS_one(CorpNum, plusFriendID, Sender, content, "", altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, "", "", success, error);
});

//SendFTS one (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_one', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, success, error) {
    this.sendFTS_one(CorpNum, plusFriendID, Sender, content, "", altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, "", success, error);
});

//SendFTS one (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_one', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, requestNum, success, error) {
    this.sendFTS_one(CorpNum, plusFriendID, Sender, content, "", altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, requestNum, success, error);
});

//SendFTS multi (requestNum)
KakaoService.prototype.sendFTS_multi = function (CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, msgs, btns, UserID, requestNum, success, error) {
    this.sendFTS_same(CorpNum, plusFriendID, Sender, '', '', '', altSendType, sndDT, adsYN, msgs, btns, UserID, requestNum, success, error);
};

//SendFTS multi
BaseService.addMethod(KakaoService.prototype, 'sendFTS_multi', function (CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, msgs, btns, success, error) {
    this.sendFTS_multi(CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, msgs, btns, "", "", success, error);
});

//SendFTS multi (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_multi', function (CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, msgs, btns, UserID, success, error) {
    this.sendFTS_multi(CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, msgs, btns, UserID, "", success, error);
});

//SendFTS same (altSubject)
KakaoService.prototype.sendFTS_same = function (CorpNum, plusFriendID, Sender, content, altSubject, altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, requestNum, success, error) {

    var req = {
        plusFriendID: plusFriendID,
        snd: Sender,
        content: content,
        altContent: altContent,
        altSubject: altSubject,
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
                altsjt: msgs[i].altsjt,
                altmsg: msgs[i].altmsg,
                interOPRefKey: msgs[i].interOPRefKey,
                btns: msgs[i].btns
            });
        }
    } else {
        req.msgs.push({
            rcv: msgs.rcv,
            rcvnm: msgs.rcvnm,
            msg: msgs.msg,
            altsjt: msgs.altsjt,
            altmsg: msgs.altmsg,
            interOPRefKey: msgs.interOPRefKey,
            btns: msgs.btns
        });
    }

    if (btns != null) {
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
};

//SendFTS same
BaseService.addMethod(KakaoService.prototype, 'sendFTS_same', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, adsYN, msgs, btns, success, error) {
    this.sendFTS_same(CorpNum, plusFriendID, Sender, content, '', altContent, altSendType, sndDT, adsYN, msgs, btns, "", "", success, error);
});

//SendFTS same (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_same', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, success, error) {
    this.sendFTS_same(CorpNum, plusFriendID, Sender, content, '', altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, "", success, error);
});

//SendFTS same (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_same', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, requestNum, success, error) {
    this.sendFTS_same(CorpNum, plusFriendID, Sender, content, '', altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, requestNum, success, error);
});

//SendFMS one  (altSubject)
KakaoService.prototype.sendFMS_one = function (CorpNum, plusFriendID, Sender, content, altSubject, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, UserID, requestNum, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altsjt: altSubject,
        altmsg: altContent
    };

    this.sendFMS_same(CorpNum, plusFriendID, Sender, content, altSubject, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msg, btns, UserID, requestNum, success, error);
};

//SendFMS one  (requestNum)
KakaoService.prototype.sendFMS_one = function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, UserID, requestNum, success, error) {
    this.sendFMS_one(CorpNum, plusFriendID, Sender, content, "", altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, UserID, requestNum, success, error);
};

//SendFMS one
BaseService.addMethod(KakaoService.prototype, "sendFMS_one", function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, success, error) {
    this.sendFMS_one(CorpNum, plusFriendID, Sender, content, "", altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, "", "", success, error);
});

//SendFMS one (UserID)
BaseService.addMethod(KakaoService.prototype, "sendFMS_one", function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, UserID, success, error) {
    this.sendFMS_one(CorpNum, plusFriendID, Sender, content, "", altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, UserID, "", success, error);
});

//SendFMS multi (requestNum)
KakaoService.prototype.sendFMS_multi = function (CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, requestNum, success, error) {
    this.sendFMS_same(CorpNum, plusFriendID, Sender, '', '', '', altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, requestNum, success, error);
};

//SendFMS multi
BaseService.addMethod(KakaoService.prototype, "sendFMS_multi", function (CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, success, error) {
    this.sendFMS_multi(CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, "", "", success, error);
});

//SendFMS same (altSubject)
KakaoService.prototype.sendFMS_same = function (CorpNum, plusFriendID, Sender, content, altSubject, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, requestNum, success, error) {

    var req = {
        plusFriendID: plusFriendID,
        snd: Sender,
        content: content,
        altSubject: altSubject,
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
                altsjt: msgs[i].altsjt,
                altmsg: msgs[i].altmsg,
                interOPRefKey: msgs[i].interOPRefKey,
                btns: msgs[i].btns
            });
        }
    } else {
        req.msgs.push({
            rcv: msgs.rcv,
            rcvnm: msgs.rcvnm,
            msg: msgs.msg,
            altsjt: msgs.altsjt,
            altmsg: msgs.altmsg,
            interOPRefKey: msgs.interOPRefKey,
            btns: msgs.btns
        });
    }

    if (btns != null) {
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
}

//SendFMS multi (UserID)
BaseService.addMethod(KakaoService.prototype, "sendFMS_multi", function (CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, success, error) {
    this.sendFMS_multi(CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, "", success, error);
});

//SendFMS same
BaseService.addMethod(KakaoService.prototype, "sendFMS_same", function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, success, error) {
    this.sendFMS_same(CorpNum, plusFriendID, Sender, content, "", altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, "", "", success, error);
});

//SendFMS same (UserID)
BaseService.addMethod(KakaoService.prototype, "sendFMS_same", function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, success, error) {
    this.sendFMS_same(CorpNum, plusFriendID, Sender, content, "", altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, "", success, error);
});

//SendFMS same (requestNum)
BaseService.addMethod(KakaoService.prototype, "sendFMS_same", function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, requestNum, success, error) {
    this.sendFMS_same(CorpNum, plusFriendID, Sender, content, "", altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, "", success, error);
});

//CancelReserve (UserID)
KakaoService.prototype.cancelReserve = function (CorpNum, ReceiptNum, UserID, success, error) {
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
};

//CancelReserve
BaseService.addMethod(KakaoService.prototype, "cancelReserve", function (CorpNum, ReceiptNum, success, error) {
    this.cancelReserve(CorpNum, ReceiptNum, '', success, error);
});

//CancelReserveRN (UserID)
KakaoService.prototype.cancelReserveRN = function (CorpNum, RequestNum, UserID, success, error) {
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
};

//CancelReserveRN
BaseService.addMethod(KakaoService.prototype, "cancelReserveRN", function (CorpNum, RequestNum, success, error) {
    this.cancelReserveRN(CorpNum, RequestNum, '', success, error);
});

//GetMessages (UserID)
KakaoService.prototype.getMessages = function (CorpNum, ReceiptNum, UserID, success, error) {
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
};

//GetMessages
BaseService.addMethod(KakaoService.prototype, "getMessages", function (CorpNum, ReceiptNum, success, error) {
    this.getMessages(CorpNum, ReceiptNum, '', success, error);
});

//GetMessagesRN (UserID)
KakaoService.prototype.getMessagesRN = function (CorpNum, RequestNum, UserID, success, error) {
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
};

//GetMessagesRN
BaseService.addMethod(KakaoService.prototype, "getMessagesRN", function (CorpNum, RequestNum, success, error) {
    this.getMessagesRN(CorpNum, RequestNum, '', success, error);
});

KakaoService.prototype.search = function (CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, QString, UserID, success, error) {
    if (this._isNullOrEmpty(SDate)) {
        this._throwError(-99999999, '시작일자가 입력되지 않았습니다.', error);
        return;
    }

    if (this._isNullOrEmpty(EDate)) {
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
};

//Search
BaseService.addMethod(KakaoService.prototype, "search", function (CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, success, error) {
    this.search(CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, '', success, error);
});

BaseService.addMethod(KakaoService.prototype, "search", function (CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, UserID, success, error) {
    this.search(CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, '', UserID, success, error);
});

//GetUnitCost (UserID)
KakaoService.prototype.getUnitCost= function (CorpNum, KakaoType, UserID, success, error) {

    if (this._isNullOrEmpty(KakaoType)) {
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
}

//GetUnitCost
BaseService.addMethod(KakaoService.prototype, "getUnitCost", function (CorpNum, KakaoType, success, error) {
    this.getUnitCost(CorpNum, KakaoType, '', success, error);
});

//GetChargeInfo (UserID)
KakaoService.prototype.getChargeInfo= function (CorpNum, KakaoType, UserID, success, error) {
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
}

//GetChargeInfo
BaseService.addMethod(KakaoService.prototype, 'getChargeInfo', function (CorpNum, KakaoType, success, error) {
    this.getChargeInfo(CorpNum, KakaoType, '', success, error)
});

KakaoService.prototype.cancelReserveRNbyRCV =function (CorpNum, requestNum, receiveNum, UserID, success, error) {
    if (!requestNum || 0 === requestNum.length) {
        this._throwError(-99999999, "전송요청번호가 입력되지 않았습니다.", error);
        return;
    }
    if (!receiveNum || 0 === receiveNum.length) {
        this._throwError(-99999999, "수신번호가 입력되지 않았습니다.", error);
        return;
    }

    var postData = this._stringify(receiveNum)

    this._executeAction({
        uri: "/KakaoTalk/Cancel/" + requestNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(KakaoService.prototype, "cancelReserveRNbyRCV", function (CorpNum, requestNum, receiveNum, success, error) {
    this.cancelReserveRNbyRCV(CorpNum, requestNum, receiveNum, null, success, error)
})

KakaoService.prototype.cancelReservebyRCV = function (CorpNum, receiptNum, receiveNum, UserID, success, error) {

    if (!receiptNum || 0 === receiptNum.length) {
        this._throwError(-99999999, "접수번호가 입력되지 않았습니다.", error)
        return;
    }
    if (!receiveNum || 0 === receiveNum.length) {
        this._throwError(-99999999, "수신번호가 입력되지 않았습니다.", error)
        return;
    }

    var postData = this._stringify(receiveNum)
    this._executeAction({
        uri: "/KakaoTalk/" + receiptNum + "/Cancel",
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
}

BaseService.addMethod(KakaoService.prototype, "cancelReservebyRCV", function (CorpNum, receiptNum, receiveNum, success, error) {
    this.cancelReservebyRCV(CorpNum, receiptNum, receiveNum, null, success, error)
})