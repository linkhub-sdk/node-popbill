var Util = require('util')
var BaseService = require('./BaseService')

module.exports = FaxService
Util.inherits(FaxService, BaseService)

function FaxService(configs) {
    BaseService.call(this, configs)
    this._scopes.push('160')
    this._scopes.push('161')
}

FaxService.prototype.getChargeInfo = function(CorpNum, ReceiveNumType, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (!this._isNullOrEmpty(ReceiveNumType)) {
        if (ReceiveNumType !== '지능' || ReceiveNumType !== '일반') {
            this._throwError('수신번호 유형이 올바르지 않습니다.', error)
            return
        }
    } else {
        ReceiveNumType = '일반'
    }

    this._executeAction({
        uri: '/FAX/ChargeInfo?receiveNumType=' + encodeURIComponent(ReceiveNumType),
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'getChargeInfo', function(CorpNum, success, error) {
    this.getChargeInfo(CorpNum, '', '', success, error)
})

FaxService.prototype.getUnitCost = function(CorpNum, ReceiveNumType, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (!this._isNullOrEmpty(ReceiveNumType)) {
        if (ReceiveNumType !== '지능' || ReceiveNumType !== '일반') {
            this._throwError('수신번호 유형이 올바르지 않습니다.', error)
            return
        }
    } else {
        ReceiveNumType = '일반'
    }

    this._executeAction({
        uri: '/FAX/UnitCost?receiveNumType=' + encodeURIComponent(ReceiveNumType),
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response.unitCost)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'getUnitCost', function(CorpNum, success, error) {
    this.getUnitCost(CorpNum, '', '', success, error)
})

FaxService.prototype.checkSenderNumber = function(CorpNum, SenderNumber, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(SenderNumber)) {
        this._throwError('확인할 발신번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/FAX/CheckSenderNumber/' + SenderNumber,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'checkSenderNumber', function(CorpNum, SenderNumber, success, error) {
    this.checkSenderNumber(CorpNum, SenderNumber, '', success, error)
})

FaxService.prototype.sendFax = function(CorpNum, options, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(options)) {
        this._throwError('전송 정보가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(options.FilePaths)) {
        this._throwError('전송할 파일목록이 입력되지 않았습니다.', error)
        return
    }

    var req = {
        snd: options.SenderNum,
        sndnm: options.SenderName,
        fCnt: typeof options.FilePaths === 'string' ? 1 : options.FilePaths.length,
        sndDT: options.ReserveDT,
        title: options.Title,
        adsYN: options.AdsYN,
        requestNum: options.RequestNum,
        rcvs: [],
    }

    if (typeof options.Receiver === 'string') {
        req.rcvs.push({
            rcv: options.Receiver,
            rcvnm: options.ReceiverName,
            interOPRefKey: options.interOPRefKey,
        })
    } else if (Array.isArray(options.Receiver)) {
        for (var i in options.Receiver) {
            req.rcvs.push({
                rcv: options.Receiver[i].receiveNum,
                rcvnm: options.Receiver[i].receiveName,
                interOPRefKey: options.Receiver[i].interOPRefKey,
            })
        }
    } else {
        req.rcvs.push({
            rcv: options.Receiver.receiveName,
            rcvnm: options.Receiver.receiveNum,
            interOPRefKey: options.Receiver.interOPRefKey,
        })
    }

    var postData = this._stringify(req)
    var files = []

    for (var i in options.FilePaths) {
        files.push({
            fieldName: 'file',
            fileName: options.FilePaths[i],
        })
    }

    this._executeAction({
        uri: '/FAX',
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: options.UserID,
        Data: postData,
        Files: files,
        success: function(response) {
            if (success) success(response.receiptNum)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'sendFax', function(CorpNum, Sender, Receiver, ReceiverName, FilePaths, ReserveDT, SenderName, AdsYN, Title, RequestNum, UserID, success, error) {
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
    this.sendFax(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'sendFax', function(CorpNum, Sender, Receiver, ReceiverName, FilePaths, ReserveDT, SenderName, AdsYN, Title, RequestNum, success, error) {
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
    this.sendFax(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'sendFax', function(CorpNum, Sender, Receiver, ReceiverName, FilePaths, ReserveDT, SenderName, AdsYN, Title, success, error) {
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
    this.sendFax(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'sendFax', function(CorpNum, Sender, Receiver, ReceiverName, FilePaths, ReserveDT, SenderName, AdsYN, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        FilePaths: FilePaths,
        ReserveDT: ReserveDT,
        AdsYN: AdsYN,
    }
    this.sendFax(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'sendFax', function(CorpNum, Sender, Receiver, ReceiverName, FilePaths, ReserveDT, SenderName, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        FilePaths: FilePaths,
        ReserveDT: ReserveDT,
    }
    this.sendFax(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'sendFax', function(CorpNum, Sender, Receiver, ReceiverName, FilePaths, ReserveDT, success, error) {
    var options = {
        SenderNum: Sender,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        FilePaths: FilePaths,
        ReserveDT: ReserveDT,
    }
    this.sendFax(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'sendFax', function(CorpNum, Sender, Receivers, FilePaths, ReserveDT, success, error) {
    var options = {
        SenderNum: Sender,
        FilePaths: FilePaths,
        Receiver: Receivers,
        ReserveDT: ReserveDT,
    }
    this.sendFax(CorpNum, options, success, error)
})

FaxService.prototype.sendFaxBinary = function(CorpNum, options, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(options)) {
        this._throwError('전송 정보가 입력되지 않았습니다.', error)
        return
    }
    if (this._isNullOrEmpty(options.FilePaths)) {
        this._throwError('전송할 파일목록이 입력되지 않았습니다.', error)
        return
    }

    var req = {
        snd: options.SenderNum,
        sndnm: options.SenderName,
        fCnt: typeof options.BinaryFiles === 'string' ? 1 : options.BinaryFiles.length,
        sndDT: options.ReserveDT,
        title: options.Title,
        adsYN: options.AdsYN,
        requestNum: options.RequestNum,
        rcvs: [],
    }


    if (typeof options.Receiver === 'string') {
        req.rcvs.push({
            rcv: options.Receiver,
            rcvnm: options.ReceiverName,
            interOPRefKey: options.interOPRefKey,
        })
    } else if (Array.isArray(options.Receiver)) {
        for (var i in options.Receiver) {
            req.rcvs.push({
                rcv: options.Receiver[i].receiveNum,
                rcvnm: options.Receiver[i].receiveName,
                interOPRefKey: options.Receiver[i].interOPRefKey,
            })
        }
    } else {
        req.rcvs.push({
            rcv: options.Receiver.receiveName,
            rcvnm: options.Receiver.receiveNum,
            interOPRefKey: options.Receiver.interOPRefKey,
        })
    }

    var postData = this._stringify(req)
    var files = []

    for (var i in options.BinaryFiles) {
        files.push({
            fieldName: 'file',
            fileName: options.BinaryFiles[i].fileName,
            fileData: options.BinaryFiles[i].fileData,
        })
    }

    this._executeAction({
        uri: '/FAX',
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: options.UserID,
        Data: postData,
        BinaryFiles: files,
        success: function(response) {
            if (success) success(response.receiptNum)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'sendFaxBinary', function(CorpNum, Sender, Receiver, ReceiverName, BinaryFiles, ReserveDT, SenderName, AdsYN, Title, RequestNum, UserID, success, error) {
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
    this.sendFaxBinary(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'sendFaxBinary', function(CorpNum, Sender, Receiver, ReceiverName, BinaryFiles, ReserveDT, SenderName, AdsYN, Title, RequestNum, success, error) {
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
    this.sendFaxBinary(CorpNum, options, success, error)
})


BaseService.addMethod(FaxService.prototype, 'sendFaxBinary', function(CorpNum, Sender, Receiver, ReceiverName, BinaryFiles, ReserveDT, SenderName, AdsYN, Title, success, error) {
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
    this.sendFaxBinary(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'sendFaxBinary', function(CorpNum, Sender, Receiver, ReceiverName, BinaryFiles, ReserveDT, SenderName, AdsYN, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        BinaryFiles: BinaryFiles,
        ReserveDT: ReserveDT,
        AdsYN: AdsYN,
    }
    this.sendFaxBinary(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'sendFaxBinary', function(CorpNum, Sender, Receiver, ReceiverName, BinaryFiles, ReserveDT, SenderName, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        BinaryFiles: BinaryFiles,
        ReserveDT: ReserveDT,
    }
    this.sendFaxBinary(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'sendFaxBinary', function(CorpNum, Sender, Receiver, ReceiverName, BinaryFiles, ReserveDT, success, error) {
    var options = {
        SenderNum: Sender,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        BinaryFiles: BinaryFiles,
        ReserveDT: ReserveDT,
    }
    this.sendFaxBinary(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'sendFaxBinary', function(CorpNum, Sender, Receivers, BinaryFiles, ReserveDT, success, error) {
    var options = {
        SenderNum: Sender,
        BinaryFiles: BinaryFiles,
        Receiver: Receivers,
        ReserveDT: ReserveDT,
    }
    this.sendFaxBinary(CorpNum, options, success, error)
})

FaxService.prototype.resendFax = function(CorpNum, options, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(options.ReceiptNum)) {
        this._throwError('팩스접수번호(ReceiptNum)가 입력되지 않았습니다.', error)
        return
    }

    var req = {
        rcvs: [],
    }

    if (!this._isNullOrEmpty(options.SenderNum)) req['snd'] = options.SenderNum
    if (!this._isNullOrEmpty(options.SenderName)) req['sndnm'] = options.SenderName
    if (!this._isNullOrEmpty(options.sndDT)) req['sndDT'] = options.ReserveDT
    if (!this._isNullOrEmpty(options.Title)) req['title'] = options.Title
    if (!this._isNullOrEmpty(options.RequestNum)) req['requestNum'] = options.RequestNum

    if (this._isNullOrEmpty(options.Receiver)) {
        if (typeof options.Receiver === 'string') {
            req.rcvs.push({
                rcv: options.Receiver,
                rcvnm: options.ReceiverName,
                interOPRefKey: options.interOPRefKey,
            })
        } else if (Array.isArray(options.Receiver)) {
            for (var i in options.Receiver) {
                req.rcvs.push({
                    rcv: options.Receiver[i].receiveNum,
                    rcvnm: options.Receiver[i].receiveName,
                    interOPRefKey: options.Receiver[i].interOPRefKey,
                })
            }
        } else {
            req.rcvs.push({
                rcv: options.Receiver.receiveName,
                rcvnm: options.Receiver.receiveNum,
                interOPRefKey: options.Receiver.interOPRefKey,
            })
        }
    }

    var postData = this._stringify(req)

    this._executeAction({
        uri: '/FAX/' + options.ReceiptNum,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: options.UserID,
        Data: postData,
        success: function(response) {
            if (success) success(response.receiptNum)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'resendFax', function(CorpNum, ReceiptNum, Sender, SenderName, Receiver, ReceiverName, ReserveDT, Title, RequestNum, UserID, success, error) {
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
    this.resendFax(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'resendFax', function(CorpNum, ReceiptNum, Sender, SenderName, Receiver, ReceiverName, ReserveDT, Title, RequestNum, success, error) {
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
    this.resendFax(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'resendFax', function(CorpNum, ReceiptNum, Sender, SenderName, Receiver, ReceiverName, ReserveDT, Title, success, error) {
    var options = {
        ReceiptNum: ReceiptNum,
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        ReserveDT: ReserveDT,
        Title: Title,
    }
    this.resendFax(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'resendFax', function(CorpNum, ReceiptNum, Sender, SenderName, Receiver, ReceiverName, ReserveDT, success, error) {
    var options = {
        ReceiptNum: ReceiptNum,
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        ReserveDT: ReserveDT,
    }
    this.resendFax(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'resendFax', function(CorpNum, ReceiptNum, Sender, SenderName, Receivers, ReserveDT, success, error) {
    var options = {
        ReceiptNum: ReceiptNum,
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receivers,
        ReserveDT: ReserveDT,
    }
    this.resendFax(CorpNum, options, success, error)
})


FaxService.prototype.resendFaxRN = function(CorpNum, options, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(options.OrgRequestNum)) {
        this._throwError('원본 팩스 요청번호가 입력되지 않았습니다.', error)
        return
    }

    var req = {
        rcvs: [],
    }

    if (!this._isNullOrEmpty(options.SenderNum)) req['snd'] = options.SenderNum
    if (!this._isNullOrEmpty(options.SenderName)) req['sndnm'] = options.SenderName
    if (!this._isNullOrEmpty(options.sndDT)) req['sndDT'] = options.ReserveDT
    if (!this._isNullOrEmpty(options.Title)) req['title'] = options.Title
    if (!this._isNullOrEmpty(options.RequestNum)) req['requestNum'] = options.RequestNum

    if (!this._isNullOrEmpty(options.Receiver)) {
        if (typeof options.Receiver === 'string') {
            req.rcvs.push({
                rcv: options.Receiver,
                rcvnm: options.ReceiverName,
                interOPRefKey: options.interOPRefKey,
            })
        } else if (Array.isArray(options.Receiver)) {
            for (var i in options.Receiver) {
                req.rcvs.push({
                    rcv: options.Receiver[i].receiveNum,
                    rcvnm: options.Receiver[i].receiveName,
                    interOPRefKey: options.Receiver[i].interOPRefKey,
                })
            }
        } else {
            req.rcvs.push({
                rcv: options.Receiver.receiveName,
                rcvnm: options.Receiver.receiveNum,
                interOPRefKey: options.Receiver.interOPRefKey,
            })
        }
    }

    var postData = this._stringify(req)

    this._executeAction({
        uri: '/FAX/Resend/' + options.OrgRequestNum,
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: options.UserID,
        Data: postData,
        success: function(response) {
            if (success) success(response.receiptNum)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'resendFaxRN', function(CorpNum, OrgRequestNum, RequestNum, Title, success, error) {
    var options = {
        RequestNum: RequestNum,
        Title: Title,
        OrgRequestNum: OrgRequestNum,
    }
    this.resendFaxRN(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'resendFaxRN', function(CorpNum, OrgRequestNum, Sender, SenderName, ReserveDT, Title, RequestNum, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        ReserveDT: ReserveDT,
        Title: Title,
        RequestNum: RequestNum,
        OrgRequestNum: OrgRequestNum,
    }
    this.resendFaxRN(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'resendFaxRN', function(CorpNum, OrgRequestNum, Receiver, ReceiverName, ReserveDT, Title, RequestNum, success, error) {
    var options = {
        Receiver: Receiver,
        ReceiverName: ReceiverName,
        ReserveDT: ReserveDT,
        Title: Title,
        RequestNum: RequestNum,
        OrgRequestNum: OrgRequestNum,
    }
    this.resendFaxRN(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'resendFaxRN', function(CorpNum, OrgRequestNum, Sender, SenderName, Receivers, ReserveDT, Title, RequestNum, success, error) {
    var options = {
        SenderNum: Sender,
        SenderName: SenderName,
        Receiver: Receivers,
        ReserveDT: ReserveDT,
        Title: Title,
        RequestNum: RequestNum,
        OrgRequestNum: OrgRequestNum,
    }
    this.resendFaxRN(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'resendFaxRN', function(CorpNum, OrgRequestNum, Sender, SenderName, Receiver, ReceiverName, ReserveDT, Title, RequestNum, success, error) {
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
    this.resendFaxRN(CorpNum, options, success, error)
})

BaseService.addMethod(FaxService.prototype, 'resendFaxRN', function(CorpNum, OrgRequestNum, Sender, SenderName, Receiver, ReceiverName, ReserveDT, Title, RequestNum, UserID, success, error) {
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
    this.resendFaxRN(CorpNum, options, success, error)
})


FaxService.prototype.getFaxResult = function(CorpNum, ReceiptNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(ReceiptNum)) {
        this._throwError('접수번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/FAX/' + ReceiptNum,
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'getFaxResult', function(CorpNum, ReceiptNum, success, error) {
    this.getFaxResult(CorpNum, ReceiptNum, '', success, error)
})

FaxService.prototype.getFaxResultRN = function(CorpNum, RequestNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(RequestNum)) {
        this._throwError('전송요청번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/FAX/Get/' + RequestNum,
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'getFaxResultRN', function(CorpNum, RequestNum, success, error) {
    this.getFaxResultRN(CorpNum, RequestNum, '', success, error)
})


FaxService.prototype.getURL = function(CorpNum, TOGO, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(TOGO)) {
        this._throwError('접근 메뉴가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/FAX/?TG=' + TOGO,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function(response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'getURL', function(CorpNum, TOGO, success, error) {
    this.getURL(CorpNum, TOGO, '', success, error)
})

FaxService.prototype.getSentListURL = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/FAX/?TG=BOX',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'getSentListURL', function(CorpNum, success, error) {
    this.getSentListURL(CorpNum, '', success, error)
})

FaxService.prototype.getSenderNumberMgtURL = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/FAX/?TG=SENDER',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function(response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'getSenderNumberMgtURL', function(CorpNum, success, error) {
    this.getSenderNumberMgtURL(CorpNum, null, success, error)
})

FaxService.prototype.cancelReserve = function(CorpNum, ReceiptNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(ReceiptNum)) {
        this._throwError('접수번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/FAX/' + ReceiptNum + '/Cancel',
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'cancelReserve', function(CorpNum, ReceiptNum, success, error) {
    this.cancelReserve(CorpNum, ReceiptNum, null, success, error)
})

FaxService.prototype.cancelReserveRN = function(CorpNum, RequestNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(RequestNum)) {
        this._throwError('전송요청번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/FAX/Cancel/' + RequestNum,
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'cancelReserveRN', function(CorpNum, ReceiptNum, success, error) {
    this.cancelReserveRN(CorpNum, ReceiptNum, null, success, error)
})

FaxService.prototype.search = function(CorpNum, SDate, EDate, State, ReserveYN, SenderOnly, Order, Page, PerPage, QString, UserID, success, error) {
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
    
    var targetURI = '/FAX/Search?SDate=' + SDate
    targetURI += '&EDate=' + EDate
    targetURI += '&State=' + State

    if (ReserveYN)
        targetURI += '&ReserveYN=1'
    if (SenderOnly)
        targetURI += '&SenderOnly=1'

    if (!this._isNullOrEmpty(Order))
        targetURI += '&Order=' + Order
    if (!this._isNullOrEmpty(Page))
        targetURI += '&Page=' + Page
    if (!this._isNullOrEmpty(PerPage))
        targetURI += '&PerPage=' + PerPage
    if (!this._isNullOrEmpty(QString))
        targetURI += '&QString=' + encodeURIComponent(QString)

    this._executeAction({
        uri: targetURI,
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'search', function(CorpNum, SDate, EDate, State, ReserveYN, SenderOnly, Order, Page, PerPage, success, error) {
    this.search(CorpNum, SDate, EDate, State, ReserveYN, SenderOnly, Order, Page, PerPage, '', success, error)
})

BaseService.addMethod(FaxService.prototype, 'search', function(CorpNum, SDate, EDate, State, ReserveYN, SenderOnly, Order, Page, PerPage, QString, success, error) {
    this.search(CorpNum, SDate, EDate, State, ReserveYN, SenderOnly, Order, Page, PerPage, QString, '', success, error)
})

BaseService.addMethod(FaxService.prototype, 'search', function(CorpNum, SDate, EDate, State, ReserveYN, SenderOnly, Order, Page, PerPage, QString, success, error) {
    this.search(CorpNum, SDate, EDate, State, ReserveYN, SenderOnly, Order, Page, PerPage, QString, '', success, error)
})

FaxService.prototype.getSenderNumberList = function(CorpNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/FAX/SenderNumber',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function(response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'getSenderNumberList', function(CorpNum, success, error) {
    this.getSenderNumberList(CorpNum, '', success, error)
})


FaxService.prototype.getPreviewURL = function(CorpNum, ReceiptNum, UserID, success, error) {
    if (this._isNullOrEmpty(CorpNum)){
        this._throwError('팝빌회원 사업자번호가 입력되지 않았습니다.', error)
        return
    }

    if (this._isNullOrEmpty(ReceiptNum)) {
        this._throwError('접수번호가 입력되지 않았습니다.', error)
        return
    }
    this._executeAction({
        uri: '/FAX/Preview/' + ReceiptNum,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function(response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(FaxService.prototype, 'getPreviewURL', function(CorpNum, ReceiptNum, success, error) {
    this.getPreviewURL(CorpNum, ReceiptNum, '', success, error)
})