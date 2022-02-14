import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from './entities/mainCategory.entity';

interface IFindOne {
  mainCategoryId: string;
}

interface IUpdate {
  mainCategoryId: string;
  updateName: string;
}

@Injectable()
export class MainCategoryService {
  constructor(
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepoistory: Repository<MainCategory>,
  ) {}

  async findAll() {
    return await this.mainCategoryRepoistory.find();
  }

  async findOne({ mainCategoryId }: IFindOne) {
    return await this.mainCategoryRepoistory.findOne({ id: mainCategoryId });
  }

  async create({ name }: { name: string }) {
    return await this.mainCategoryRepoistory.save({ name });
  }

  async update({ mainCategoryId, updateName }: IUpdate) {
    await this.mainCategoryRepoistory.update(
      { id: mainCategoryId },
      { name: updateName },
    );
    return '수정완료';
  }

  async delete({ mainCategoryId }) {
    return await this.mainCategoryRepoistory.delete({
      id: mainCategoryId,
    });
  }
}
