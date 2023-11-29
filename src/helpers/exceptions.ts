export class NeedSignInError extends Error {
  constructor() {
    super();
    this.name = "NEED_SIGNIN";
    this.message = "서비스를 이용하기 위해서는 로그인이 필요해요.";
  }
  
}

export class InvalidTokenError extends Error {
  constructor() {
    super();
    this.name = "INVALID_TOKEN";
    this.message = "로그인 토큰이 잘못되었어요. 다시 로그인해주세요.";
  }
}
