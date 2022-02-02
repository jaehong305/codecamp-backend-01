function temperature(num) {
  if (num <= 18) {
    console.log('조금 춥네요');
  } else if (num >= 19 && num <= 23) {
    console.log('날씨가 좋네요');
  } else {
    console.log('조금 덥습니다');
  }
}

temperature(13); // "조금 춥네요"
temperature(23); // "날씨가 좋네요"
temperature(27); // "조금 덥습니다"
