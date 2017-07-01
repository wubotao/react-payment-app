/**
 *
 * Author   : Tony Wu
 * Email    : mail@taotao.io
 */

const normalizeCvv = (value) => {
  if (!value) {
    return value;
  }
  const text = value.replace(/[^\d]/g, '');
  if (text.length <= 3) {
    return text;
  }
  return text.slice(0, 3);
};

export default normalizeCvv;

