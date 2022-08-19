export interface LoginRequest {
  email: string;
  password: string;
}

export interface ILoginService {
  login(reqBody: LoginRequest): Promise<string>;
}
