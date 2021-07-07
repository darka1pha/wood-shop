export interface IMainSignup {
  phone_number: string;
}
export interface IVerifySignup {
  token: string;
}
export interface ISigninPassword {
  phone_number: string;
  password: string;
}

export interface IError {
  response: {
    data: {
      error: {
        code: number;
        message: string;
      };
      remain_time: number;
    };
  };
}

export interface IFavorites {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

export interface IProvince {
  name: string;
  id: number;
}
