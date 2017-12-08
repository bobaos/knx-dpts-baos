const helper = require('./helper');

/**
 * decodes dpt14
 *
 * @param {Buffer} encoded
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 4
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 4);

  return encoded.readFloatBE();
}

/**
 * encodes dpt14
 *
 * @param {number} [decoded]
 * @return {Buffer}
 */
function fromJS(decoded) {
  // TODO: range
  const value = Number(decoded);
  const buffer = Buffer.alloc(4, 0);
  buffer.writeFloatBE(value);
  return buffer;
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};