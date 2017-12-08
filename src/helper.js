function checkBuffer(buffer, len, maxlen) {
  if (!Buffer.isBuffer(buffer)) {
    throw new TypeError('Invalid type (expected Buffer, got ' + typeof buffer + ')');
  }

  if (!maxlen) {
    if (buffer.byteLength !== len) {
      throw new Error('Invalid buffer length (expected ' + len + ', got + ' + buffer.byteLength + ')');
    }
  } else if (buffer.byteLength < len || buffer.byteLength > maxlen) {
    throw new Error('Invalid buffer length (expected ' + len + '-' + maxlen + ', got ' + buffer.byteLength + ')');
  }
}

module.exports = {
  checkBuffer: checkBuffer
};