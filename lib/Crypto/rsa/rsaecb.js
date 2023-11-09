const crypto = require('crypto');


module.exports.encrypt = encrypt;

// 데이터를 RSA/ECB/OAEPWITHSHA-256ANDMGF1PADDING으로 암호화
function encrypt(plaintext, publicKey){
  const ciphertext = crypto.publicEncrypt(
    {
      key: publicKey,
      oaepHash: 'sha256', // OAEP 해시 알고리즘 설정
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
    Buffer.from(plaintext)
  );
  return ciphertext;
}
