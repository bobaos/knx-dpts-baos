const helper = require('./helper');

// for simplicity I left only ASCII encoding

/**
 * decodes dpt4
 *
 * @param {Buffer} encoded
 * @return {string}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 1);

  const byte1 = encoded.readUInt8(0);
  return String.fromCharCode(byte1);
}

/**
 * encodes dpt4
 *
 * @param {string} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if the charcode of the first character of <decoded> is out of range
 */
function fromJS(decoded) {
  const chars = String(decoded);
  const charCode = chars.charCodeAt(0) || 0;

  if (charCode > 255) {
    throw new RangeError('Charcode out of range (expected 0-255, got ' + charCode + ')');
  }
  return Buffer.alloc(1, charCode)
}


module.exports = {
  fromJS: fromJS,
  toJS: toJS
};
