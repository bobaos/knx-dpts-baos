const helper = require('./helper');

/**
 * decodes dpt12
 *
 * @param {Buffer} encoded
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 4
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 4);
  
  return encoded.readUInt32BE(0);
}

/**
 * encodes dpt12
 *
 * @param {number} [decoded]
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function fromJS(decoded) {
  const value = Number(decoded);

  if (value < 0 || value > 4294967295) {
    throw new RangeError('Value out of range (expected 0-4294967295, got ' + value + ')');
  }

  const buffer = Buffer.alloc(4, 0);
  buffer.writeUInt32BE(value, 0);
  return buffer;
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};