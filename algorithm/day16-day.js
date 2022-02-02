function solution(a, b) {
  const date = new Date(`2016-${a}-${b}`);
  const day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  return day[date.getDay()];
}

solution(5, 24); // "TUE"
