const helper = require('./helper');

/**
 * decodes dpt18
 *
 * @param {Buffer} encoded
 * @return {{ control: boolean, sceneNumber: number }}
 *
 * @throws {Error} Will throw an error if <encoded> is not a Buffer
 * @throws {Error} Will throw an error if the byteLength of <encoded> is not equal to 1
 */
function toJS(encoded) {
  helper.checkBuffer(encoded, 1);

  const byte1 = encoded.readUInt8(0);
  const control = !!(byte1 & 0x80);
  const sceneNumber = byte1 & 0x3F;
  return {
    control: control,
    sceneNumber: sceneNumber
  };
}

/**
 * encodes dpt18
 *
 * @param {Object} [decoded]
 * @param {boolean} [decoded.control=false]
 * @param {number} [decoded.sceneNumber=0]
 * @return {Buffer}
 *
 * @throws {TypeError} Will throw an error if <decoded> is not an object
 * @throws {RangeError} Will throw an error if <decoded.sceneNumber> is out of range
 */
function fromJS(decoded) {
  var control = false;
  var sceneNumber = 0;

  if (decoded !== null && typeof decoded === 'object') {
    control = !!decoded.control;

    sceneNumber = Number(decoded.sceneNumber);
    if (sceneNumber < 0 || sceneNumber > 63) {
      throw new RangeError('Scenenumber out of range (expected 0-63, got ' + sceneNumber + ')');
    }
  } else if (typeof decoded !== 'undefined') {
    throw new TypeError('Invalid type (expected object)');
  }

  const controlEncoded = control ? 0x80 : 0x00;
  const sceneNumberEncoded = sceneNumber & 0x3F;
  return Buffer.alloc(1, controlEncoded | sceneNumberEncoded);
}

module.exports = {
  fromJS: fromJS,
  toJS: toJS
};