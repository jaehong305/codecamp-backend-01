import express from 'express';
import { ProductService } from './product.js';
import { CashService } from './cash.js';

const app = express();

// 상품 구매하기
app.post('/products/buy', (req, res) => {
  const cashService = new CashService();
  const hasMoney = cashService.checkValue();

  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();
  // 3. 상품 구매하는 코드
  if (hasMoney && !isSoldout) {
    res.send('상품을 구매합니다.');
  }
});

// 상품 환불하기
app.post('/products/refund', (req, res) => {
  const productService = new ProductService();
  const isSoldout = productService.checkSoldout();
  // 2. 상품 환불하는 코드
  if (isSoldout) {
    res.send('상품을 환불합니다.');
  }
});

app.listen(3000);
