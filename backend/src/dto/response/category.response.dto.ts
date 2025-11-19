import { IsArray, IsBoolean, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";


 class SubcategoryResponseDTO {
  @IsString()
  _id!: string;

  @IsString()
  name!: string;

  static fromEntity(entity: any): SubcategoryResponseDTO {
    const dto = new SubcategoryResponseDTO();
    dto._id = entity._id?.toString() ?? "";
    dto.name = entity.name;
    return dto;
  }
}


 



export class CategoryResponseDTO {
  @IsString()
  _id!: string;

  @IsString()
  name!: string;

  @IsBoolean()
  status!: boolean;

  @IsNumber()
  courses!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubcategoryResponseDTO)
  subcategories!: SubcategoryResponseDTO[];

  @IsString()
  createdAt!: string;

  @IsString()
  updatedAt!: string;

  static fromEntity(entity: any): CategoryResponseDTO {
    const dto = new CategoryResponseDTO();
    dto._id = entity._id.toString();
    dto.name = entity.name;
    dto.status = entity.status;
    dto.courses = entity.courses;
    dto.createdAt = entity.createdAt.toISOString();
    dto.updatedAt = entity.updatedAt.toISOString();

    dto.subcategories = (entity.subcategories ?? []).map((sub: any) =>
      SubcategoryResponseDTO.fromEntity(sub)
    );

    return dto;
  }
}


export class PaginatedCategoryResponseDTO {
  @IsNumber()
  totalCategories!: number;

  @IsNumber()
  totalPages!: number;

  @IsNumber()
  currentPage!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CategoryResponseDTO)
  categories!: CategoryResponseDTO[];

  static fromEntities(categories: any[] , pagination: any): PaginatedCategoryResponseDTO {
    const dto = new PaginatedCategoryResponseDTO();
    dto.totalCategories = pagination.totalCategories;
    dto.totalPages = pagination.totalPages;
    dto.currentPage = pagination.currentPage;

    dto.categories = categories.map((cat) => CategoryResponseDTO.fromEntity(cat));

    return dto;
  }
}

