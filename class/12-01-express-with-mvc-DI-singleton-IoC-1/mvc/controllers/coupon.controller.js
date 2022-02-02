export class CouponController {
  constructor(moneyService) {
    this.moneyService = moneyService;
  }

  buyCoupon = (req, res) => {
    const hasMoney = this.moneyService.checkValue();

    // 2. 쿠폰 구매하는 코드(10줄)
    if (hasMoney) {
      res.send('쿠폰을 구매합니다.');
    }
  };
}
