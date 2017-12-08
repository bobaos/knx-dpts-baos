const helper = require('./helper');

/**
 * decodes dpt1
 *
 * @param {Buffer} encoded
 * @return {boolean}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 1);
  const byte1 = encoded.readUInt8(0);
  return !!(byte1&0x01);
}

/**
 * encodes dpt1
 *
 * @param {boolean} [decoded=false]
 * @return {Buffer}
 */
function fromJS(decoded) {
  return Buffer.alloc(1, !!decoded);
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};