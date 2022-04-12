export const checkValidationNumber = num => {
  if (!num && !num.includes('-')) return 'error, 주민등록번호를 올바르게 입력해주세요.';

  const numberArray = num.split('-');
  const frontNumber = numberArray[0];
  const backNumber = numberArray[1];
  if (frontNumber.length !== 6 && backNumber.length !== 7) return 'error, 주민등록번호는 앞 6자리 뒤 7자리 입니다.';

  return `${frontNumber}-${backNumber[0]}******`;
};
