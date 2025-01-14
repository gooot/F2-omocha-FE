export interface RegisterParams {
  email: string;
  password: string;
}

export interface PostRegisterResponseData {
  email: string;
  nickname: null | string;
  birth: null | string;
  phone_number: null | string;
  image_url: null | string;
  role: 'ROLE_USER';
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RefreshParams {
  refresh_token: string;
}

export interface PostLoginResponseData {
  access_token: string;
  refresh_token: string;
}

export interface CheckEmailParams {
  email: string;
}

export interface PostEmailAuthParams {
  email: string;
}

export interface CheckEmailAuthParams {
  email: string;
  code: string;
}
