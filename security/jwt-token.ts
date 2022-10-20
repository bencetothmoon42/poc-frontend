import { TokenTypeEnum } from "./token-type.enum";

export abstract class JwtToken {
  sub!: string; // userId
  exp!: number; // expires at (in seconds!)
  iat!: number; // issued at (in seconds!)
  aud!: TokenTypeEnum; // type of the token
}
