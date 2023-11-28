export interface AuthSession {
  accessToken: string;
  user: {
    email: string;
    memberId: number;
  };
}
