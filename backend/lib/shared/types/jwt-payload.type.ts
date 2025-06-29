export type JwtPayload = {
  id: any;
  username: string;
  sub: string;
  role: string;
  userId: string;
  email: string;
  name: string;
};

export class VerifyResetPasswordCodeDto {
    email: string;
    code: string;
}

export class UserPayloadJwt {
    id: string;
    email: string;
    name: string;
    role: string;
}