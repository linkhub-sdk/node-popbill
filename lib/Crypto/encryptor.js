const crypto = require('crypto');
const _aes = require("./aes/gcm.js");
const _rsa = require("./rsa/rsaecb.js");
const _asn1 = require("./asn1/encoder.js");

module.exports.encrypt = encrypt
module.exports.encryptByte = encryptByte

function encryptByte(encryptPublicKeyInfo , targetByteArr){
    const validCondition = encryptPublicKeyInfo.valid();
    if(validCondition){
        const sessionKey = getRandomIV(16);
        const iv = getRandomIV(16);
        const encSessionKey = _rsa.encrypt(sessionKey, encryptPublicKeyInfo.publicKey);

        return _asn1.create(encryptPublicKeyInfo.keyId,
                            encryptPublicKeyInfo.keyName,
                            encSessionKey,
                            iv,
                            _aes.encrypt(targetByteArr, sessionKey, iv));
    }
}

function encrypt(encryptPublicKeyInfo , plaintext){
    const validCondition = encryptPublicKeyInfo.valid();
    if(validCondition){
        const sessionKey = getRandomIV(16);
        const iv = getRandomIV(16);
        const encSessionKey = _rsa.encrypt(sessionKey, encryptPublicKeyInfo.publicKey);

        return _asn1.create(encryptPublicKeyInfo.keyId,
                            encryptPublicKeyInfo.keyName,
                            encSessionKey,
                            iv,
                            _aes.encrypt(Buffer.from(plaintext, "utf8"), sessionKey, iv));
    }
}

function getRandomIV(length) {
	return crypto.randomBytes(length);
}

function addAnnotation(publicKey){
    const start_line = "-----BEGIN PUBLIC KEY-----\n";
    const end_line = "-----END PUBLIC KEY-----";
    const key = [];
    // 라인별 개행 문자
    publicKey = publicKey.trim()
                            .replace(/\n/g, "")
                            .replace(/-+([a-zA-Z\s]*)-+([^-]*)-+([a-zA-Z\s]*)-+/, "$2");

    // 라인별 개행 문자 추가
    for (var pos = 1; pos <= publicKey.length; pos++) {
        key.push(publicKey.charAt(pos - 1))
        if (pos % 64 == 0) key.push("\n");
    }

    // 키 값 끝에 개행문자 추가
    if (publicKey.charAt(publicKey.length - 1) != "\n") key.push("\n");

    // start line, end line 추가
    return start_line + key.join('') + end_line;
}

function EncryptPublicKeyInfo() {
    function setkeyId(params) {
        this.keyId = params;
    }

    function setkeyName(params) {
        this.keyName = params;
    }

    function setPublicKey(params) {
        this.publicKey = addAnnotation(params);
    }

    function valid() {
        if (!this.keyId) {
            console.log("keyId가 입력되지 않았습니다.");
            return false;
        }
        if (!this.keyName) {
            console.log("keyName이 입력되지 않았습니다.");
            return false;
        }
        if (!this.publicKey) {
            console.log("publicKey가 입력되지 않았습니다.");
            return false;
        }
        return true;
    }

    return Object.freeze({
        "setkeyId": setkeyId,
        "setkeyName": setkeyName,
        "setPublicKey": setPublicKey,
        "valid": valid,
    });
}

module.exports.EncryptPublicKeyInfo = EncryptPublicKeyInfo
