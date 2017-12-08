const helper = require('./helper');

/**
 * decodes dpt9
 *
 * @param {Buffer} encoded
 * @param {Object} [options]
 * @param {number} [options.decimals=2]
 * @return {number}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 2
 */
function toJS(encoded, options) {
  helper.checkBuffer(encoded, 2);

  var decimals = 2;

  if (options !== null && typeof options === 'object') {
    if (Object.prototype.hasOwnProperty.call(options, 'decimals')) {
      decimals = Number(options.decimals)
    }
  }

  const int = encoded.readUInt16BE(0);

  const sign = !!(int & 0x8000);
  const exp = (int & 0x7800) >> 11;
  var mant = int & 0x7FF;

  if (sign) {
    mant = -(~(mant - 1) & 0x07FF)
  }

  const value = (0.01 * mant) * Math.pow(2, exp);
  return parseFloat(value.toFixed(decimals))
}

/**
 * encodes dpt9
 *
 * @param {number} decoded
 * @return {Buffer}
 *
 * @throws {RangeError} Will throw an error if <decoded> is out of range
 */
function fromJS(decoded) {
  var value = Number(decoded);
  if (value < -671088.64 || value > 670760.96) {
    throw new RangeError('Value out of range (expected -671088.64-670760.96, got ' + value + ')');
  }
  var sign = 0x00;
  const exp = Math.floor(Math.max((Math.log(Math.abs(value) * 100) / Math.log(2)) - 10, 0));
  var mant = (value * 100) / (1 << exp);

  if (value < 0) {
    sign = 0x01;
    mant = (~(mant * -1) + 1) & 0x07FF
  }

  value = Math.round((sign << 15) | (exp << 11) | mant) & 0xFFFF;

  const buffer = Buffer.alloc(2, 0);
  buffer.writeUInt8(value >> 8, 0);
  buffer.writeUInt8(value & 0xFF, 1);
  return buffer
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};