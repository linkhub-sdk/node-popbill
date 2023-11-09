module.exports.create = create;

// ASN.1 SEQUENCE 인코딩 함수 (DER 형식)
function encodeDERSequence(contents) {
  const length = contents.length;
  const lengthBytes = encodeDERLength(length);

  return Buffer.concat([Buffer.from([0x30]), lengthBytes, contents]);
}

// ASN.1 LENGTH 인코딩 함수 (DER 형식)
function encodeDERLength(length) {
    if (length < 128) {
      return Buffer.from([length]);
    } else {
      const lengthBytes = [];
      while (length > 0) {
        lengthBytes.push(length);
        length >>= 8;
      }
      // 길이 필드의 첫 번째 바이트는 추가 바이트의 개수를 나타냄
      lengthBytes.push(0x80 | lengthBytes.length);
      
      return Buffer.from(lengthBytes.reverse());
    }
  }

// UTF-8 문자열을 ASN.1 UTF8String로 인코딩 (DER 형식)
function encodeDERUTF8String(value) {
  const utf8Buffer = Buffer.from(value, "utf8");
  return Buffer.concat([
    Buffer.from([0x0c]),
    encodeDERLength(utf8Buffer.length),
    utf8Buffer,
  ]);
}

// ASN.1 NumericString을 DER 형식으로 인코딩
function encodeDERNumericString(value) {
  const numericStringBuffer = Buffer.from(value, "utf8");
  return Buffer.concat([
    Buffer.from([0x12]),
    encodeDERLength(numericStringBuffer.length),
    numericStringBuffer,
  ]);
}

// ASN.1 OctetString을 DER 형식으로 인코딩
function encodeDEROctetString(value) {
  const octetStringBuffer = Buffer.from(value, "binary");

  return Buffer.concat([
    Buffer.from([0x04]),
    encodeDERLength(octetStringBuffer.length),
    octetStringBuffer,
  ]);
}

// ASN.1 OctetString을 DER 형식으로 인코딩
function encodeBufferDEROctetString(buffer) {
    return Buffer.concat([Buffer.from([0x04]), encodeDERLength(buffer.length), buffer]);
}

function create(keyId, keyName, encSessionKey, iv, cipherText){
  
  // 데이터를 ASN.1 구조로 인코딩 (DER 형식)
  const version = encodeDERNumericString("2.0");
  
  // 데이터를 ASN.1 구조로 인코딩 (DER 형식)
  const _keyName = encodeDERUTF8String(keyId);
  const _keyId = encodeDERUTF8String(keyName);
  
  const _rsa = encodeDERUTF8String("RSA");
  const _ecb = encodeDERUTF8String("ECB");
  const _oaep = encodeDERUTF8String("OAEPWithSHA-256AndMGF1Padding");
  const _encSessionKey = encodeBufferDEROctetString(encSessionKey);
  const _aes = encodeDERUTF8String("AES");
  const _gcm = encodeDERUTF8String("GCM");
  const _nopadd = encodeDERUTF8String("NoPadding");
  const _iv = encodeDEROctetString(iv);
  const _cipherText = encodeDEROctetString(cipherText);
  
  const cipherVector = encodeDERSequence(Buffer.concat([_rsa, _ecb, _oaep, _encSessionKey, _aes, _gcm, _nopadd, _iv]));
  const keyIdVector = encodeDERSequence(Buffer.concat([_keyId, _keyName]));
  const envelopVector = encodeDERSequence(Buffer.concat([version, keyIdVector, cipherVector, _cipherText]));
  
  return envelopVector.toString("base64");
}

