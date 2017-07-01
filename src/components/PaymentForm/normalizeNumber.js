/**
 *
 * Author   : Tony Wu
 * Email    : mail@taotao.io
 */

const normalizeNumber = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const text = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    if (text.length === 4) {
      return text + ' ';
    }
    if (text.length === 8) {
      return text.slice(0, 4) + ' ' + text.slice(4) + ' ';
    }
    if (text.length === 12) {
      return text.slice(0, 4) + ' ' + text.slice(4, 8) + ' ' + text.slice(8);
    }
  }
  if (text.length <= 4) {
    return text;
  }
  if (text.length <= 8) {
    return text.slice(0, 4) + ' ' + text.slice(4);
  }
  if (text.length <= 12) {
    return text.slice(0, 4) + ' ' + text.slice(4, 8) + ' ' + text.slice(8);
  }
  return text.slice(0, 4) + ' ' + text.slice(4, 8) + ' '
    + text.slice(8, 12) + ' ' + text.slice(12, 16);
};

export default normalizeNumber;

