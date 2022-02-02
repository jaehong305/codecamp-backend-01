import { Injectable } from '@nestjs/common';
import { Starbucks } from './entities/starbucks.entity';

@Injectable()
export class StarbucksService {
  findAll(): Starbucks[] {
    return [
      {
        name: '아메리카노',
        price: 4000,
        kcal: 5,
        fat: 0,
        protein: 0,
        natrium: 1,
        sugar: 0,
        caffeine: 70,
      },
      {
        name: '콜드브루',
        price: 4000,
        kcal: 5,
        fat: 0,
        protein: 0,
        natrium: 1,
        sugar: 0,
        caffeine: 70,
      },
      {
        name: '카페라떼',
        price: 4000,
        kcal: 5,
        fat: 0,
        protein: 0,
        natrium: 1,
        sugar: 0,
        caffeine: 70,
      },
      {
        name: '핫초코',
        price: 4000,
        kcal: 5,
        fat: 0,
        protein: 0,
        natrium: 1,
        sugar: 0,
        caffeine: 70,
      },
      {
        name: '프라푸치노',
        price: 4000,
        kcal: 5,
        fat: 0,
        protein: 0,
        natrium: 1,
        sugar: 0,
        caffeine: 70,
      },
    ];
  }

  create(args): string {
    console.log(args);
    return '커피등록성공';
  }
}
