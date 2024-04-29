var Util = require('util');
var BaseService = require('./BaseService');

module.exports = StatementService;
Util.inherits(StatementService, BaseService);

function StatementService(configs) {
    BaseService.call(this, configs);
    this._scopes.push('121');
    this._scopes.push('122');
    this._scopes.push('123');
    this._scopes.push('124');
    this._scopes.push('125');
    this._scopes.push('126');
};

BaseService.addMethod(StatementService.prototype, "getChargeInfo", function (CorpNum, ItemCode, success, error) {
    this.getChargeInfo(CorpNum, ItemCode, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "getChargeInfo", function (CorpNum, ItemCode, UserID, success, error) {
    this._executeAction({
        uri: '/Statement/ChargeInfo/' + ItemCode,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

StatementService.prototype.getUnitCost = function (CorpNum, ItemCode, success, error) {
    this._executeAction({
        uri: '/Statement/' + ItemCode + '?cfg=UNITCOST',
        CorpNum: CorpNum,
        success: function (response) {
            if (success) success(response.unitCost);
        },
        error: error
    });
};

StatementService.prototype.checkMgtKeyInUse = function (CorpNum, ItemCode, MgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }
    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey,
        CorpNum: CorpNum,
        success: function (response) {
            if (success) {
                if (response.itemKey != null) {
                    success(true);
                } else {
                    success(false);
                }
            }
        },
        error: error
    });
};

BaseService.addMethod(StatementService.prototype, "checkMgtKeyInUse", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.checkMgtKeyInUse(CorpNum, ItemCode, MgtKey, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "register", function (CorpNum, Statement, success, error) {
    this.register(CorpNum, Statement, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "register", function (CorpNum, Statement, UserID, success, error) {
    if (Object.keys(Statement).length === 0) {
        this._throwError(-99999999, '명세서정보가 입력되지 않았습니다.', error);
        return;
    }
    var postData = this._stringify(Statement);
    this._executeAction({
        uri: '/Statement',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "update", function (CorpNum, ItemCode, MgtKey, Statement, success, error) {
    this.update(CorpNum, ItemCode, MgtKey, Statement, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "update", function (CorpNum, ItemCode, MgtKey, Statement, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }
    var postData = this._stringify(Statement);
    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'PATCH',
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "issue", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.issue(CorpNum, ItemCode, MgtKey, '', '', '', success, error);
});

BaseService.addMethod(StatementService.prototype, "issue", function (CorpNum, ItemCode, MgtKey, Memo, success, error) {
    this.issue(CorpNum, ItemCode, MgtKey, Memo, '', '', success, error);
});

BaseService.addMethod(StatementService.prototype, "issue", function (CorpNum, ItemCode, MgtKey, Memo, UserID, success, error) {
    this.issue(CorpNum, ItemCode, MgtKey, Memo, '', UserID, success, error);
});

BaseService.addMethod(StatementService.prototype, "issue", function (CorpNum, ItemCode, MgtKey, Memo, EmailSubject, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        memo: Memo,
        emailSubject: EmailSubject
    };

    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'ISSUE',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "cancel", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.cancel(CorpNum, ItemCode, MgtKey, '', '', success, error);
});

BaseService.addMethod(StatementService.prototype, "cancel", function (CorpNum, ItemCode, MgtKey, Memo, success, error) {
    this.cancel(CorpNum, ItemCode, MgtKey, Memo, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "cancel", function (CorpNum, ItemCode, MgtKey, Memo, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        memo: Memo,
    };

    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'CANCEL',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "delete", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.delete(CorpNum, ItemCode, MgtKey, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "delete", function (CorpNum, ItemCode, MgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'DELETE',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "getURL", function (CorpNum, TOGO, success, error) {
    this.getURL(CorpNum, TOGO, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "getURL", function (CorpNum, TOGO, UserID, success, error) {
    this._executeAction({
        uri: '/Statement?TG=' + TOGO,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "sendEmail", function (CorpNum, ItemCode, MgtKey, Receiver, success, error) {
    this.sendEmail(CorpNum, ItemCode, MgtKey, Receiver, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "sendEmail", function (CorpNum, ItemCode, MgtKey, Receiver, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    if (!Receiver || 0 === Receiver.length) {
        this._throwError(-99999999, '수신자 메일이 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        receiver: Receiver
    };

    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey,
        CorpNum: CorpNum,
        Data: postData,
        UserID: UserID,
        Method: 'EMAIL',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "sendSMS", function (CorpNum, ItemCode, MgtKey, Sender, Receiver, Contents, success, error) {
    this.sendSMS(CorpNum, ItemCode, MgtKey, Sender, Receiver, Contents, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "sendSMS", function (CorpNum, ItemCode, MgtKey, Sender, Receiver, Contents, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    if (!Sender || 0 === Sender.length) {
        this._throwError(-99999999, '발신번호가 입력되지 않았습니다.', error);
        return;
    }

    if (!Receiver || 0 === Receiver.length) {
        this._throwError(-99999999, '수신번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        sender: Sender,
        receiver: Receiver,
        contents: Contents
    };

    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey,
        CorpNum: CorpNum,
        Data: postData,
        UserID: UserID,
        Method: 'SMS',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "sendFAX", function (CorpNum, ItemCode, MgtKey, Sender, Receiver, success, error) {
    this.sendFAX(CorpNum, ItemCode, MgtKey, Sender, Receiver, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "sendFAX", function (CorpNum, ItemCode, MgtKey, Sender, Receiver, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    if (!Sender || 0 === Sender.length) {
        this._throwError(-99999999, '발신번호가 입력되지 않았습니다.', error);
        return;
    }

    if (!Receiver || 0 === Receiver.length) {
        this._throwError(-99999999, '수신번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        sender: Sender,
        receiver: Receiver
    };

    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey,
        CorpNum: CorpNum,
        Data: postData,
        UserID: UserID,
        Method: 'FAX',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "getDetailInfo", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.getDetailInfo(CorpNum, ItemCode, MgtKey, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "getDetailInfo", function (CorpNum, ItemCode, MgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey + '?Detail',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "getInfo", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.getInfo(CorpNum, ItemCode, MgtKey, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "getInfo", function (CorpNum, ItemCode, MgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "getInfos", function (CorpNum, ItemCode, MgtKeyList, success, error) {
    this.getInfos(CorpNum, ItemCode, MgtKeyList, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "getInfos", function (CorpNum, ItemCode, MgtKeyList, UserID, success, error) {
    if (!MgtKeyList || 0 === MgtKeyList.length) {
        this._throwError(-99999999, '문서번호배열이 입력되지 않았습니다.', error);
        return;
    }

    var postData = this._stringify(MgtKeyList);

    this._executeAction({
        uri: '/Statement/' + ItemCode,
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "getLogs", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.getLogs(CorpNum, ItemCode, MgtKey, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "getLogs", function (CorpNum, ItemCode, MgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey + '/Logs',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "getPopUpURL", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.getPopUpURL(CorpNum, ItemCode, MgtKey, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "getPopUpURL", function (CorpNum, ItemCode, MgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey + '?TG=POPUP',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "getViewURL", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.getViewURL(CorpNum, ItemCode, MgtKey, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "getViewURL", function (CorpNum, ItemCode, MgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey + '?TG=VIEW',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "getPrintURL", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.getPrintURL(CorpNum, ItemCode, MgtKey, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "getPrintURL", function (CorpNum, ItemCode, MgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey + '?TG=PRINT',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "getEPrintURL", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.getEPrintURL(CorpNum, ItemCode, MgtKey, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "getEPrintURL", function (CorpNum, ItemCode, MgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey + '?TG=EPRINT',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "getMailURL", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.getMailURL(CorpNum, ItemCode, MgtKey, '', success, error);
});


BaseService.addMethod(StatementService.prototype, "getMailURL", function (CorpNum, ItemCode, MgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey + '?TG=MAIL',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "getMassPrintURL", function (CorpNum, ItemCode, MgtKeyList, success, error) {
    this.getMassPrintURL(CorpNum, ItemCode, MgtKeyList, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "getMassPrintURL", function (CorpNum, ItemCode, MgtKeyList, UserID, success, error) {
    if (!MgtKeyList || 0 === MgtKeyList.length) {
        this._throwError(-99999999, '문서번호배열이 입력되지 않았습니다.', error);
        return;
    }

    var postData = this._stringify(MgtKeyList);

    this._executeAction({
        uri: '/Statement/' + ItemCode + '?Print',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        Method: 'POST',
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
});


BaseService.addMethod(StatementService.prototype, "attachFile", function (CorpNum, ItemCode, MgtKey, DisplayName, FilePaths, success, error) {
    this.attachFile(CorpNum, ItemCode, MgtKey, DisplayName, FilePaths, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "attachFile", function (CorpNum, ItemCode, MgtKey, DisplayName, FilePaths, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        DisplayName: DisplayName
    };
    var postData = this._stringify(req);

    var files = [];
    for (var i in FilePaths) {
        files.push({
            fileName: FilePaths[i],
            fieldName: "Filedata"
        });
    }

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey + '/Files',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        Data: postData,
        Files: files,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "getFiles", function (CorpNum, ItemCode, MgtKey, success, error) {
    this.getFiles(CorpNum, ItemCode, MgtKey, '', success, error);
});

StatementService.prototype.getFiles = function (CorpNum, ItemCode, MgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey + '/Files',
        CorpNum: CorpNum,
        Method: 'GET',
        UserID: UserID,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

BaseService.addMethod(StatementService.prototype, "deleteFile", function (CorpNum, ItemCode, MgtKey, FileID, success, error) {
    this.deleteFile(CorpNum, ItemCode, MgtKey, FileID, '', success, error);
});


BaseService.addMethod(StatementService.prototype, "deleteFile", function (CorpNum, ItemCode, MgtKey, FileID, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서번호가 입력되지 않았습니다.', error);
        return;
    }

    if (!FileID || 0 === FileID.length) {
        this._throwError(-99999999, '파일아이디(FileID)가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey + '/Files/' + FileID,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'DELETE',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "FAXSend", function (CorpNum, Statement, sendNum, receiveNum, success, error) {
    this.FAXSend(CorpNum, Statement, sendNum, receiveNum, "", success, error);
});

BaseService.addMethod(StatementService.prototype, "FAXSend", function (CorpNum, Statement, sendNum, receiveNum, UserID, success, error) {
    if (Object.keys(Statement).length === 0) {
        this._throwError(-99999999, '명세서정보가 입력되지 않았습니다.', error);
        return;
    }

    if (!sendNum || 0 === sendNum.length) {
        this._throwError(-99999999, '발신번호가 입력되지 않았습니다.', error);
        return;
    }

    if (!receiveNum || 0 === receiveNum.length) {
        this._throwError(-99999999, '수신번호가 입력되지 않았습니다.', error);
        return;
    }

    Statement.receiveNum = receiveNum;
    Statement.sendNum = sendNum;

    var postData = this._stringify(Statement);

    this._executeAction({
        uri: '/Statement',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'FAX',
        Data: postData,
        success: function (response) {
            if (success) success(response.receiptNum);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "registIssue", function (CorpNum, Statement, success, error) {
    this.registIssue(CorpNum, Statement, '', '', '', success, error);
});

BaseService.addMethod(StatementService.prototype, "registIssue", function (CorpNum, Statement, Memo, success, error) {
    this.registIssue(CorpNum, Statement, Memo, '', '', success, error);
});

BaseService.addMethod(StatementService.prototype, "registIssue", function (CorpNum, Statement, Memo, UserID, success, error) {
    this.registIssue(CorpNum, Statement, Memo, UserID, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "registIssue", function (CorpNum, Statement, Memo, UserID, EmailSubject, success, error) {
    if (Object.keys(Statement).length === 0) {
        this._throwError(-99999999, '명세서정보가 입력되지 않았습니다.', error);
        return;
    }

    Statement.memo = Memo;
    Statement.emailSubject = EmailSubject;

    var postData = this._stringify(Statement);

    this._executeAction({
        uri: '/Statement',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'ISSUE',
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "search", function (CorpNum, DType, SDate, EDate, State, ItemCode, Order, Page, PerPage, success, error) {
    return this.search(CorpNum, DType, SDate, EDate, State, ItemCode, "", Order, Page, PerPage, success, error);
});

BaseService.addMethod(StatementService.prototype, "search", function (CorpNum, DType, SDate, EDate, State, ItemCode, QString, Order, Page, PerPage, success, error) {
    return this.search(CorpNum, DType, SDate, EDate, State, ItemCode, QString, Order, Page, PerPage, '', success, error);
});

BaseService.addMethod(StatementService.prototype, "search", function (CorpNum, DType, SDate, EDate, State, ItemCode, QString, Order, Page, PerPage, UserID, success, error) {
    if (!DType || 0 === DType.length) {
        this._throwError(-99999999, '검색일자 유형이 입력되지 않았습니다.', error);
        return;
    }

    if (!SDate || 0 === SDate.length) {
        this._throwError(-99999999, '시작일자가 입력되지 않았습니다.', error);
        return;
    }

    if (!EDate || 0 === EDate.length) {
        this._throwError(-99999999, '종료일자가 입력되지 않았습니다.', error);
        return;
    }

    var targetURI = '/Statement/Search?DType=' + DType;
    targetURI += '&SDate=' + SDate;
    targetURI += '&EDate=' + EDate;
    if (!!State)
        targetURI += '&State=' + State.toString();
    if (!!ItemCode)
        targetURI += '&ItemCode=' + ItemCode.toString();
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


BaseService.addMethod(StatementService.prototype, "attachStatement", function (CorpNum, ItemCode, MgtKey, SubItemCode, SubMgtKey, success, error) {
    this.attachStatement(CorpNum, ItemCode, MgtKey, SubItemCode, SubMgtKey, '', success, error);
});


StatementService.prototype.attachStatement = function (CorpNum, ItemCode, MgtKey, SubItemCode, SubMgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서 문서번호가 입력되지 않았습니다.', error);
        return;
    }

    if (!SubItemCode || 0 === SubItemCode.length) {
        this._throwError(-99999999, '첨부할 명세서 종류코드가 입력되지 않았습니다.', error);
        return;
    }

    if (!SubMgtKey || 0 === SubMgtKey.length) {
        this._throwError(-99999999, '첨부할 명세서 문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        ItemCode: SubItemCode,
        MgtKey: SubMgtKey
    };

    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey + '/AttachStmt',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

BaseService.addMethod(StatementService.prototype, "detachStatement", function (CorpNum, ItemCode, MgtKey, SubItemCode, SubMgtKey, success, error) {
    this.detachStatement(CorpNum, ItemCode, MgtKey, SubItemCode, SubMgtKey, '', success, error);
});

StatementService.prototype.detachStatement = function (CorpNum, ItemCode, MgtKey, SubItemCode, SubMgtKey, UserID, success, error) {
    if (!MgtKey || 0 === MgtKey.length) {
        this._throwError(-99999999, '문서 문서번호가 입력되지 않았습니다.', error);
        return;
    }

    if (!SubItemCode || 0 === SubItemCode.length) {
        this._throwError(-99999999, '첨부해제할 명세서 종류코드가 입력되지 않았습니다.', error);
        return;
    }

    if (!SubMgtKey || 0 === SubMgtKey.length) {
        this._throwError(-99999999, '첨부해제할 명세서 문서번호가 입력되지 않았습니다.', error);
        return;
    }

    var req = {
        ItemCode: SubItemCode,
        MgtKey: SubMgtKey
    };

    var postData = this._stringify(req);

    this._executeAction({
        uri: '/Statement/' + ItemCode + '/' + MgtKey + '/DetachStmt',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        Data: postData,
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
};

StatementService.prototype.getSealURL = function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/Member?TG=SEAL',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url);
        },
        error: error
    });
};

BaseService.addMethod(StatementService.prototype, "listEmailConfig", function (CorpNum, success, error) {
    this.listEmailConfig(CorpNum, "", success, error);
});

BaseService.addMethod(StatementService.prototype, "listEmailConfig", function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/Statement/EmailSendConfig',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});

BaseService.addMethod(StatementService.prototype, "updateEmailConfig", function (CorpNum, EmailType, SendYN, success, error) {
    this.updateEmailConfig(CorpNum, EmailType, SendYN, "", success, error);
});

BaseService.addMethod(StatementService.prototype, "updateEmailConfig", function (CorpNum, EmailType, SendYN, UserID, success, error) {
    if (!EmailType || 0 === EmailType.length) {
        this._throwError(-99999999, '메일전송타입(EmailType)이 입력되지 않았습니다.', error);
        return;
    }

    if (0 === SendYN.length) {
        this._throwError(-99999999, '메일전송여부(SendYN)가 입력되지 않았습니다.', error);
        return;
    }

    this._executeAction({
        uri: '/Statement/EmailSendConfig?EmailType=' + EmailType + '&SendYN=' + SendYN,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'POST',
        success: function (response) {
            if (success) success(response);
        },
        error: error
    });
});
