/**
 *
 * Author   : Tony Wu
 * Email    : mail@taotao.io
 */

const normalizeDate = (value, previousValue) => {
  if (!value) {
    return value;
  }
  const onlyNums = value.replace(/[^\d]/g, '');
  if (!previousValue || value.length > previousValue.length) {
    // typing forward
    if (onlyNums.length === 2) {
      return onlyNums + ' / ';
    }
    if (onlyNums.length === 6) {
      return onlyNums.slice(0, 2) + ' / ' + onlyNums.slice(2);
    }
  }
  if (onlyNums.length <= 2) {
    return onlyNums;
  }
  if (onlyNums.length <= 6) {
    return onlyNums.slice(0, 2) + ' / ' + onlyNums.slice(2);
  }
  return onlyNums.slice(0, 2) + ' / ' + onlyNums.slice(2, 6);
};

export default normalizeDate;

