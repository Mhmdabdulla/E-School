export class CartCourseDTO {
  id!: string;
  title!: string;
  subtitle!: string;
  thumbnail!: string;
  price!: number;
  discountPrice!: number;
  isFree!: boolean;
  instructor!: {
    id: string;
    name: string;
    profileImageUrl: string;
    title?: string;
  };

  static fromEntity(course: any): CartCourseDTO {
    const dto = new CartCourseDTO();

    dto.id = course._id.toString();
    dto.title = course.title;
    dto.subtitle = course.subtitle;
    dto.thumbnail = course.thumbnail;
    dto.price = course.price;
    dto.discountPrice = course.discountPrice;
    dto.isFree = course.isFree;

    dto.instructor = {
      id: course.instructorId._id.toString(),
      name: course.instructorId.name,
      profileImageUrl: course.instructorId.profileImageUrl,
      title: course.instructorId.title,
    };

    return dto;
  }
}

export class CartResponseDTO {
  id!: string;
  userId!: string;
  status!: "pending" | "in_progress" | "paid" | "expired";
  stripeSessionId!: string | null;
  sessionExpiresAt!: string | null;
  courses!: CartCourseDTO[];
  createdAt!: string;
  updatedAt!: string;

  static fromEntity(cart: any): CartResponseDTO {
    const dto = new CartResponseDTO();

    dto.id = cart._id.toString();
    dto.userId = cart.userId.toString();
    dto.status = cart.status;
    dto.stripeSessionId = cart.stripeSesstionId;
    dto.sessionExpiresAt = cart.sessionExpiresAt
      ? cart.sessionExpiresAt.toISOString()
      : null;
    dto.createdAt = cart.createdAt.toISOString();
    dto.updatedAt = cart.updatedAt.toISOString();

    dto.courses = cart.courses.map((c: any) => CartCourseDTO.fromEntity(c));

    return dto;
  }
}
