const helper = require('./helper');

/**
 * decodes dpt13
 *
 * @param {Buffer} encoded
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 4
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 4);

  var value = encoded.readUInt32BE();
  value -= 2147483648;
  return value;
}

/**
 * encodes dpt13
 *
 * @param {number} [decoded]
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function fromJS(decoded) {
  var value = Number(decoded);

  if (value < -2147483648 || value > 2147483647) {
    throw new RangeError('Value out of range (expected -2147483648-2147483647, got ' + value + ')');
  }

  value += 2147483648;

  const buffer = Buffer.alloc(4, 0);
  buffer.writeUInt32BE(value, 0);
  return buffer;
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};