import { ProductService } from './services/product.service.js';
import { CashService } from './services/cash.service.js';

export class ProductController {
  buyProduct = (req, res) => {
    const cashService = new CashService();
    const hasMoney = cashService.checkValue();

    const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 3. 상품 구매하는 코드
    if (hasMoney && !isSoldout) {
      res.send('상품을 구매합니다.');
    }
  };

  refundProduct = (req, res) => {
    const productService = new ProductService();
    const isSoldout = productService.checkSoldout();

    // 2. 상품 환불하는 코드
    if (isSoldout) {
      res.send('상품을 환불합니다.');
    }
  };
}
