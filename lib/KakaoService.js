var Util = require('util')
var BaseService = require('./BaseService')

module.exports = KakaoService
Util.inherits(KakaoService, BaseService)

function KakaoService(config) {
    BaseService.call(this, config)
    this._scopes.push('153')
    this._scopes.push('154')
    this._scopes.push('155')
}

//GetURL (UserID)
KakaoService.prototype.getURL = function (CorpNum, TOGO, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(TOGO)) {
        this._throwError('접근메뉴가 입력되지 않았습니다.', error)
        return
    }

    var uri = ''
    if(TOGO === 'SENDER')
        uri = '/Message/?TG='
    else
        uri = '/KakaoTalk/?TG='

    this._executeAction({
        uri: uri + TOGO,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(KakaoService.prototype, 'getURL', function (CorpNum, TOGO, success, error) {
    this.getURL(CorpNum, TOGO, '', success, error)
})

KakaoService.prototype.getPlusFriendMgtURL = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/KakaoTalk/?TG=PLUSFRIEND',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(KakaoService.prototype, 'getPlusFriendMgtURL', function (CorpNum, success, error) {
    this.getPlusFriendMgtURL(CorpNum, '', success, error)
})

KakaoService.prototype.getSenderNumberMgtURL = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Message/?TG=SENDER',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(KakaoService.prototype, 'getSenderNumberMgtURL', function (CorpNum, success, error) {
    this.getSenderNumberMgtURL(CorpNum, '', success, error)
})

KakaoService.prototype.getATSTemplateMgtURL = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/KakaoTalk/?TG=TEMPLATE',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(KakaoService.prototype, 'getATSTemplateMgtURL', function (CorpNum, success, error) {
    this.getATSTemplateMgtURL(CorpNum, '', success, error)
})

KakaoService.prototype.getSentListURL = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/KakaoTalk/?TG=BOX',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(KakaoService.prototype, 'getSentListURL', function (CorpNum, success, error) {
    this.getSentListURL(CorpNum, '', success, error)
})

//ListPlusFriendID (UserID)
KakaoService.prototype.listPlusFriendID = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/KakaoTalk/ListPlusFriendID',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

//ListPlusFriendID
BaseService.addMethod(KakaoService.prototype, 'listPlusFriendID', function (CorpNum, success, error) {
    this.listPlusFriendID(CorpNum, '', success, error)
})

//GetSenderNumberList (UserID)
KakaoService.prototype.getSenderNumberList = function (CorpNum, UserID, success, error) {
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
            if (success) success(response)
        },
        error: error,
    })
}

//GetSenderNumberList
BaseService.addMethod(KakaoService.prototype, 'getSenderNumberList', function (CorpNum, success, error) {
    this.getSenderNumberList(CorpNum, '', success, error)
})

//GetATSTemplate (UserID)
KakaoService.prototype.getATSTemplate = function (CorpNum, templateCode, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(templateCode)) {
        this._throwError('템플릿 코드가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/KakaoTalk/GetATSTemplate/' + templateCode.trim(),
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

//GetATSTemplate
BaseService.addMethod(KakaoService.prototype, 'getATSTemplate', function (CorpNum, templateCode, success, error) {
    this.getATSTemplate(CorpNum, templateCode, '', success, error)
})

//ListATSTemplate (UserID)
KakaoService.prototype.listATSTemplate = function (CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/KakaoTalk/ListATSTemplate',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

//ListATSTemplate
BaseService.addMethod(KakaoService.prototype, 'listATSTemplate', function (CorpNum, success, error) {
    this.listATSTemplate(CorpNum, null, success, error)
})

//CheckSenderNumber (UserID)
KakaoService.prototype.checkSenderNumber = function (CorpNum, SenderNumber, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(SenderNumber)) {
        this._throwError('확인할 발신번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/KakaoTalk/CheckSenderNumber/' + SenderNumber,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

//CheckSenderNumber
BaseService.addMethod(KakaoService.prototype, 'checkSenderNumber', function (CorpNum, SenderNumber, success, error) {
    this.checkSenderNumber(CorpNum, SenderNumber, null, success, error)
})

//SendATS same (altSubject)
KakaoService.prototype.sendATS_same = function (CorpNum, templateCode, Sender, content, altSubject, altContent, altSendType, sndDT, msgs, UserID, requestNum, btns, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(templateCode)) {
        this._throwError('템플릿 코드가 입력되지 않았습니다.', error)
        return
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
        btns: [],
    }

    if (Array.isArray(msgs)) {
        for (var i in msgs) {
            req.msgs.push({
                rcv: msgs[i].rcv,
                rcvnm: msgs[i].rcvnm,
                msg: msgs[i].msg,
                altsjt: msgs[i].altsjt,
                altmsg: msgs[i].altmsg,
                interOPRefKey: msgs[i].interOPRefKey,
                btns: msgs[i].btns,
            })
        }
    } else {
        req.msgs.push({
            rcv: msgs.rcv,
            rcvnm: msgs.rcvnm,
            msg: msgs.msg,
            altsjt: msgs.altsjt,
            altmsg: msgs.altmsg,
            interOPRefKey: msgs.interOPRefKey,
            btns: msgs.btns,
        })
    }

    if (btns != null) {
        if (Array.isArray(btns)) {
            for (var i in btns) {
                req.btns.push({
                    t: btns[i].t,
                    n: btns[i].n,
                    u1: btns[i].u1,
                    u2: btns[i].u2,
                    tg: btns[i].tg,
                })
            }
        } else {
            req.btns.push({
                t: btns.t,
                n: btns.n,
                u1: btns.u1,
                u2: btns.u2,
                tg: btns.tg,
            })
        }
    }
    var postData = this._stringify(req)

    this._executeAction({
        uri: '/ATS',
        CorpNum: CorpNum,
        Data: postData,
        UserID: UserID,
        Method: 'POST',
        success: function (response) {
            if (success) success(response.receiptNum)
        },
        error: error,
    })
}

//SendATS one (altSubject)
KakaoService.prototype.sendATS_one = function (CorpNum, templateCode, Sender, content, altSubject, altContnet, altSendType, sndDT, receiver, receiverName, UserID, requestNum, btns, success, error) {

    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altsjt: altSubject,
        altmsg: altContnet,
    }

    this.sendATS_same(CorpNum, templateCode, Sender, content, altSubject, altContnet, altSendType, sndDT, msg, UserID, requestNum, btns, success, error)
}

//SendATS one
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, Sender, content, altContnet, altSendType, sndDT, receiver, receiverName, success, error) {
    this.sendATS_one(CorpNum, templateCode, Sender, content, altContnet, altSendType, sndDT, receiver, receiverName, null, null, null, success, error)
});

//SendATS one (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, Sender, content, altContnet, altSendType, sndDT, receiver, receiverName, UserID, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altmsg: altContnet,
    }

    this.sendATS_same(CorpNum, templateCode, Sender, content, null, altContnet, altSendType, sndDT, msg, UserID, null, null, success, error)
})

//SendATS one (RequestNum)
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, Sender, content, altContnet, altSendType, sndDT, receiver, receiverName, UserID, requestNum, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altmsg: altContnet,
    }

    this.sendATS_same(CorpNum, templateCode, Sender, content, null, altContnet, altSendType, sndDT, msg, UserID, requestNum, null, success, error)
})

//SendATS one (btns)
BaseService.addMethod(KakaoService.prototype, 'sendATS_one', function (CorpNum, templateCode, Sender, content, altContnet, altSendType, sndDT, receiver, receiverName, UserID, requestNum, btns, success, error) {
    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altmsg: altContnet,
    }

    this.sendATS_same(CorpNum, templateCode, Sender, content, null, altContnet, altSendType, sndDT, msg, UserID, requestNum, btns, success, error)
})

//SendATS multi (btns)
KakaoService.prototype.sendATS_multi = function (CorpNum, templateCode, Sender, altSendType, sndDT, msgs, UserID, requestNum, btns, success, error) {
    this.sendATS_same(CorpNum, templateCode, Sender, null, null, null, altSendType, sndDT, msgs, UserID, requestNum, btns, success, error)
}

//SendATS multi
BaseService.addMethod(KakaoService.prototype, 'sendATS_multi', function (CorpNum, templateCode, Sender, altSendType, sndDT, msgs, success, error) {
    this.sendATS_multi(CorpNum, templateCode, Sender, altSendType, sndDT, msgs, null, null, success, error)
})

//SendATS multi (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendATS_multi', function (CorpNum, templateCode, Sender, altSendType, sndDT, msgs, UserID, success, error) {
    this.sendATS_multi(CorpNum, templateCode, Sender, altSendType, sndDT, msgs, UserID, null, success, error)
})

//SendATS multi (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendATS_multi', function (CorpNum, templateCode, Sender, altSendType, sndDT, msgs, UserID, requestNum, success, error) {
    this.sendATS_same(CorpNum, templateCode, Sender, null, null, null, altSendType, sndDT, msgs, UserID, requestNum, null, success, error)
})

//SendATS same
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, success, error) {
    this.sendATS_same(CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, null, null, null, success, error)
})

//SendATS same (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, UserID, success, error) {
    this.sendATS_same(CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, UserID, null, null, success, error)
})

//SendATS same (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, UserID, requestNum, success, error) {
    this.sendATS_same(CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, UserID, requestNum, null, success, error)
})

//SendATS same (btns)
BaseService.addMethod(KakaoService.prototype, 'sendATS_same', function (CorpNum, templateCode, Sender, content, altContent, altSendType, sndDT, msgs, UserID, requestNum, btns, success, error) {
    this.sendATS_same(CorpNum, templateCode, Sender, content, null, altContent, altSendType, sndDT, msgs, UserID, requestNum, btns, success, error)
})

//SendFTS same (altSubject)
KakaoService.prototype.sendFTS_same = function (CorpNum, plusFriendID, Sender, content, altSubject, altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, requestNum, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(plusFriendID)) {
        this._throwError('카카오톡 검색용 아이디가 입력되지 않았습니다.', error)
        return
    }

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
        btns: [],
    }

    if (Array.isArray(msgs)) {
        for (var i in msgs) {
            req.msgs.push({
                rcv: msgs[i].rcv,
                rcvnm: msgs[i].rcvnm,
                msg: msgs[i].msg,
                altsjt: msgs[i].altsjt,
                altmsg: msgs[i].altmsg,
                interOPRefKey: msgs[i].interOPRefKey,
                btns: msgs[i].btns,
            })
        }
    } else {
        req.msgs.push({
            rcv: msgs.rcv,
            rcvnm: msgs.rcvnm,
            msg: msgs.msg,
            altsjt: msgs.altsjt,
            altmsg: msgs.altmsg,
            interOPRefKey: msgs.interOPRefKey,
            btns: msgs.btns,
        })
    }

    if (btns != null) {
        if (Array.isArray(btns)) {
            for (var i in btns) {
                req.btns.push({
                    t: btns[i].t,
                    n: btns[i].n,
                    u1: btns[i].u1,
                    u2: btns[i].u2,
                })
            }
        } else {
            req.btns.push({
                t: btns.t,
                n: btns.n,
                u1: btns.u1,
                u2: btns.u2,
            })
        }
    }
    var postData = this._stringify(req)
    this._executeAction({
        uri: '/FTS',
        CorpNum: CorpNum,
        Data: postData,
        Method: 'POST',
        UserID: UserID,
        success: function (response) {
            if (success) success(response.receiptNum)
        },
        error: error,
    })
}

//SendFTS one (altSubject)
KakaoService.prototype.sendFTS_one = function (CorpNum, plusFriendID, Sender, content, altSubject, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, requestNum, success, error) {

    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altsjt: altSubject,
        altmsg: altContent,
    }

    this.sendFTS_same(CorpNum, plusFriendID, Sender, content, altSubject, altContent, altSendType, sndDT, adsYN, msg, btns, UserID, requestNum, success, error)
}

//SendFTS one
BaseService.addMethod(KakaoService.prototype, 'sendFTS_one', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, success, error) {
    this.sendFTS_one(CorpNum, plusFriendID, Sender, content, null, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, null, null, success, error)
})

//SendFTS one (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_one', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, success, error) {
    this.sendFTS_one(CorpNum, plusFriendID, Sender, content, null, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, null, success, error)
})

//SendFTS one (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_one', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, requestNum, success, error) {
    this.sendFTS_one(CorpNum, plusFriendID, Sender, content, null, altContent, altSendType, sndDT, receiver, receiverName, adsYN, btns, UserID, requestNum, success, error)
})

//SendFTS multi (requestNum)
KakaoService.prototype.sendFTS_multi = function (CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, msgs, btns, UserID, requestNum, success, error) {
    this.sendFTS_same(CorpNum, plusFriendID, Sender, null, null, null, altSendType, sndDT, adsYN, msgs, btns, UserID, requestNum, success, error)
}

//SendFTS multi
BaseService.addMethod(KakaoService.prototype, 'sendFTS_multi', function (CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, msgs, btns, success, error) {
    this.sendFTS_multi(CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, msgs, btns, null, null, success, error)
})

//SendFTS multi (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_multi', function (CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, msgs, btns, UserID, success, error) {
    this.sendFTS_multi(CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, msgs, btns, UserID, null, success, error)
})

//SendFTS same
BaseService.addMethod(KakaoService.prototype, 'sendFTS_same', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, adsYN, msgs, btns, success, error) {
    this.sendFTS_same(CorpNum, plusFriendID, Sender, content, null, altContent, altSendType, sndDT, adsYN, msgs, btns, null, null, success, error)
})

//SendFTS same (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_same', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, success, error) {
    this.sendFTS_same(CorpNum, plusFriendID, Sender, content, null, altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, null, success, error)
})

//SendFTS same (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendFTS_same', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, requestNum, success, error) {
    this.sendFTS_same(CorpNum, plusFriendID, Sender, content, null, altContent, altSendType, sndDT, adsYN, msgs, btns, UserID, requestNum, success, error)
})

//SendFMS same (altSubject)
KakaoService.prototype.sendFMS_same = function (CorpNum, plusFriendID, Sender, content, altSubject, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, requestNum, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(plusFriendID)){
        this._throwError('카카오톡 검색용 아이디가 입력되지 않았습니다. ', error)
        return
    }

    if (typeof FilePath !== 'string') {
        this._throwError('첨부파일 경로는 문자열만 입력 가능합니다.', error);
        return;
    }

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
        btns: [],
    }

    if (Array.isArray(msgs)) {
        for (var i in msgs) {
            req.msgs.push({
                rcv: msgs[i].rcv,
                rcvnm: msgs[i].rcvnm,
                msg: msgs[i].msg,
                altsjt: msgs[i].altsjt,
                altmsg: msgs[i].altmsg,
                interOPRefKey: msgs[i].interOPRefKey,
                btns: msgs[i].btns,
            })
        }
    } else {
        req.msgs.push({
            rcv: msgs.rcv,
            rcvnm: msgs.rcvnm,
            msg: msgs.msg,
            altsjt: msgs.altsjt,
            altmsg: msgs.altmsg,
            interOPRefKey: msgs.interOPRefKey,
            btns: msgs.btns,
        })
    }

    if (btns != null) {
        if (Array.isArray(btns)) {
            for (var i in btns) {
                req.btns.push({
                    t: btns[i].t,
                    n: btns[i].n,
                    u1: btns[i].u1,
                    u2: btns[i].u2,
                })
            }
        } else {
            req.btns.push({
                t: btns.t,
                n: btns.n,
                u1: btns.u1,
                u2: btns.u2,
            })
        }
    }

    var postData = this._stringify(req)

    var files = [
        {
            fieldName: 'file',
            fileName: FilePath,
        }
    ]

    this._executeAction({
        uri: '/FMS',
        CorpNum: CorpNum,
        Data: postData,
        Method: 'POST',
        UserID: UserID,
        Files: files,
        success: function (response) {
            if (success) success(response.receiptNum)
        },
        error: error,
    })
}


//SendFMS one  (altSubject)
KakaoService.prototype.sendFMS_one = function (CorpNum, plusFriendID, Sender, content, altSubject, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, UserID, requestNum, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    var msg = {
        rcv: receiver,
        rcvnm: receiverName,
        msg: content,
        altsjt: altSubject,
        altmsg: altContent,
    }

    this.sendFMS_same(CorpNum, plusFriendID, Sender, content, altSubject, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msg, btns, UserID, requestNum, success, error)
}

//SendFMS one
BaseService.addMethod(KakaoService.prototype, 'sendFMS_one', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, success, error) {
    this.sendFMS_one(CorpNum, plusFriendID, Sender, content, null, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, null, null, success, error)
})

//SendFMS one (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFMS_one', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, UserID, success, error) {
    this.sendFMS_one(CorpNum, plusFriendID, Sender, content, null, altContent, altSendType, sndDT, receiver, receiverName, adsYN, imageURL, FilePath, btns, UserID, null, success, error)
})

//SendFMS multi (requestNum)
KakaoService.prototype.sendFMS_multi = function (CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, requestNum, success, error) {
    this.sendFMS_same(CorpNum, plusFriendID, Sender, null, null, null, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, requestNum, success, error)
}

//SendFMS multi
BaseService.addMethod(KakaoService.prototype, 'sendFMS_multi', function (CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, success, error) {
    this.sendFMS_multi(CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, null, null, success, error)
})


//SendFMS multi (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFMS_multi', function (CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, success, error) {
    this.sendFMS_multi(CorpNum, plusFriendID, Sender, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, null, success, error)
})

//SendFMS same
BaseService.addMethod(KakaoService.prototype, 'sendFMS_same', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, success, error) {
    this.sendFMS_same(CorpNum, plusFriendID, Sender, content, null, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, null, null, success, error)
})

//SendFMS same (UserID)
BaseService.addMethod(KakaoService.prototype, 'sendFMS_same', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, success, error) {
    this.sendFMS_same(CorpNum, plusFriendID, Sender, content, null, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, null, success, error)
})

//SendFMS same (requestNum)
BaseService.addMethod(KakaoService.prototype, 'sendFMS_same', function (CorpNum, plusFriendID, Sender, content, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, requestNum, success, error) {
    this.sendFMS_same(CorpNum, plusFriendID, Sender, content, null, altContent, altSendType, sndDT, adsYN, imageURL, FilePath, msgs, btns, UserID, null, success, error)
})

//CancelReserve (UserID)
KakaoService.prototype.cancelReserve = function (CorpNum, ReceiptNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(ReceiptNum)) {
        this._throwError('접수번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/KakaoTalk/' + ReceiptNum + '/Cancel',
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

//CancelReserve
BaseService.addMethod(KakaoService.prototype, 'cancelReserve', function (CorpNum, ReceiptNum, success, error) {
    this.cancelReserve(CorpNum, ReceiptNum, null, success, error)
})

//CancelReserveRN (UserID)
KakaoService.prototype.cancelReserveRN = function (CorpNum, RequestNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(RequestNum)) {
        this._throwError('전송요청번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/KakaoTalk/Cancel/' + RequestNum,
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

//CancelReserveRN
BaseService.addMethod(KakaoService.prototype, 'cancelReserveRN', function (CorpNum, RequestNum, success, error) {
    this.cancelReserveRN(CorpNum, RequestNum, null, success, error)
})

//GetMessages (UserID)
KakaoService.prototype.getMessages = function (CorpNum, ReceiptNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(ReceiptNum)) {
        this._throwError('접수번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/KakaoTalk/' + ReceiptNum,
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

//GetMessages
BaseService.addMethod(KakaoService.prototype, 'getMessages', function (CorpNum, ReceiptNum, success, error) {
    this.getMessages(CorpNum, ReceiptNum, null, success, error)
})

//GetMessagesRN (UserID)
KakaoService.prototype.getMessagesRN = function (CorpNum, RequestNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(RequestNum)) {
        this._throwError('전송요청번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/KakaoTalk/Get/' + RequestNum,
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

//GetMessagesRN
BaseService.addMethod(KakaoService.prototype, 'getMessagesRN', function (CorpNum, RequestNum, success, error) {
    this.getMessagesRN(CorpNum, RequestNum, null, success, error)
})

KakaoService.prototype.search = function (CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, QString, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(SDate)) {
        this._throwError('시작일자가 입력되지 않았습니다.', error)
        return
    }

    if (!this._isValidDate(SDate)){
        this._throwError('시작일자 유형이 올바르지 않습니다.', error)
        return
    }

    if (this._isNullOrEmpty(EDate)) {
        this._throwError('종료일자가 입력되지 않았습니다.', error)
        return
    }

    if (!this._isValidDate(EDate)){
        this._throwError('종료일자 유형이 올바르지 않습니다.', error)
        return
    }

    var targetURI = '/KakaoTalk/Search' + '?SDate=' + SDate + '&EDate=' + EDate

    if (!this._isNullOrEmpty(State)) targetURI += '&State=' + State.toString()
    if (!this._isNullOrEmpty(Item)) targetURI += '&Item=' + Item.toString()
    if (!this._isNullOrEmpty(ReserveYN)) targetURI += '&ReserveYN=' + ReserveYN
    if (SenderYN) {
        targetURI += '&SenderOnly=1';
    }else{
        targetURI += '&SenderOnly=0';
    }
    if (!this._isNullOrEmpty(Page)) targetURI += '&Page=' + Page
    if (!this._isNullOrEmpty(PerPage)) targetURI += '&PerPage=' + PerPage
    if (!this._isNullOrEmpty(Order)) targetURI += '&Order=' + Order
    if (!this._isNullOrEmpty(QString)) targetURI += '&QString=' + encodeURIComponent(QString)

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

//Search
BaseService.addMethod(KakaoService.prototype, 'search', function (CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, success, error) {
    this.search(CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, '', success, error)
})

BaseService.addMethod(KakaoService.prototype, 'search', function (CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, UserID, success, error) {
    this.search(CorpNum, SDate, EDate, State, Item, ReserveYN, SenderYN, Page, PerPage, Order, '', UserID, success, error)
})

//GetUnitCost (UserID)
KakaoService.prototype.getUnitCost = function (CorpNum, KakaoType, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KakaoType)) {
        this._throwError('카카오톡 유형이 입력되지 않았습니다', error)
        return
    }

    if (!(KakaoType === 'ATS' || KakaoType === 'FTS' || KakaoType === 'FMS')) {
        this._throwError('카카오톡 유형이 올바르지 않습니다', error)
        return
    }

    this._executeAction({
        uri: '/KakaoTalk/UnitCost?Type=' + KakaoType,
        CorpNum: CorpNum,
        Method: 'GET',
        success: function (respnse) {
            if (success) success(respnse.unitCost)
        },
        error: error,
    })
}

//GetChargeInfo (UserID)
KakaoService.prototype.getChargeInfo = function (CorpNum, KakaoType, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(KakaoType)) {
        this._throwError('카카오톡 유형이 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/KakaoTalk/ChargeInfo?Type=' + KakaoType,
        CorpNum: CorpNum,
        UserId: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

//GetChargeInfo
BaseService.addMethod(KakaoService.prototype, 'getChargeInfo', function (CorpNum, KakaoType, success, error) {
    this.getChargeInfo(CorpNum, KakaoType, '', success, error)
})

KakaoService.prototype.cancelReserveRNbyRCV = function (CorpNum, requestNum, receiveNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(requestNum)) {
        this._throwError('전송요청번호가 입력되지 않았습니다.', error)
        return
    }
    if (this._isNullOrEmpty(receiveNum)) {
        this._throwError('수신번호가 입력되지 않았습니다.', error)
        return
    }

    var postData = this._stringify(receiveNum)

    this._executeAction({
        uri: '/KakaoTalk/Cancel/' + requestNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        Data: postData,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(KakaoService.prototype, 'cancelReserveRNbyRCV', function (CorpNum, requestNum, receiveNum, success, error) {
    this.cancelReserveRNbyRCV(CorpNum, requestNum, receiveNum, '', success, error)
})

KakaoService.prototype.cancelReservebyRCV = function (CorpNum, receiptNum, receiveNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(receiptNum)) {
        this._throwError('접수번호가 입력되지 않았습니다.', error)
        return
    }
    if (this._isNullOrEmpty(receiveNum)) {
        this._throwError('수신번호가 입력되지 않았습니다.', error)
        return
    }

    var postData = this._stringify(receiveNum)
    this._executeAction({
        uri: '/KakaoTalk/' + receiptNum + '/Cancel',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        Data: postData,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(KakaoService.prototype, 'cancelReservebyRCV', function (CorpNum, receiptNum, receiveNum, success, error) {
    this.cancelReservebyRCV(CorpNum, receiptNum, receiveNum, '', success, error)
})