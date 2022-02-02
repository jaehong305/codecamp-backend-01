import { CashService } from './services/cash.service.js';

export class CouponController {
  buyCoupon = (req, res) => {
    const moneyService = new CashService();
    const hasMoney = moneyService.checkValue();

    // 2. 쿠폰 구매하는 코드(10줄)
    if (hasMoney) {
      res.send('쿠폰을 구매합니다.');
    }
  };
}
