import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubCategory } from './entities/subCategory.entity';

interface IFindOne {
  subCategoryId: string;
}

interface IUpdate {
  subCategoryId: string;
  updateName: string;
}

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepoistory: Repository<SubCategory>,
  ) {}

  async findAll() {
    return await this.subCategoryRepoistory.find();
  }

  async findOne({ subCategoryId }: IFindOne) {
    return await this.subCategoryRepoistory.findOne({ id: subCategoryId });
  }

  async create({ name }: { name: string }) {
    return await this.subCategoryRepoistory.save({ name });
  }

  async update({ subCategoryId, updateName }: IUpdate) {
    await this.subCategoryRepoistory.update(
      { id: subCategoryId },
      { name: updateName },
    );
    return '수정완료';
  }

  async delete({ subCategoryId }) {
    return await this.subCategoryRepoistory.delete({
      id: subCategoryId,
    });
  }
}
