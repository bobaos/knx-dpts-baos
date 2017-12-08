const helper = require('./helper');

/**
 * decodes dpt2
 *
 * @param {Buffer} encoded
 * @return {{control: boolean, value: boolean}}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 1);
  const byte1 = encoded.readUInt8(0);
  const control = !!(byte1 & 0x02);
  const value = !!(byte1 & 0x01);
  return {
    control: control,
    value: value
  };
}

/**
 * encodes dpt2
 *
 * @param {Object} [decoded]
 * @param {boolean} [decoded.control=false]
 * @param {boolean} [decoded.value=false]
 * @return {Buffer}
 */
function fromJS(decoded) {
  var control = false;
  var value = false;
  if (decoded !== null && typeof decoded === 'object') {
    if (Object.prototype.hasOwnProperty.call(decoded, 'control')) {
      control = !!decoded.control;
    }
    if (Object.prototype.hasOwnProperty.call(decoded, 'value')) {
      value = !! decoded.value;
    }

    var controlEncoded = (control? 0x02: 0x00);
    var valueEncoded = (value? 0x01: 0x00);
    return Buffer.alloc(1, (controlEncoded|valueEncoded));
  }
  return Buffer.alloc(1, !!decoded);
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};
