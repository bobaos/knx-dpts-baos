const helper = require('./helper');

/**
 * decodes dpt7
 *
 * @param {Buffer} encoded
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 2
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 2);
  return encoded.readUInt16BE(0);
}

/**
 * encodes dpt7
 *
 * @param {number} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function fromJS(decoded) {
  var value = Number(decoded);
  const buffer = Buffer.alloc(2, 0);
  if (value < 0 || value > 65535) {
    throw new RangeError('Value out of range (expected 0-65535, got ' + value + ')');
  }
  buffer.writeUInt8(value >> 8, 0);
  buffer.writeUInt8(value & 0xFF, 1);
  return buffer;
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};