export type LoginFormData = {
  email: string;
  password: string;
};

export type UserSession = {
  accessToken: string;
  name: string;
  email: string;
  role: string;
  accessTokenExpires: number;
};
