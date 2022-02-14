import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { SubCategory } from './entities/subCategory.entity';
import { SubCategoryService } from './subCategory.service';

@Resolver()
export class SubCategoryResolver {
  constructor(private readonly subCategoryService: SubCategoryService) {}

  @Query(() => [SubCategory])
  async fetchSubCategorys() {
    return await this.subCategoryService.findAll();
  }

  @Query(() => SubCategory)
  async fetchSubCategory(@Args('subCategoryId') subCategoryId: string) {
    return await this.subCategoryService.findOne({ subCategoryId });
  }

  @Mutation(() => SubCategory)
  async createSubCategory(@Args('name') name: string) {
    return await this.subCategoryService.create({ name });
  }

  @Mutation(() => String)
  async updateSubCategory(
    @Args('subCategoryId') subCategoryId: string,
    @Args('updateName') updateName: string,
  ) {
    return await this.subCategoryService.update({
      subCategoryId,
      updateName,
    });
  }

  @Mutation(() => Boolean)
  async deleteSubCategory(@Args('subCategoryId') subCategoryId: string) {
    return await this.subCategoryService.delete({ subCategoryId });
  }
}
