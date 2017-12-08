const helper = require('./helper');

/**
 * decodes dpt8
 *
 * @param {Buffer} encoded
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 2
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 2);

  const value = encoded.readUInt16BE(0);
  return value - 32768;
}

/**
 * encodes dpt8
 *
 * @param {number} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function fromJS(decoded) {
  var value = Number(decoded);
  const buffer = Buffer.alloc(2, 0);
  if (value < -32768 || value > 32767) {
    throw new RangeError('Value out of range (expected -32768-32767, got ' + value + ')');
  }
  value += 32768;
  buffer.writeUInt8(value >> 8, 0);
  buffer.writeUInt8(value & 0xFF, 1);
  return buffer;
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};