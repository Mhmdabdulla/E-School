//improting validation decorators
//decorates only work with validate() from class-validator
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export class RegisterRequestDTO {
  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password!: string;

  static fromPayload(payload: RegisterPayload): RegisterRequestDTO {
    const dto = new RegisterRequestDTO();
    dto.name = payload.name;
    dto.email = payload.email;
    dto.password = payload.password;
    return dto;
  }
}

interface LoginPayload {
  email: string;
  password: string;
}
export class LoginRequestDTO {
  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password!: string;

  static fromPayload(payload: LoginPayload): LoginRequestDTO {
    const dto = new LoginRequestDTO();
    dto.email = payload.email;
    dto.password = payload.password;

    return dto;
  }
}

interface OtpVerifyPayload {
  email: string;
  otp: string;
}

export class OtpVerifyRequestDTO {
  @IsEmail({}, { message: "Invalid email" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: "OTP is required" })
  @Length(6, 6, { message: "OTP must be 6 digits" })
  otp!: string;

  static fromPayload(payload: OtpVerifyPayload): OtpVerifyRequestDTO {
    const dto = new OtpVerifyRequestDTO();
    dto.email = payload.email;
    dto.otp = payload.otp;

    return dto;
  }
}