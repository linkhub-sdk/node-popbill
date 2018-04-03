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
BaseService.addMethod(KakaoService.prototype, 'getURL', function (CorpNum, TOGO, UserID, success, error) {
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
});

//ListPlusFriendID
KakaoService.prototype.listPlusFriendID = function (CorpNum, success, error) {
    this.listPlusFriendID(CorpNum, '', success, error);
};
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

//GetSenderNumberList
KakaoService.prototype.getSenderNumberList = function (CorpNum, success, error) {
    this.getSenderNumberList(CorpNum, '', success, error);
};
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

//ListATSTemplate
KakaoService.prototype.listATSTemplate = function (CorpNum, success, error) {
    this.listATSTemplate(CorpNum, '', success, error);
};
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

//SendATS one
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, receiver, receiverName, success, error) {
    this.sendATS_one(CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, receiver, receiverName, "", success, error);
});
//SendATS one (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, receiver, receiverName, UserID, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altmsg: altContnet
    };

    this.sendATS_multi(CorpNum, templateCode, snd, msg, altSendType, sndDT, UserID, success, error);
});

//SendATS same
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, kakaoReceiver, success, error) {
    this.sendATS_same(CorpNum, templateCode, snd, content, altContnet, altSendType, sndDT, kakaoReceiver, '', success, error)
});
//SendATS smae (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, snd, content, altContent, altSendType, sndDT, kakaoReceiver, UserID, success, error) {
    var msg = [];

    if (Array.isArray(kakaoReceiver)) {
        for (var i in kakaoReceiver) {
            msg.push({
                rcv: kakaoReceiver[i].rcv,
                rcvnm: kakaoReceiver[i].rcvnm,
                msg: content,
                altmsg: altContent
            });
        }
    } else {
        msg.push({
            rcv: kakaoReceiver.rcv,
            rcvnm: kakaoReceiver.rcvnm,
            msg: content,
            altmsg: altContent
        });
    }

    this.sendATS_multi(CorpNum, templateCode, snd, msg, altSendType, sndDT, UserID, success, error);
});

//SendATS multi
BaseService.addMethod(KakaoService.prototype, 'sendATS_multi', function (CorpNum, templateCode, snd, kakaoReceiver, altSendType, sndDT, success, errpr) {
    this.sendATS_multi(CorpNum, templateCode, snd, kakaoReceiver, altSendType, sndDT, '', success, errpr)
});
//SendATS multi (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendATS_multi', function (CorpNum, templateCode, snd, kakaoReceiver, altSendType, sndDT, UserID, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }
    var req = {
        templateCode: templateCode,
        snd: snd,
        altSendType: altSendType,
        sndDT: sndDT,
        msgs: []
    };

    if (Array.isArray(kakaoReceiver)) {

        for (var i in kakaoReceiver) {
            req.msgs.push({
                rcv: kakaoReceiver[i].rcv,
                rcvnm: kakaoReceiver[i].rcvnm,
                msg: kakaoReceiver[i].msg,
                altmsg: kakaoReceiver[i].altmsg
            });
        }
    } else {
        req.msgs.push({
            rcv: kakaoReceiver.rcv,
            rcvnm: kakaoReceiver.rcvnm,
            msg: kakaoReceiver.msg,
            altmsg: kakaoReceiver.altmsg
        });
    }
    var postData = this._stringify(req);

    this._executeAction({
        uri: '/ATS',
        CorpNum: CorpNum,
        Data: postData,
        Method: 'POST',
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });
});

//SendFTS one
BaseService.addMethod(KakaoService.prototype, 'sendFTS_one', function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, success, error) {
    this.sendFTS_one(CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, "", success, error);
});
//SendFTS one (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_one', function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altmsg: altContent
    };

    this.sendFTS_multi(CorpNum, plusFriendID, snd, msg, altSendType, sndDT, adsYN, btns, success, error);
});

//SendFTS same
BaseService.addMethod(KakaoService.prototype, 'sendFTS_same', function (CropNum, plusFriendID, snd, content, altContent, altSendType, sndDT, kakaoReceiver, adsYN, btns, success, error) {
    this.sendFTS_same(CropNum, plusFriendID, snd, content, altContent, altSendType, sndDT, kakaoReceiver, adsYN, btns, "", success, error);
});
//SendFTS same (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_same', function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, kakaoReceiver, adsYN, btns, UserID, success, error) {
    var msg = [];

    if (Array.isArray(kakaoReceiver)) {
        for (var i in kakaoReceiver) {
            msg.push({
                rcv: kakaoReceiver[i].rcv,
                rcvnm: kakaoReceiver[i].rcvnm,
                msg: content,
                altmsg: altContent
            });
        }
    } else {
        msg.push({
            rcv: kakaoReceiver.rcv,
            rcvnm: kakaoReceiver.rcvnm,
            msg: content,
            altmsg: altContent
        });
    }

    var kakaobtns = [];

    if (Array.isArray(btns)) {
        for (var i in btns) {
            kakaobtns.push({
                t: btns[i].t,
                n: btns[i].n,
                u1: btns[i].u1,
                u2: btns[i].u2
            });
        }
    } else {
        kakaobtns.push({
            t: btns.t,
            n: btns.n,
            u1: btns.u1,
            u2: btns.u2
        });
    }

    this.sendFTS_multi(CorpNum, plusFriendID, snd, msg, altSendType, sndDT, adsYN, kakaobtns, UserID, success, error);

});

//SendFTS multi
BaseService.addMethod(KakaoService.prototype, 'sendFTS_multi', function (CropNum, plusFriendID, snd, kakaoReceiver, altSendType, sndDT, adsYN, btns, success, error) {
    this.sendFTS_multi(CropNum, plusFriendID, snd, kakaoReceiver, altSendType, sndDT, adsYN, btns, "", success, error);
});
//SendFTS multi (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_multi', function (CorpNum, plusFriendID, snd, kakaoReceiver, altSendType, sndDT, adsYN, btns, UserID, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        plusFriendID: plusFriendID,
        snd: snd,
        altSendType: altSendType,
        sndDT: sndDT,
        adsYN: adsYN,
        msgs: [],
        btns: []
    };

    if (Array.isArray(kakaoReceiver)) {
        for (var i in kakaoReceiver) {
            req.msgs.push({
                rcv: kakaoReceiver[i].rcv,
                rcvnm: kakaoReceiver[i].rcvnm,
                msg: kakaoReceiver[i].msg,
                altmsg: kakaoReceiver[i].altmsg
            });
        }
    } else {
        req.msgs.push({
            rcv: kakaoReceiver.rcv,
            rcvnm: kakaoReceiver.rcvnm,
            msg: kakaoReceiver.msg,
            altmsg: kakaoReceiver.altmsg
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
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });
});

//SenddFMS one
BaseService.addMethod(KakaoService.prototype, "sendFMS_one", function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, success, error) {
    this.sendFMS_one(CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, "", success, error);
});
//SenddFMS one (UserID)
BaseService.addMethod(KakaoService.prototype, "sendFMS_one", function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, UserID, success, error) {
    var msg = {
        rcv : receiver,
        rcvnm : receiverName,
        msg : content,
        altmsg : altContent
    };

    this.sendFMS_multi(CorpNum, plusFriendID, snd, msg, altSendType, sndDT, adsYN, imageURL, FilePath, btns, UserID, success, error);
});

//SenddFMS same
BaseService.addMethod(KakaoService.prototype, "sendFMS_same", function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, kakaoReceiver, adsYN, imageURL, FilePath, btns, success, error) {
    this.sendFMS_same(CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, kakaoReceiver, adsYN, imageURL, FilePath, btns, "", success, error);
});
//SenddFMS same (UserID)
BaseService.addMethod(KakaoService.prototype, "sendFMS_same", function (CorpNum, plusFriendID, snd, content, altContent, altSendType, sndDT, kakaoReceiver, adsYN, imageURL, FilePath, btns, UserID, success, error) {
    var msg = [];

    if (Array.isArray(kakaoReceiver)) {
        for (var i in kakaoReceiver) {
            msg.push({
                rcv: kakaoReceiver[i].rcv,
                rcvnm: kakaoReceiver[i].rcvnm,
                msg: content,
                altmsg: altContent
            });
        }
    } else {
        msg.push({
            rcv: kakaoReceiver.rcv,
            rcvnm: kakaoReceiver.rcvnm,
            msg: content,
            altmsg: altContent
        });
    }

    var kakaobtns = [];

    if (Array.isArray(btns)) {
        for (var i in btns) {
            kakaobtns.push({
                t: btns[i].t,
                n: btns[i].n,
                u1: btns[i].u1,
                u2: btns[i].u2
            });
        }
    } else {
        kakaobtns.push({
            t: btns.t,
            n: btns.n,
            u1: btns.u1,
            u2: btns.u2
        });
    }

    this.sendFMS_multi(CorpNum, plusFriendID, snd, msg, altSendType, sndDT, adsYN, imageURL, FilePath, btns, UserID, success, error);
});

//SenddFMS multi
BaseService.addMethod(KakaoService.prototype, "sendFMS_multi", function (CorpNum, plusFriendID, snd, kakaoReceiver, altSendType, sndDT, adsYN, imageURL, FilePath, btns, success, error) {
    this.sendFMS_multi(CorpNum, plusFriendID, snd, kakaoReceiver, altSendType, sndDT, adsYN, imageURL, FilePath, btns, "", success, error);
});
//SenddFMS multi (UserID)
BaseService.addMethod(KakaoService.prototype, "sendFMS_multi", function (CorpNum, plusFriendID, snd, kakaoReceiver, altSendType, sndDT, adsYN, imageURL, FilePath, btns, UserID, success, error) {
    if (!CorpNum || 0 === CorpNum.length) {
        this._throwError(-99999999, '팝빌회원 사업자번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        plusFriendID: plusFriendID,
        snd: snd,
        altSendType: altSendType,
        sndDT: sndDT,
        adsYN: adsYN,
        imageURL: imageURL,
        msgs: [],
        btns: []
    };

    if (Array.isArray(kakaoReceiver)) {
        for (var i in kakaoReceiver) {
            req.msgs.push({
                rcv: kakaoReceiver[i].rcv,
                rcvnm: kakaoReceiver[i].rcvnm,
                msg: kakaoReceiver[i].msg,
                altmsg: kakaoReceiver[i].altmsg
            });
        }
    } else {
        req.msgs.push({
            rcv: kakaoReceiver.rcv,
            rcvnm: kakaoReceiver.rcvnm,
            msg: kakaoReceiver.msg,
            altmsg: kakaoReceiver.altmsg
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
        Files: files,
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });
});

//CancelReserve
KakaoService.prototype.cancelReserve = function (CorpNum, ReceiptNum, success, error) {
    if (!ReceiptNum || 0 === ReceiptNum.length) {
        this._throwError(-99999999, '카카오톡 접수번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/KakaoTalk/' + ReceiptNum + '/Cancel',
        CorpNum: CorpNum,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

//GetMessages
KakaoService.prototype.getMessages = function (CorpNum, ReceiptNum, success, error) {
    if (!ReceiptNum || 0 === ReceiptNum.length) {
        this._throwError(-99999999, '카카오톡 접수번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/KakaoTalk/' + ReceiptNum,
        CorpNum: CorpNum,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

//Search
KakaoService.prototype.search = function (CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, success, error) {
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

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

//GetUnitCost
KakaoService.prototype.getUnitCost = function (CorpNum, KakaoType, success, error) {
    if (!KakaoType || 0 === KakaoType.length) {
        this._throwError(-99999999, '카카오톡 유형이 입력되지 않았습니다', error);
        return;
    }
    this._executeAction({
        uri: '/KakaoTalk/UnitCost?Type=' + KakaoType,
        CorpNum: CorpNum,
        success: function (respnse) {
            if (success) success(respnse.unitCost);
        },
        error: error
    });
};

//GetChargeInfo
BaseService.addMethod(KakaoService.prototype, 'getChargeInfo', function (CorpNum, KakaoType, success, error) {
    this.getChargeInfo(CorpNum, KakaoType, '', success, error)
});
//GetChargeInfo (UserID)
BaseService.addMethod(KakaoService.prototype, 'getChargeInfo', function (CorpNum, KakaoType, UserID, success, error) {
    if (!KakaoType || 0 === KakaoType.length) {
        this._throwError(-99999999, '카카오톡 유형이 입력되지 않았습니다.', error)
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