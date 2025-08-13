import { IsString, IsOptional, IsISO8601 } from "class-validator";
import type { IUser } from "../../models/user.model";

export class UserResponseDTO {
@IsString()
_id!: string;

@IsString()
name!: string;

@IsString()
email!: string;

@IsString()
role!: "user" | "instructor" | "admin";

@IsString()
status!: "active" | "blocked";

@IsString()
@IsOptional()
profileImageUrl?: string;

@IsString()
@IsOptional()
title?: string;

@IsString()
@IsOptional()
phoneNo?: string;

@IsISO8601()
@IsOptional()
createdAt?: string;

@IsISO8601()
@IsOptional()
updatedAt?: string;

static fromEntity(entity: IUser): UserResponseDTO {
const dto = new UserResponseDTO();


dto._id = entity._id 
dto.name = entity.name;
dto.email = entity.email;
dto.role = entity.role as "user" | "instructor" | "admin";
dto.status = entity.status as "active" | "blocked";
dto.profileImageUrl = entity.profileImageUrl ?? "";
dto.title = entity.title ?? "";
dto.phoneNo = entity.phoneNo ?? "";
dto.createdAt = entity.createdAt ? new Date(entity.createdAt).toISOString() : undefined;
dto.updatedAt = entity.updatedAt ? new Date(entity.updatedAt).toISOString() : undefined;

return dto;
}
}


export class GoogleAuthUserIdDTO {
  @IsString()
  id!: string;  

  static fromEntity(entity: IUser | null): GoogleAuthUserIdDTO | null {
    if (!entity) return null;
    const dto = new GoogleAuthUserIdDTO();
    dto.id = entity._id
    return dto;
  }
}

