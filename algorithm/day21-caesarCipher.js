function solution(s, n) {
  return s
    .split('')
    .map(e => {
      if (e === ' ') return ' ';
      if (e === e.toLowerCase()) {
        const gap = n + e.charCodeAt() - 122;
        if (gap > 0) return String.fromCharCode(96 + gap);
      } else {
        const gAp = n + e.charCodeAt() - 90;
        if (gAp > 0) return String.fromCharCode(64 + gAp);
      }
      return String.fromCharCode(e.charCodeAt() + n);
    })
    .join('');
}

solution('AB', 1); // 'BC'
