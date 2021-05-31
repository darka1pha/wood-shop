import axios from "axios";
import { IMainSignup, IVerifySignup } from "./interfaces";
import { apiPathes } from '.'

const {
  MAIN,
  AUTH,
  SIGN_UP,
  SIGN_UP_VERIFY,
  SIGN_IN_PHONENUMBER,
  SIGN_IN_VERIFY,
} = apiPathes



export const useMainSignup = async (props: IMainSignup) => {
  const { phone_number } = props
  console.log("phone_number" + phone_number)
  const { data } = await axios.post(
    MAIN + AUTH + SIGN_UP,
    { phone_number },
  );
  return data;
}

export const useVerifySignup = async (props: IVerifySignup) => {
  const { token } = props;
  const { data } = await axios.post(
    MAIN + AUTH + SIGN_UP + SIGN_UP_VERIFY,
    {
      token: token,
      phone_number: localStorage.getItem("phone_number")
    },
  );
  return data;
}

export const useMainSignin = async (props: IMainSignup) => {
  const { phone_number } = props
  console.log("phone_number" + phone_number)
  const { data } = await axios.post(
    MAIN + AUTH + SIGN_IN_PHONENUMBER,
    { phone_number },
  );
  return data;
}

export const useVerifySignin = async (props: IVerifySignup) => {
  const { token } = props;
  const { data } = await axios.post(
    MAIN + AUTH + SIGN_IN_VERIFY,
    {
      token: token,
      phone_number: localStorage.getItem("phone_number")
    },
  );
  return data;
}
