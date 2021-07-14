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

export interface IProducts {
  id: number;
  name: string;
  image: string;
  price: number;
  score?: number;
}

interface ITexture {
  image: string;
  id: number;
}

export interface IFullProducts {
  creation_duration: number;
  description: string;
  form: Array<ITexture>;
  id: number;
  image: string;
  images: Array<string>;
  name: string;
  off_id: {
    end_date: string;
    id: 1;
    precentage: number;
    start_date: string;
  };
  price: number;
  score: 3;
  ordered_count: number;
}

export interface IGetProductInfo {
  result: { IFullProducts };
}

export interface IComment {
  id?: number;
  text: string;
  feature_value: number;
  money_value: number;
  design_value: number;
  quality_value: number;
  product?: number;
  datetime?: string;
  user?: {
    email?: string;
    first_name?: string;
    last_name?: string;
  };
}

export interface IVerifyResetPassword {
  token: string;
  phone_number?: string;
  new_password: string;
  confirm_password: string;
}

export interface IAddToCart {
  product: number;
  count: number;
}

export interface ICart {
  setLoading?: (isLoading: boolean) => void;
  count: number;
  form?: {};
  id: number;
  product: {
    id: number;
    image: string;
    name: string;
    price: number;
  };
}



export interface IPaginatedData<T> {
  next: string | null;
  results: Array<T>;
}

export interface IUpdateCart {
  count?: 1 | -1;
  cart_id: number;
}
