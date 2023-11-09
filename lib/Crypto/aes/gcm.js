const crypto = require('crypto');

module.exports.encrypt = encrypt;

function encrypt(plaintext, secretKey, iv) {
	const cipher = crypto.createCipheriv('aes-128-gcm', secretKey, iv);
	const ciphertextTag = Buffer.concat([
		cipher.update(plaintext), 
		cipher.final(), 
		cipher.getAuthTag()
	]); 

	return ciphertextTag;
}
