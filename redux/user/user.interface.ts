export interface IUser {
  currentUser: {
    first_name: string;
    id: string;
    image: string;
    is_staff: boolean;
    is_superuser: boolean;
    is_user: boolean;
    last_name: string;
    phone_number: string;
    secondary_phone_number: string;
    national_id: string;
    password: string;
    is_new:boolean;
  };
}

export interface ICurrentUser {
  first_name: string;
  id: string;
  image: string;
  is_staff: boolean;
  is_superuser: boolean;
  is_user: boolean;
  last_name: string;
  phone_number: string;
  secondary_phone_number: string;
  national_id: string;
  password: string;
  is_new:boolean;
}
