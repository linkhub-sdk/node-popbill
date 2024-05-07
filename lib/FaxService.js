var Util = require('util');
var BaseService = require('./BaseService');

module.exports = FaxService;
Util.inherits(FaxService, BaseService);

function FaxService(configs) {
    BaseService.call(this, configs);
    this._scopes.push('160');
    this._scopes.push('161');
};

BaseService.addMethod(FaxService.prototype, "getChargeInfo", function (CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', '', success, error);
});

BaseService.addMethod(FaxService.prototype, "getChargeInfo", function (CorpNum, UserID, success, error) {
    this.getChargeInfo(CorpNum, '', UserID, success, error);
});

BaseService.addMethod(FaxService.prototype, "getChargeInfo", function (CorpNum, ReceiveNumType, UserID, success, error) {
    this._executeAction({
        uri: '/FAX/ChargeInfo?receiveNumType=' + encodeURIComponent(ReceiveNumType),
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

FaxService.prototype.getUnitCost = function (CorpNum, ReceiveNumType, UserID, success, error) {
    this._executeAction({
        uri: '/FAX/UnitCost?receiveNumType=' + encodeURIComponent(ReceiveNumType),
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.unitCost);
        },
        error: error
    });
}

BaseService.addMethod(FaxService.prototype, 'getUnitCost', function (CorpNum, success, error) {
    this.getUnitCost(CorpNum, '', '', success, error);
});

BaseService.addMethod(FaxService.prototype, 'getUnitCost', function (CorpNum, ReceiveNumType, success, error) {
    this.getUnitCost(CorpNum, ReceiveNumType, '', success, error);
});


BaseService.addMethod(FaxService.prototype, 'checkSenderNumber', function (CorpNum, SenderNumber, success, error) {
    this.checkSenderNumber(CorpNum, SenderNumber, '', success, error);
});

BaseService.addMethod(FaxService.prototype, 'checkSenderNumber', function (CorpNum, SenderNumber, UserID, success, error) {
    if (SenderNumber === null || SenderNumber === "") {
        this._throwError(-99999999, '확인할 발신번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/FAX/CheckSenderNumber/' + SenderNumber,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(FaxService.prototype, "sendFax", function (CorpNum, Sender, Receiver, ReceiverName, FilePaths, ReserveDT, SenderName, AdsYN, Title, RequestNum, UserID, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        FilePaths: FilePaths,
        ReserveDT: ReserveDT,
        AdsYN: AdsYN,
        Title: Title,
        RequestNum: RequestNum,
        UserID: UserID,
    }
    this.sendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFax", function (CorpNum, Sender, Receiver, ReceiverName, FilePaths, ReserveDT, SenderName, AdsYN, Title, RequestNum, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        FilePaths: FilePaths,
        ReserveDT: ReserveDT,
        AdsYN: AdsYN,
        Title: Title,
        RequestNum: RequestNum,
    }
    this.sendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFax", function (CorpNum, Sender, Receiver, ReceiverName, FilePaths, ReserveDT, SenderName, AdsYN, Title, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        FilePaths: FilePaths,
        ReserveDT: ReserveDT,
        AdsYN: AdsYN,
        Title: Title,
    }
    this.sendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFax", function (CorpNum, Sender, Receiver, ReceiverName, FilePaths, ReserveDT, SenderName, AdsYN, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        FilePaths: FilePaths,
        ReserveDT: ReserveDT,
        AdsYN: AdsYN,
    }
    this.sendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFax", function (CorpNum, Sender, Receiver, ReceiverName, FilePaths, ReserveDT, SenderName, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        FilePaths: FilePaths,
        ReserveDT: ReserveDT
    }
    this.sendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFax", function (CorpNum, Sender, Receiver, ReceiverName, FilePaths, ReserveDT, success, error) {
    var options = {
        SenderNum: Sender,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        FilePaths: FilePaths,
        ReserveDT: ReserveDT
    }
    this.sendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFax", function (CorpNum, Sender, Receivers, FilePaths, ReserveDT, success, error) {
    var options = {
        SenderNum: Sender,
        FilePaths: FilePaths,
        Receiver: Receivers,
        ReserveDT: ReserveDT
    }
    this.sendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFaxBinary", function (CorpNum, Sender, Receiver, ReceiverName, BinaryFiles, ReserveDT, SenderName, AdsYN, Title, RequestNum, UserID, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        BinaryFiles: BinaryFiles,
        ReserveDT: ReserveDT,
        AdsYN: AdsYN,
        Title: Title,
        RequestNum: RequestNum,
        UserID: UserID,
    }
    this.sendFaxBinary(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFaxBinary", function (CorpNum, Sender, Receiver, ReceiverName, BinaryFiles, ReserveDT, SenderName, AdsYN, Title, RequestNum, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        BinaryFiles: BinaryFiles,
        ReserveDT: ReserveDT,
        AdsYN: AdsYN,
        Title: Title,
        RequestNum: RequestNum,
    }
    this.sendFaxBinary(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFaxBinary", function (CorpNum, Sender, Receiver, ReceiverName, BinaryFiles, ReserveDT, SenderName, AdsYN, Title, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        BinaryFiles: BinaryFiles,
        ReserveDT: ReserveDT,
        AdsYN: AdsYN,
        Title: Title,
    }
    this.sendFaxBinary(CorpNum, options, success, error);
});


BaseService.addMethod(FaxService.prototype, "sendFaxBinary", function (CorpNum, Sender, Receiver, ReceiverName, BinaryFiles, ReserveDT, SenderName, AdsYN, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        BinaryFiles: BinaryFiles,
        ReserveDT: ReserveDT,
        AdsYN: AdsYN,
    }
    this.sendFaxBinary(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFaxBinary", function (CorpNum, Sender, Receiver, ReceiverName, BinaryFiles, ReserveDT, SenderName, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        BinaryFiles: BinaryFiles,
        ReserveDT: ReserveDT
    }
    this.sendFaxBinary(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFaxBinary", function (CorpNum, Sender, Receiver, ReceiverName, BinaryFiles, ReserveDT, success, error) {
    var options = {
        SenderNum: Sender,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        BinaryFiles: BinaryFiles,
        ReserveDT: ReserveDT
    }
    this.sendFaxBinary(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFaxBinary", function (CorpNum, Sender, Receivers, BinaryFiles, ReserveDT, success, error) {
    var options = {
        SenderNum: Sender,
        BinaryFiles: BinaryFiles,
        Receiver: Receivers,
        ReserveDT: ReserveDT
    }
    this.sendFaxBinary(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "sendFaxBinary", function (CorpNum, options, success, error) {
    if (!options) {
        this._throwError(-99999999, "전송 정보가 입력되지 않았습니다.", error);
        return;
    }
    if (!options.BinaryFiles) {
        this._throwError(-99999999, "전송할 파일목록이 입력되지 않았습니다.", error);
        return;
    }

    var req = {
        snd: options.SenderNum,
        sndnm: options.SenderName,
        fCnt: typeof options.BinaryFiles === 'string' ? 1 : options.BinaryFiles.length,
        sndDT: options.ReserveDT,
        title: options.Title,
        adsYN: options.AdsYN,
        requestNum: options.RequestNum,
        rcvs: []
    };


    if (typeof options.Receiver === 'string') {
        req.rcvs.push({
            rcv: options.Receiver,
            rcvnm: options.ReceiverName,
            interOPRefKey: options.interOPRefKey
        });
    } else if (Array.isArray(options.Receiver)) {
        for (var i in options.Receiver) {
            req.rcvs.push({
                rcv: options.Receiver[i].receiveNum,
                rcvnm: options.Receiver[i].receiveName,
                interOPRefKey: options.Receiver[i].interOPRefKey
            });
        }
    } else {
        req.rcvs.push({
            rcv: options.Receiver.receiveName,
            rcvnm: options.Receiver.receiveNum,
            interOPRefKey: options.Receiver.interOPRefKey
        });
    }

    var postData = this._stringify(req);
    var files = [];

    for (var i in options.BinaryFiles) {
        files.push({
            fieldName: 'file',
            fileName: options.BinaryFiles[i].fileName,
            fileData: options.BinaryFiles[i].fileData
        });
    }

    this._executeAction({
        uri: '/FAX',
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: options.UserID,
        Data: postData,
        BinaryFiles: files,
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });
});


BaseService.addMethod(FaxService.prototype, "sendFax", function (CorpNum, options, success, error) {
    if (!options) {
        this._throwError(-99999999, "전송 정보가 입력되지 않았습니다.", error);
        return;
    }
    if (!options.FilePaths) {
        this._throwError(-99999999, "전송할 파일목록이 입력되지 않았습니다.", error);
        return;
    }

    var req = {
        snd: options.SenderNum,
        sndnm: options.SenderName,
        fCnt: typeof options.FilePaths === 'string' ? 1 : options.FilePaths.length,
        sndDT: options.ReserveDT,
        title: options.Title,
        adsYN: options.AdsYN,
        requestNum: options.RequestNum,
        rcvs: []
    };

    if (typeof options.Receiver === 'string') {
        req.rcvs.push({
            rcv: options.Receiver,
            rcvnm: options.ReceiverName,
            interOPRefKey: options.interOPRefKey
        });
    } else if (Array.isArray(options.Receiver)) {
        for (var i in options.Receiver) {
            req.rcvs.push({
                rcv: options.Receiver[i].receiveNum,
                rcvnm: options.Receiver[i].receiveName,
                interOPRefKey: options.Receiver[i].interOPRefKey
            });
        }
    } else {
        req.rcvs.push({
            rcv: options.Receiver.receiveName,
            rcvnm: options.Receiver.receiveNum,
            interOPRefKey: options.Receiver.interOPRefKey
        });
    }

    var postData = this._stringify(req);
    var files = [];

    for (var i in options.FilePaths) {
        files.push({
            fieldName: 'file',
            fileName: options.FilePaths[i]
        });
    }

    this._executeAction({
        uri: '/FAX',
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: options.UserID,
        Data: postData,
        Files: files,
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });
});

BaseService.addMethod(FaxService.prototype, "resendFax", function (CorpNum, ReceiptNum, Sender, SenderName, Receiver, ReceiverName, ReserveDT, Title, RequestNum, UserID, success, error) {
    var options = {
        ReceiptNum: ReceiptNum,
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        ReserveDT: ReserveDT,
        Title: Title,
        RequestNum: RequestNum,
        UserID: UserID,
    }
    this.resendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "resendFax", function (CorpNum, ReceiptNum, Sender, SenderName, Receiver, ReceiverName, ReserveDT, Title, RequestNum, success, error) {
    var options = {
        ReceiptNum: ReceiptNum,
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        ReserveDT: ReserveDT,
        Title: Title,
        RequestNum: RequestNum,
    }
    this.resendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "resendFax", function (CorpNum, ReceiptNum, Sender, SenderName, Receiver, ReceiverName, ReserveDT, Title, success, error) {
    var options = {
        ReceiptNum: ReceiptNum,
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        ReserveDT: ReserveDT,
        Title: Title,
    }
    this.resendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "resendFax", function (CorpNum, ReceiptNum, Sender, SenderName, Receiver, ReceiverName, ReserveDT, success, error) {
    var options = {
        ReceiptNum: ReceiptNum,
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        ReserveDT: ReserveDT,
    }
    this.resendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "resendFax", function (CorpNum, ReceiptNum, Sender, SenderName, Receivers, ReserveDT, success, error) {
    var options = {
        ReceiptNum: ReceiptNum,
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receivers,
        ReserveDT: ReserveDT
    }
    this.resendFax(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "resendFax", function (CorpNum, options, success, error) {
    if (!options.ReceiptNum) {
        this._throwError(-99999999, "팩스접수번호(ReceiptNum)가 입력되지 않았습니다.", error);
        return;
    }

    var req = {
        rcvs: []
    };

    if (options.SenderNum != "") req['snd'] = options.SenderNum;
    if (options.SenderName != "") req['sndnm'] = options.SenderName;
    if (options.sndDT != "") req['sndDT'] = options.ReserveDT;
    if (options.Title != "") req['title'] = options.Title;
    if (options.RequestNum != "") req['requestNum'] = options.RequestNum;

    if (options.Receiver != null) {
        if (typeof options.Receiver === 'string') {
            req.rcvs.push({
                rcv: options.Receiver,
                rcvnm: options.ReceiverName,
                interOPRefKey: options.interOPRefKey
            });
        } else if (Array.isArray(options.Receiver)) {
            for (var i in options.Receiver) {
                req.rcvs.push({
                    rcv: options.Receiver[i].receiveNum,
                    rcvnm: options.Receiver[i].receiveName,
                    interOPRefKey: options.Receiver[i].interOPRefKey
                });
            }
        } else {
            req.rcvs.push({
                rcv: options.Receiver.receiveName,
                rcvnm: options.Receiver.receiveNum,
                interOPRefKey: options.Receiver.interOPRefKey
            });
        }
    }

    var postData = this._stringify(req);

    this._executeAction({
        uri: '/FAX/' + options.ReceiptNum,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: options.UserID,
        Data: postData,
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });
});


BaseService.addMethod(FaxService.prototype, "resendFaxRN", function (CorpNum, OrgRequestNum, RequestNum, Title, success, error) {
    var options = {
        RequestNum: RequestNum,
        Title: Title,
        OrgRequestNum: OrgRequestNum,
    }
    this.resendFaxRN(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "resendFaxRN", function (CorpNum, OrgRequestNum, Sender, SenderName, ReserveDT, Title, RequestNum, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        ReserveDT: ReserveDT,
        Title: Title,
        RequestNum: RequestNum,
        OrgRequestNum: OrgRequestNum,
    }
    this.resendFaxRN(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "resendFaxRN", function (CorpNum, OrgRequestNum, Receiver, ReceiverName, ReserveDT, Title, RequestNum, success, error) {
    var options = {
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        ReserveDT: ReserveDT,
        Title: Title,
        RequestNum: RequestNum,
        OrgRequestNum: OrgRequestNum,
    }
    this.resendFaxRN(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "resendFaxRN", function (CorpNum, OrgRequestNum, Sender, SenderName, Receivers, ReserveDT, Title, RequestNum, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receivers,
        ReserveDT: ReserveDT,
        Title: Title,
        RequestNum: RequestNum,
        OrgRequestNum: OrgRequestNum,
    }
    this.resendFaxRN(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "resendFaxRN", function (CorpNum, OrgRequestNum, Sender, SenderName, Receiver, ReceiverName, ReserveDT, Title, RequestNum, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        ReserveDT: ReserveDT,
        Title: Title,
        RequestNum: RequestNum,
        OrgRequestNum: OrgRequestNum,
    }
    this.resendFaxRN(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "resendFaxRN", function (CorpNum, OrgRequestNum, Sender, SenderName, Receiver, ReceiverName, ReserveDT, Title, RequestNum, UserID, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        ReserveDT: ReserveDT,
        Title: Title,
        RequestNum: RequestNum,
        OrgRequestNum: OrgRequestNum,
        UserID: UserID,
    }
    this.resendFaxRN(CorpNum, options, success, error);
});

BaseService.addMethod(FaxService.prototype, "resendFaxRN", function (CorpNum, options, success, error) {
    if (!options.OrgRequestNum) {
        this._throwError(-99999999, "원본 팩스 요청번호가 입력되지 않았습니다.", error);
        return;
    }

    var req = {
        rcvs: []
    };

    if (options.SenderNum != "") req['snd'] = options.SenderNum;
    if (options.SenderName != "") req['sndnm'] = options.SenderName;
    if (options.sndDT != "") req['sndDT'] = options.ReserveDT;
    if (options.Title != "") req['title'] = options.Title;
    if (options.RequestNum != "") req['requestNum'] = options.RequestNum;

    if (options.Receiver != null) {
        if (typeof options.Receiver === 'string') {
            req.rcvs.push({
                rcv: options.Receiver,
                rcvnm: options.ReceiverName,
                interOPRefKey: options.interOPRefKey
            });
        } else if (Array.isArray(options.Receiver)) {
            for (var i in options.Receiver) {
                req.rcvs.push({
                    rcv: options.Receiver[i].receiveNum,
                    rcvnm: options.Receiver[i].receiveName,
                    interOPRefKey: options.Receiver[i].interOPRefKey
                });
            }
        } else {
            req.rcvs.push({
                rcv: options.Receiver.receiveName,
                rcvnm: options.Receiver.receiveNum,
                interOPRefKey: options.Receiver.interOPRefKey
            });
        }
    }

    var postData = this._stringify(req);

    this._executeAction({
        uri: '/FAX/Resend/' + options.OrgRequestNum,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: options.UserID,
        Data: postData,
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });
});

FaxService.prototype.getFaxResult = function (CorpNum, ReceiptNum, UserID, success, error) {
    if (!ReceiptNum || 0 === ReceiptNum.length) {
        this._throwError(-99999999, '접수번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/FAX/' + ReceiptNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

BaseService.addMethod(FaxService.prototype, 'getFaxResult', function (CorpNum, ReceiptNum, success, error) {
    this.getFaxResult(CorpNum, ReceiptNum, '', success, error)
});

FaxService.prototype.getFaxResultRN = function (CorpNum, RequestNum, UserID, success, error) {
    if (!RequestNum || 0 === RequestNum.length) {
        this._throwError(-99999999, '전송요청번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/FAX/Get/' + RequestNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

BaseService.addMethod(FaxService.prototype, 'getFaxResultRN', function (CorpNum, RequestNum, success, error) {
    this.getFaxResultRN(CorpNum, RequestNum, '', success, error)
});

BaseService.addMethod(FaxService.prototype, "getURL", function (CorpNum, TOGO, success, error) {
    this.getURL(CorpNum, TOGO, '', success, error);
});

BaseService.addMethod(FaxService.prototype, "getURL", function (CorpNum, TOGO, UserID, success, error) {
    this._executeAction({
        uri: '/FAX/?TG=' + TOGO,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
});

FaxService.prototype.getSentListURL = function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/FAX/?TG=BOX',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
};

FaxService.prototype.getSenderNumberMgtURL = function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/FAX/?TG=SENDER',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
};


FaxService.prototype.cancelReserve = function (CorpNum, ReceiptNum, UserID, success, error) {
    if (!ReceiptNum || 0 === ReceiptNum.length) {
        this._throwError(-99999999, '접수번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/FAX/' + ReceiptNum + '/Cancel',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

BaseService.addMethod(FaxService.prototype, 'cancelReserve', function (CorpNum, ReceiptNum, success, error) {
    this.cancelReserve(CorpNum, ReceiptNum, '', success, error)
});

FaxService.prototype.cancelReserveRN = function (CorpNum, RequestNum, UserID, success, error) {
    if (!RequestNum || 0 === RequestNum.length) {
        this._throwError(-99999999, '전송요청번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/FAX/Cancel/' + RequestNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

BaseService.addMethod(FaxService.prototype, 'cancelReserveRN', function (CorpNum, RequestNum, success, error) {
    this.cancelReserveRN(CorpNum, RequestNum, '', success, error)
});

BaseService.addMethod(FaxService.prototype, "search", function (CorpNum, SDate, EDate, success, error) {
    this.search(CorpNum, SDate, EDate, null, false, false, 'D', 1, 500, "", "", success, error)
});

BaseService.addMethod(FaxService.prototype, "search", function (CorpNum, SDate, EDate, UserID, success, error) {
    this.search(CorpNum, SDate, EDate, null, false, false, 'D', 1, 500, "", UserID, success, error)
});

BaseService.addMethod(FaxService.prototype, "search", function (CorpNum, SDate, EDate, State, ReserveYN, SenderOnly, Order, Page, PerPage, success, error) {
    this.search(CorpNum, SDate, EDate, State, ReserveYN, SenderOnly, Order, Page, PerPage, "", "", success, error)
});

BaseService.addMethod(FaxService.prototype, "search", function (CorpNum, SDate, EDate, State, ReserveYN, SenderOnly, Order, Page, PerPage, QString, UserID, success, error) {

    if (!SDate) {
        this._throwError(-99999999, "시작일자가 입력되지 않았습니다. ", error)
        return;
    }
    if (!this._checkDate(SDate)) {
        this._throwError(-99999999, "시작일자 형식이 올바르지 않습니다.", error)
        return;
    }

    if (!EDate) {
        this._throwError(-99999999, "종료일자가 입력되지 않았습니다. ", error)
        return;
    }
    if (!this._checkDate(EDate)) {
        this._throwError(-99999999, "종료일자 형식이 올바르지 않습니다.", error)
        return;
    }

    var targetURI = '/FAX/Search?SDate=' + SDate;
    targetURI += '&EDate=' + EDate;
    if (!!State)
        targetURI += '&State=' + State.toString();

    if (ReserveYN)
        targetURI += '&ReserveYN=1';
    if (SenderOnly)
        targetURI += '&SenderOnly=1';

    if (!!Order)
        targetURI += '&Order=' + Order;
    if (!!Page)
        targetURI += '&Page=' + Page;
    if (!!PerPage)
        targetURI += '&PerPage=' + PerPage;

    if (!!QString)
        targetURI += '&QString=' + encodeURIComponent(QString);

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

BaseService.addMethod(FaxService.prototype, 'getSenderNumberList', function (CorpNum, success, error) {
    this.getSenderNumberList(CorpNum, '', success, error);
});


BaseService.addMethod(FaxService.prototype, 'getSenderNumberList', function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/FAX/SenderNumber',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});


BaseService.addMethod(FaxService.prototype, 'getPreviewURL', function (CorpNum, ReceiptNum, success, error) {
    this.getPreviewURL(CorpNum, ReceiptNum, '', success, error);
});

BaseService.addMethod(FaxService.prototype, 'getPreviewURL', function (CorpNum, ReceiptNum, UserID, success, error) {
    this._executeAction({
        uri: '/FAX/Preview/' + ReceiptNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
});
