import {
  ConflictException,
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
  async getToken() {
    try {
      const result = await axios.post('https://api.iamport.kr/users/getToken', {
        imp_key: process.env.IMPORT_KEY,
        imp_secret: process.env.IMPORT_SECRET,
      });
      const { access_token } = result.data.response;
      return access_token;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }

  async checkpaid({ impUid, amount, accessToken }) {
    try {
      const result = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        {
          headers: { Authorization: accessToken },
        },
      );
      if (result.data.response.status !== 'paid')
        throw new ConflictException('결제 내역이 존재하지 않습니다.');
      if (result.data.response.amount !== amount)
        throw new UnprocessableEntityException('결제 금액이 잘못되었습니다.');
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }

  async cancel({ accessToken, impUid }) {
    try {
      const result = await axios.post(
        'https://api.iamport.kr/payments/cancel',
        {
          imp_uid: impUid,
        },
        {
          headers: { Authorization: accessToken },
        },
      );
      return result.data.response.cancel_amount;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }
}
