const helper = require('./helper');

/**
 * decodes dpt16
 *
 * @param {Buffer} encoded
 * @return {string}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not in range from 0 to 14
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 0, 14);

  var str = '';

  for (var i = 0; i < encoded.byteLength; i++) {
    const charCode = encoded.readUInt8(i);
    str += String.fromCharCode(charCode);
  }

  // Remove trailing NULL characters
  str = str.replace(/\u0000+$/, '');
  return str;
}

/**
 * encodes dpt16
 *
 * @param {string} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if any charcode of the first 14 characters of <decoded> is out of range
 */
function fromJS(decoded) {
  const chars = String(decoded);
  const buffer = Buffer.alloc(14, 0);

  for (var i = 0, j = Math.min(chars.length, 14); i < j; i++) {
    const charCode = chars.charCodeAt(i);
    if (charCode > 255) {
      throw new RangeError('Charcode out of range (expected 0-255, got ' + charCode + ')');
    }
    buffer.writeUInt8(charCode, i);
  }
  
  return buffer;
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};
