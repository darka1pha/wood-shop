import axios from "axios";
import { IMainSignup, ISigninPassword, IVerifySignup } from "./interfaces";
import { apiPathes } from ".";
import Cookies from "js-cookie";
import { IRecivedAddress } from "../components/Profile/Addresses";
import { useInfiniteQuery, useQuery } from "react-query";

const {
  MAIN,
  AUTH,
  SIGN_UP,
  SIGN_UP_VERIFY,
  SIGN_IN_PHONENUMBER,
  SIGN_IN_VERIFY,
  UPDATE_PROFILE,
  SIGN_IN_PASSWORD,
  BOOKMARKS,
  CATEGORIES_FULL,
  RESET_VERIFY,
  DELETE_BOOKMARK,
  ADDRESSES,
  DELETE_ADDRESS,
  GET_PROVINCE,
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
  const token = Cookies.get("accessToken");
  console.log("API ADDRESS: ", MAIN + AUTH + UPDATE_PROFILE);
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
};

export const useGetFavorites = () =>
  useInfiniteQuery(
    ["userFavorites"],
    async ({ pageParam = 1 }) => {
      if (typeof pageParam === typeof 1) {
        const { data } = await axios.get(
          MAIN + BOOKMARKS + "?page=" + pageParam,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
        return await data;
      }
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
      refetchOnWindowFocus: false,
    }
  );

export const useGetCategories = () =>
  useQuery(
    ["categories"],
    async () => {
      const { data } = await axios.get(MAIN + CATEGORIES_FULL);
      return data.results;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

export const useDeleteBookmark = async (id: number) => {
  console.log("Bookmark Id: ", id);
  try {
    const { data } = await axios.delete(MAIN + DELETE_BOOKMARK + id, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const useGetAddresses = () =>
  useInfiniteQuery(
    ["userAddresses"],
    async ({ pageParam = 1 }) => {
      if (typeof pageParam === typeof 1) {
        const { data } = await axios.get(
          MAIN + ADDRESSES + "?page=" + pageParam,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("accessToken")}`,
            },
          }
        );
        return await data;
      }
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
      refetchOnWindowFocus: false,
    }
  );

export const useAddAddress = async ({
  city,
  postal_code,
  province,
  receiver_family,
  receiver_name,
  receiver_number,
  street_address,
}: IRecivedAddress) => {
  console.log("Data to Post : ", {
    city,
    postal_code,
    province,
    receiver_family,
    receiver_name,
    receiver_number,
    street_address,
  });
  try {
    const { data } = await axios.post(
      MAIN + ADDRESSES,
      {
        city,
        postal_code,
        province,
        receiver_family,
        receiver_name,
        receiver_number,
        street_address,
      },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const useDeleteAddress = async (id: number) => {
  console.log("Address Id: ", id);
  try {
    const { data } = await axios.delete(MAIN + DELETE_ADDRESS + id, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const useGetProvinces = () =>
  useQuery(
    ["provinces"],
    async () => {
      const { data } = await axios.get(MAIN + GET_PROVINCE, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      return await data.results;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

export const useGetCities = async (id: number) => {
  const { data } = await axios.get(MAIN + GET_PROVINCE + id + "/cities", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  return await data.results;
};
