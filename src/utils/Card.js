export const getCardType = number => {
  const regVisa = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const regMaster = /^5[1-5][0-9]{14}$/;
  const regAmex = /^3[47][0-9]{13}$/;
  const regDiscover = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
  const regJCB = /^(?:2131|1800|35\d{3})\d{11}$/;
  const text = number.replace(/[^\d]/g, '');

  if (regVisa.test(text)) {
    return 'visa';
  }
  if (regMaster.test(text)) {
    return 'mastercard';
  }
  if (regAmex.test(text)) {
    return 'amex';
  }
  if (regDiscover.test(text)) {
    return 'discover';
  }
  if (regJCB.test(text)) {
    return 'jcb';
  }
  return null;
};
