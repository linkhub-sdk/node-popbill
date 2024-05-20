var Util = require('util')
var crypto = require('crypto')
var EventEmitter = require('events').EventEmitter
var linkhub = require('linkhub')
var http = require('https')
var path = require('path')
var fs = require('fs')
var zlib = require('zlib')
var encryptor = require('./Crypto/encryptor')

module.exports = BaseService
Util.inherits(BaseService, EventEmitter)

function BaseService(config) {
    EventEmitter.call(this)

    this._config = config
    this.ServiceID = this._config.IsTest ? 'POPBILL_TEST' : 'POPBILL'

    if (this._config.UseStaticIP != undefined) {
        this.UseStaticIP = this._config.UseStaticIP
    } else {
        this.UseStaticIP = false
    }

    if (this._config.UseGAIP != undefined) {
        this.UseGAIP = this._config.UseGAIP
    } else {
        this.UseGAIP = false
    }

    if (this.UseGAIP) {
        this.ServiceURL = this._config.IsTest ? 'ga-popbill-test.linkhub.co.kr' : 'ga-popbill.linkhub.co.kr'
    } else if (this.UseStaticIP) {
        this.ServiceURL = this._config.IsTest ? 'static-popbill-test.linkhub.co.kr' : 'static-popbill.linkhub.co.kr'
    } else {
        this.ServiceURL = this._config.IsTest ? 'popbill-test.linkhub.co.kr' : 'popbill.linkhub.co.kr'
    }

    if (this._config.IPRestrictOnOff !== undefined) {
        this.IPRestrictOnOff = this._config.IPRestrictOnOff
    } else {
        this.IPRestrictOnOff = true
    }

    if (this._config.UseLocalTimeYN !== undefined) {
        this._config.UseLocalTimeYN = this._config.UseLocalTimeYN
    } else {
        this._config.UseLocalTimeYN = true
    }

    if (this._config.EncryptKeyID && this._config.EncryptKeyName && this._config.EncryptPublicKey) {
        encryptPublicKeyInfo = new encryptor.EncryptPublicKeyInfo()
        encryptPublicKeyInfo.setkeyId(this._config.EncryptKeyID)
        encryptPublicKeyInfo.setkeyName(this._config.EncryptKeyName)
        encryptPublicKeyInfo.setPublicKey(this._config.EncryptPublicKey)

        this._encryptPublicKeyInfo = encryptPublicKeyInfo
        this._encryptor = encryptor
    }

    linkhub.initialize({
        LinkID: this._config.LinkID,
        SecretKey: this._config.SecretKey,
        UseLocalTimeYN: this._config.UseLocalTimeYN,
        defaultErrorHandler: this._config.defaultErrorHandler,
    })

    this._Linkhub_Token_Cash = {}
    this._scopes = ['member']
}

BaseService.addMethod = function (object, name, fn) {
    var old = object[name]
    object[name] = function () {
        if (fn.length === arguments.length) return fn.apply(this, arguments)
        else if (typeof old == 'function') return old.apply(this, arguments)
    }
}

BaseService.prototype._getToken = function (CorpNum, err) {
    var newToken = this._Linkhub_Token_Cash[CorpNum]
    var expired = true
    var UTCTime = linkhub.getTime(this.UseStaticIP, this.UseGAIP)

    if (typeof newToken === 'function') {
        var expiration = new Date(newToken(function () {}, err).expiration)

        if (expiration) {
            expired = Date.parse(UTCTime) > Date.parse(expiration)
        } else {
            expired = true
        }
    }

    if (expired) {
        newToken = linkhub.newToken(
            this.ServiceID,
            CorpNum,
            this._getScopes(),
            this.IPRestrictOnOff ? null : '*',
            this.UseStaticIP,
            this.UseGAIP
        )
        this._Linkhub_Token_Cash[CorpNum] = newToken
    }

    return newToken
}

BaseService.prototype._getScopes = function () {
    return this._scopes
}

BaseService.prototype.getPartnerURL = function (CorpNum, TOGO, success, error) {
    linkhub.getPartnerURL(this._getToken(CorpNum), this.UseStaticIP, this.UseGAIP, TOGO, success, error)
}

BaseService.prototype.getBalance = function (CorpNum, success, error) {
    linkhub.getBalance(this._getToken(CorpNum), this.UseStaticIP, this.UseGAIP, success, error)
}

BaseService.prototype.getPartnerBalance = function (CorpNum, success, error) {
    linkhub.getPartnerBalance(this._getToken(CorpNum), this.UseStaticIP, this.UseGAIP, success, error)
}

BaseService.prototype.getPaymentURL = function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/Member?TG=PAYMENT',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'getPaymentURL', function (CorpNum, success, error) {
    this.getPaymentURL(CorpNum, null, success, error)
})

BaseService.prototype.getUseHistoryURL = function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/Member?TG=USEHISTORY',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'getUseHistoryURL', function (CorpNum, success, error) {
    this.getUseHistoryURL(CorpNum, null, success, error)
})

BaseService.prototype.getPopbillURL = function (CorpNum, UserID, TOGO, success, error) {
    this._executeAction({
        uri: '/Member?TG=' + TOGO,
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'getPopbillURL', function (CorpNum, TOGO, success, error) {
    this.getPopbillURL(CorpNum, null, TOGO, success, error)
})

BaseService.prototype.getAccessURL = function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/Member?TG=LOGIN',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'getAccessURL', function (CorpNum, success, error) {
    this.getAccessURL(CorpNum, null, success, error)
})

BaseService.prototype.getChargeURL = function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/Member?TG=CHRG',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response.url)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'getChargeURL', function (CorpNum, success, error) {
    this.getChargeURL(CorpNum, null, success, error)
})

BaseService.prototype.checkIsMember = function (CorpNum, success, error) {
    this._executeAction({
        uri: '/Join?CorpNum=' + CorpNum + '&LID=' + this._config.LinkID,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.prototype.joinMember = function (JoinForm, success, error) {
    if (this._isNullOrEmpty(JoinForm)){
        this._throwError(-99999999, "회원정보가 입력되지 않았습니다.", error);
        return;
    }

    var postData = linkhub.stringify(JoinForm)

    this._executeAction({
        uri: '/Join',
        Method: 'POST',
        Data: postData,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.prototype.checkID = function (targetID, success, error) {
    if (this._isNullOrEmpty(targetID)){
        this._throwError(-99999999, "확인할 아이디가 입력되지 않았습니다.", error);
        return;
    }

    this._executeAction({
        uri: '/IDCheck?ID=' + targetID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.prototype.listContact = function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/IDs',
        Method: 'GET',
        CorpNum: CorpNum,
        UserID: UserID,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, "listContact", function(CorpNum, success, error){
    this.listContact(CorpNum, null, success, error);
})

BaseService.prototype.updateContact = function (CorpNum, UserID, ContactInfo, success, error) {
    if (this._isNullOrEmpty(ContactInfo)){
        this._throwError(-99999999, "담당자 정보가 입력되지 않았습니다.", error);
        return;
    }

    var postData = linkhub.stringify(ContactInfo)

    this._executeAction({
        uri: '/IDs',
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'updateContact', function(CorpNum, ContactInfo, success, error){
    this.updateContact(CorpNum, null, ContactInfo, success, error);
})

BaseService.prototype.registContact = function (CorpNum, UserID, ContactInfo, success, error) {
    if (this._isNullOrEmpty(ContactInfo)){
        this._throwError(-99999999, "담당자 정보가 입력되지 않았습니다.", error);
        return;
    }
    var postData = linkhub.stringify(ContactInfo)

    this._executeAction({
        uri: '/IDs/New',
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'registContact', function (CorpNum, ContactInfo, success, error) {
    this.registContact(CorpNum, null, ContactInfo, success, error)
})

BaseService.prototype.getContactInfo = function (CorpNum, ContactID, UserID, success, error) {
    if (this._isNullOrEmpty(ContactID)){
        this._throwError(-99999999, "담당자 아이디가 입력되지 않았습니다.", error);
        return;
    }

    var postData = '{"id":' + '"' + ContactID + '"}'
    this._executeAction({
        uri: '/Contact',
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'getContactInfo', function (CorpNum, ContactID, success, error) {
    this.getContactInfo(CorpNum, ContactID, null, success, error)
})

BaseService.prototype.getCorpInfo = function (CorpNum, success, error) {
    this._executeAction({
        uri: '/CorpInfo',
        Method: 'GET',
        CorpNum: CorpNum,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.prototype.updateCorpInfo = function (CorpNum, UserID, CorpInfo, success, error) {
    if (this._isNullOrEmpty(CorpInfo)){
        this._throwError(-99999999, "회사 정보가 입력되지 않았습니다.", error);
        return;
    }

    var postData = linkhub.stringify(CorpInfo)

    this._executeAction({
        uri: '/CorpInfo',
        Method: 'POST',
        CorpNum: CorpNum,
        UserID: UserID,
        Data: postData,
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'updateCorpInfo', function (CorpNum, CorpInfo, success, error) {
    this.updateCorpInfo(CorpNum, null, CorpInfo, success, error)
})

BaseService.prototype._executeAction = function (options) {
    var boundary = '--POPBILL--NODE--'
    var isMultiPart = options.Files ? true : false
    var isBinary = options.BinaryFiles ? true : false

    var CRLF = '\r\n'

    if (!options.Method) options.Method = 'GET'

    var headers = {}
    var Token = function (callback) {
        callback(null)
    }

    if (options.CorpNum) {
        Token = this._getToken(options.CorpNum)
    }
    var _this = this

    Token(function (token) {
        if (token) headers['Authorization'] = 'Bearer ' + token.session_token
        if (options.UserID) headers['x-pb-userid'] = options.UserID
        if (false === (options.Method === 'GET' || options.Method === 'POST')) {
            if (options.Method === 'BULKISSUE') {
                headers['x-pb-message-digest'] = crypto.createHash('sha1').update(options.Data).digest('base64')
                headers['x-pb-submit-id'] = options.SubmitID
            }
            headers['X-HTTP-Method-Override'] = options.Method
        }

        if (isMultiPart || isBinary) {
            headers['Content-Type'] = 'multipart/form-data;charset=utf-8; boundary=' + boundary
        } else {
            if (options.ContentsType) {
                headers['Content-Type'] = options.ContentsType
            } else {
                headers['Content-Type'] = 'application/json;charset=utf-8'
            }
        }

        headers['Accept-Encoding'] = 'gzip,deflate'

        headers['User-Agent'] = 'NODEJS POPBILL SDK'

        var requestOpt = {
            host: _this.ServiceURL,
            path: options.uri,
            method: options.Method === 'GET' ? 'GET' : 'POST',
            headers: headers,
        }

        var req = _this._makeRequest(
            requestOpt,
            function (response) {
                if (options.success) options.success(response)
            },
            typeof options.error === 'function' ? options.error : _this._config.defaultErrorHandler
        )

        if (options.Method !== 'GET' && options.Data) {
            if (isMultiPart || isBinary) {
                req.write(CRLF + '--' + boundary + CRLF)
                req.write('Content-Disposition: form-data; name="form"' + CRLF)
                req.write(CRLF)
                req.write(options.Data)
                req.write(CRLF)
            } else {
                req.write(options.Data)
            }
        }

        if (isBinary) {
            var fnCall = function (X) {
                if (X < options.BinaryFiles.length) {
                    var fileName = path.basename(options.BinaryFiles[X].fileName)

                    req.write('--' + boundary + CRLF)
                    req.write(
                        'Content-Disposition: form-data; name="' +
                            options.BinaryFiles[X].fieldName +
                            '"; filename="' +
                            fileName +
                            '";' +
                            CRLF,
                        'utf8'
                    )
                    req.write('Content-Type: Application/octet-stream' + CRLF)
                    req.write(CRLF)
                    req.write(options.BinaryFiles[X].fileData)
                    req.write(CRLF)
                    fnCall(X + 1)
                } else {
                    //end of Multipart
                    req.write('--' + boundary + '--' + CRLF + CRLF)
                    req.end()
                }
            }
            fnCall(0)
        } else {
            if (isMultiPart) {
                var fnCall = function (X) {
                    if (X < options.Files.length) {
                        var fileName = path.basename(options.Files[X].fileName)

                        fs.readFile(options.Files[X].fileName, function (err, data) {
                            if (err) {
                                _this._throwError(
                                    -99999999,
                                    '파일을 읽을 수 없습니다. [' + options.Files[X].fileName + ']',
                                    options.error
                                )
                                return
                            }
                            req.write('--' + boundary + CRLF)
                            req.write(
                                'Content-Disposition: form-data; name="' +
                                    options.Files[X].fieldName +
                                    '"; filename="' +
                                    fileName +
                                    '";' +
                                    CRLF,
                                'utf8'
                            )
                            req.write('Content-Type: Application/octet-stream' + CRLF)
                            req.write(CRLF)
                            req.write(data)
                            req.write(CRLF)
                            fnCall(X + 1)
                        })
                    } else {
                        //end of Multipart
                        req.write('--' + boundary + '--' + CRLF + CRLF)
                        req.end()
                    }
                }
                fnCall(0)
            } else {
                req.end()
            }
        }
    }, options.error)
}

BaseService.prototype._makeRequest = function (options, success, error) {
    var request = http.request(options, function (response) {
        var buf = new Buffer(0)
        //Gzip Compressed Response stream pipe
        if (response.headers['content-encoding'] === 'gzip') {
            var gzip = zlib.createGunzip()
            response.pipe(gzip)
            gzip.on('data', function (chunk) {
                buf = Buffer.concat([buf, chunk])
            })

            gzip.on('end', function () {
                if (response.statusCode === 200) {
                    if (response.headers['content-type'].toLowerCase() === 'application/pdf;charset=utf-8') {
                        success(buf)
                    } else {
                        success(JSON.parse(buf))
                    }
                } else if (error) {
                    error(JSON.parse(buf))
                }
            })
        } else {
            response.on('data', function (chunk) {
                buf = Buffer.concat([buf, chunk])
            })

            response.on('end', function () {
                if (this.statusCode === 200) {
                    if (response.headers['content-type'].toLowerCase() === 'application/pdf;charset=utf-8') {
                        success(buf)
                    } else {
                        success(JSON.parse(buf))
                    }
                } else if (error) {
                    error(JSON.parse(buf))
                }
            })
        }
    })

    request.on('error', function (err) {
        if (err.code !== 'ECONNRESET') console.error(err)
    })
    return request
}

BaseService.prototype._stringify = function (obj) {
    return JSON.stringify(obj, function (key, value) {
        return !value ? undefined : value
    })
}

BaseService.prototype._throwError = function (Code, Message, err) {
    if (err) err({ code: Code, message: Message })
    else if (typeof this._config.defaultErrorHandler === 'function')
        this._config.defaultErrorHandler({ code: Code, message: Message })
}

// paymetRequest
BaseService.prototype.paymentRequest = function (CorpNum, PaymentForm, UserID, success, error) {
    if (this._isNullOrEmpty(PaymentForm)){
        this._throwError(-99999999, "입금신청 정보가 입력되지 않았습니다.", error);
        return;
    }
    
    var postData = this._stringify(PaymentForm)

    this._executeAction({
        uri: '/Payment',
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

BaseService.addMethod(BaseService.prototype, 'paymentRequest', function (CorpNum, PaymentForm, success, error) {
    this.paymentRequest(CorpNum, PaymentForm, null, success, error)
})

// getSettleResult
BaseService.prototype.getSettleResult = function (CorpNum, settleCode, UserID, success, error) {
    if (this._isNullOrEmpty(settleCode)) {
        this._throwError(-99999999, '정산코드가 입력되지 않았습니다.', error)
        return
    }

    this._executeAction({
        uri: '/Payment/' + settleCode,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'getSettleResult', function (CorpNum, settleCode, success, error) {
    this.getSettleResult(CorpNum, settleCode, null, success, error)
})

// refund
BaseService.prototype.refund = function (CorpNum, RefundForm, UserID, success, error) {
    if (this._isNullOrEmpty(RefundForm)){
        this._throwError(-99999999, "환불신청 정보가 입력되지 않았습니다.", error);
        return;
    }
    
    var postData = this._stringify(RefundForm)

    this._executeAction({
        uri: '/Refund',
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

BaseService.addMethod(BaseService.prototype, 'refund', function (CorpNum, RefundForm, success, error) {
    this.refund(CorpNum, RefundForm, null, success, error)
})

// getRefundHistory
BaseService.prototype.getRefundHistory = function (CorpNum, Page, PerPage, UserID, success, error) {
    var url = '/RefundHistory'
    url += '&Page=' + !Page ? '' : Page
    url += '&PerPage=' + !PerPage ? '' : PerPage

    this._executeAction({
        uri: url,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'getRefundHistory', function (CorpNum, Page, PerPage, success, error) {
    this.getRefundHistory(CorpNum, Page, PerPage, null, success, error)
})

// getPaymentHistory
BaseService.prototype.getPaymentHistory = function (CorpNum, SDate, EDate, Page, PerPage, UserID, success, error) {
    if (this._isNullOrEmpty(SDate)){
        this._throwError(-99999999, "조회 시작일자가 입력되지 않았습니다.", error);
        return;
    }
    if (this._isNullOrEmpty(EDate)){
        this._throwError(-99999999, "조회 종료일자가 입력되지 않았습니다.", error);
        return;
    }

    var url = '/PaymentHistory'
    url += '?SDate=' + !SDate ? '' : SDate
    url += '&EDate=' + !EDate ? '' : EDate
    url += '&Page=' + !Page ? '' : Page
    url += '&PerPage=' + !PerPage ? '' : PerPage

    this._executeAction({
        uri: url,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(
    BaseService.prototype,
    'getPaymentHistory',
    function (CorpNum, SDate, EDate, Page, PerPage, success, error) {
        this.getPaymentHistory(CorpNum, SDate, EDate, Page, PerPage, null, success, error)
    }
)

// getUseHistory
BaseService.prototype.getUseHistory = function (CorpNum, SDate, EDate, Page, PerPage, Order, UserID, success, error) {
    
    if (this._isNullOrEmpty(SDate)){
        this._throwError(-99999999, "조회 시작일자가 입력되지 않았습니다.", error);
        return;
    }
    if (this._isNullOrEmpty(EDate)){
        this._throwError(-99999999, "조회 종료일자가 입력되지 않았습니다.", error);
        return;
    }
    
    var url = '/UseHistory'
    url += '?SDate=' + !SDate ? '' : SDate
    url += '&EDate=' + !EDate ? '' : EDate
    url += '&Page=' + !Page ? '' : Page
    url += '&PerPage=' + !PerPage ? '' : PerPage
    url += '&Order=' + !Order ? '' : Order

    this._executeAction({
        uri: url,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'getUseHistory', function (CorpNum, SDate, EDate, Page, PerPage, Order, success, error) {
    this.getUseHistory(CorpNum, SDate, EDate, Page, PerPage, Order, null, success, error)
})

// QuitMember 회원 탈퇴
BaseService.prototype.quitMember = function (CorpNum, QuitReason, UserID, success, error) {
    if (this._isNullOrEmpty(QuitReason)) {
        this._throwError(-99999999, '탈퇴 사유가 입력되지 않았습니다.', error)
        return
    }

    var postData = linkhub.stringify({
        quitReason: QuitReason,
    })

    this._executeAction({
        uri: '/QuitRequest',
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

BaseService.addMethod(BaseService.prototype, 'quitMember', function (CorpNum, QuitReason, success, error) {
    this.quitMember(CorpNum, QuitReason, null, success, error)
})

// GetRefundableBalance 환불 가능 포인트 조회
BaseService.prototype.getRefundableBalance = function (CorpNum, UserID, success, error) {
    this._executeAction({
        uri: '/RefundPoint',
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'getRefundableBalance', function (CorpNum, success, error) {
    this.getRefundableBalance(CorpNum, null, success, error)
})

// GetRefundInfo 환불 신청 상태 조회
BaseService.prototype.getRefundInfo = function (CorpNum, RefundCode, UserID, success, error) {
    if (this._isNullOrEmpty(RefundCode)) {
        this._throwError(-99999999, '환불코드가 입력되지 않았습니다.')
        return
    }

    var url = '/Refund/' + RefundCode

    this._executeAction({
        uri: url,
        CorpNum: CorpNum,
        UserID: UserID,
        Method: 'GET',
        success: function (response) {
            if (success) success(response)
        },
        error: error,
    })
}

BaseService.addMethod(BaseService.prototype, 'getRefundInfo', function (CorpNum, RefundCode, success, error) {
    this.getRefundInfo(CorpNum, RefundCode, null, success, error)
})

BaseService.prototype._isNullOrEmpty = function (value) {
    if (typeof value === 'boolean' || typeof value === 'number') return value
    if (typeof value === 'object') {
        if (value.constructor === Object) {
            return Object.keys(value).length === 0
        }
        if (Array.isArray(value)) {
            return value.length === 0
        }
    }

    return !value
}
