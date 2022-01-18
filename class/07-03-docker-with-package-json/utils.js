export function getCreatedAt() {
  const aaa = new Date();
  const yyyy = aaa.getFullYear();
  const mm = aaa.getMonth() + 1;
  const dd = aaa.getDate(); // getDay() 요일(0~6/일~토)

  return `${yyyy}-${mm}-${dd}`;
}
