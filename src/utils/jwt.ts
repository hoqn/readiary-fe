import jwt from "jsonwebtoken";

export function decodeJwt(token: string) {
  return jwt.decode(token, { json: true }) as {
    sub: string;
    memberId: number;
    roles: string[];
    iat: number;
    exp: number;
  } | null;
}
