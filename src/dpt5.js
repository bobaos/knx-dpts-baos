const helper = require('./helper');

/**
 * decodes dpt5
 *
 * @param {Buffer} encoded
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 1);

  const byte1 = encoded.readUInt8(0);
  return byte1 & 0xff;
}


/**
 * encodes dpt5
 *
 * @param {number} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */

function fromJS(decoded) {
  var value = Number(decoded);
  if (value > 255 || value < 0) {
    throw new RangeError('Value out of range (expected 0-255, got ' + value + ')');
  }
  return Buffer.alloc(1, value);
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};
