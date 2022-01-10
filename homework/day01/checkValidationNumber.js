export const checkValidationNumber = num => {
  if (num && num.includes('-')) {
    const numberArray = num.split('-');
    if (numberArray[0].length === 6 && numberArray[1].length === 7) {
      const firstNumber = numberArray[0];
      const maskingNumber = `${numberArray[1][0]}******`;
      const result = `${firstNumber}-${maskingNumber}`;
      console.log(result);
    } else {
      console.log('error, 주민등록번호는 앞 6자리 뒤 7자리 입니다.');
      return;
    }
  } else {
    console.log('error, 주민등록번호를 올바르게 입력해주세요.');
    return;
  }
};
