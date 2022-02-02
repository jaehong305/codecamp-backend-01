export class ProductController {
  constructor(productService, moneyService) {
    this.productService = productService;
    this.moneyService = moneyService;
  }

  buyProduct = (req, res) => {
    const hasMoney = this.moneyService.checkValue();
    const isSoldout = this.productService.checkSoldout();
    // 3. 상품 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send('상품을 구매합니다.');
    }
  };

  refundProduct = (req, res) => {
    const isSoldout = this.productService.checkSoldout();
    // 2. 상품 환불하는 코드
    if (isSoldout) {
      res.send('상품을 환불합니다.');
    }
  };
}
