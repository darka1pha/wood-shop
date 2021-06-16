import axios from "axios";
import { IMainSignup, ISigninPassword, IVerifySignup } from "./interfaces";
import { apiPathes } from ".";
import Cookies from "js-cookie";

const {
  MAIN,
  AUTH,
  SIGN_UP,
  SIGN_UP_VERIFY,
  SIGN_IN_PHONENUMBER,
  SIGN_IN_VERIFY,
  UPDATE_PROFILE,
  SIGN_IN_PASSWORD,
} = apiPathes;

export const getToken = async () => {
  if (Cookies.get("accessToken")) {
    return true;
  } else if (!Cookies.get("accessToken") && Cookies.get("refreshToken")) {
    const { data } = await axios.post(apiPathes.MAIN, {
      refresh: Cookies.get("refreshToken"),
    });
    Cookies.set("accessToken", data.access, {
      sameSite: "strict",
      expires: 1 / 24,
    });
    return true;
  } else return false;
};

export const useMainSignup = async (props: IMainSignup) => {
  const { phone_number } = props;
  console.log("phone_number" + phone_number);
  const { data } = await axios.post(MAIN + AUTH + SIGN_UP, { phone_number });
  return data;
};

export const useVerifySignup = async (props: IVerifySignup) => {
  const { token } = props;
  const { data } = await axios.post(MAIN + AUTH + SIGN_UP + SIGN_UP_VERIFY, {
    token: token,
    phone_number: localStorage.getItem("phone_number"),
  });
  return data;
};

export const useMainSignin = async (props: IMainSignup) => {
  const { phone_number } = props;
  console.log("phone_number" + phone_number);
  const { data } = await axios.post(MAIN + AUTH + SIGN_IN_PHONENUMBER, {
    phone_number,
  });
  return data;
};

export const useVerifySignin = async (props: IVerifySignup) => {
  const { token } = props;
  const { data } = await axios.post(MAIN + AUTH + SIGN_IN_VERIFY, {
    token: token,
    phone_number: localStorage.getItem("phone_number"),
  });
  return data;
};

export const useSigninPassword = async (props: ISigninPassword) => {
  const { password, phone_number } = props;
  console.log("data : ", props);
  const { data } = await axios.post(MAIN + AUTH + SIGN_IN_PASSWORD, {
    password: password,
    phone_number: phone_number,
  });
  return data;
};

export const profileUpdate = async (data: {
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  national_id?: string;
}) => {
  const { last_name, first_name, password, phone_number, national_id } = data;
  const haveToken = await getToken();
  const token = Cookies.get("accessToken");
  if (haveToken) {
    console.log(data);
    const res = await axios.patch(
      MAIN + AUTH + UPDATE_PROFILE,
      {
        phone_number,
        password,
        last_name,
        first_name,
        national_id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } else return null;
};
