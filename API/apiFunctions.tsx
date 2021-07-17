import axios from "axios";
import {
  IMainSignup,
  ISigninPassword,
  IVerifySignup,
  IFullProducts,
  IComment,
  IVerifyResetPassword,
  IAddToCart,
  IPaginatedData,
  IProducts,
  ICart,
  IUpdateCart,
} from "./interfaces";
import { InfiniteData } from "react-query";
import { apiPathes } from ".";
import Cookies from "js-cookie";
import { IRecivedAddress } from "../components/Profile/Addresses";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";

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
  RESET,
  DELETE_BOOKMARK,
  ADDRESSES,
  DELETE_ADDRESS,
  GET_PROVINCE,
  GET_CATEGORY_PRODUCTS,
  PRODUCT_DETAILS,
  NEW_COMMENT,
  GET_COMMENTS,
  SEARCH,
  ADD_PRODUCT_TO_CART,
  GET_CART,
  GET_CART_INFO,
  PAYMENT,
  UPDATE_PASSWORD,
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
  const { data } = await axios.post(MAIN + AUTH + SIGN_UP, { phone_number });
  return data;
};

export const useResetPassword = async (props: IMainSignup) => {
  const { phone_number } = props;
  console.log("DTAT: ", props);
  const { data } = await axios.post(MAIN + AUTH + RESET, {
    phone_number,
  });
  return data;
};

export const useVerifyResetPassword = async (props: IVerifyResetPassword) => {
  console.log("Data: ", props, localStorage.getItem("phone_number"));
  const { token, confirm_password, new_password } = props;
  const { data } = await axios.patch(MAIN + AUTH + RESET_VERIFY, {
    phone_number: localStorage.getItem("phone_number"),
    new_password,
    confirm_password,
    token,
  });
  return data;
};

export const useVerifySignup = async (props: IVerifySignup) => {
  const { token } = props;
  const { data } = await axios.post(MAIN + AUTH + SIGN_UP_VERIFY, {
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
  console.log("DATA: ", { ...data });
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

export const profileUpdatePassword = async (data: {
  password?: string;
  confirm_password?: string;
  new_password?: string;
}) => {
  const { confirm_password, new_password, password } = data;
  const token = Cookies.get("accessToken");
  console.log("DATA: ", { ...data });
  const res = await axios.patch(
    MAIN + AUTH + UPDATE_PROFILE,
    {
      confirm_password,
      new_password,
      password,
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

export const useAddBookmark = async (id: number) => {
  console.log("id of product: ", id);
  const { data } = await axios.post(
    MAIN + DELETE_BOOKMARK,
    {
      product: id,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
  return data;
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

export const useGetCategoryProducts = (id: any) =>
  useInfiniteQuery(
    [`Products${id}`, id],
    async ({ pageParam = 1 }) => {
      const { data }: any = await axios.get(
        MAIN + GET_CATEGORY_PRODUCTS + id + `/products?page=${pageParam}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      return data;
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
      refetchOnWindowFocus: false,
    }
  );

export const useGetProductInfo = (id: number) =>
  useQuery<IFullProducts>(
    [`Product-${id}`],
    async () => {
      const { data } = await axios.get(MAIN + PRODUCT_DETAILS + id, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      return data.result;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

export const useSendNewComment = async ({
  design_value,
  feature_value,
  money_value,
  product,
  quality_value,
  text,
}: IComment) => {
  console.log("Comment to Post: ", {
    design_value,
    feature_value,
    money_value,
    product,
    quality_value,
    text,
  });
  const { data } = await axios.post(
    MAIN + NEW_COMMENT,
    {
      design_value,
      feature_value,
      money_value,
      product,
      quality_value,
      text,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
  return await data;
};

export const useGetComments = (id: number) =>
  useInfiniteQuery(
    [`comments-${id}`],
    async ({ pageParam = 1 }): Promise<IPaginatedData<IComment>> => {
      if (typeof pageParam === typeof 1) {
        const { data } = await axios.get(
          MAIN + GET_COMMENTS + id + "?page=" + pageParam,
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

export const useSearch = (key: string | string[]) =>
  useInfiniteQuery(
    [`search-${key}`, key],
    async ({ pageParam = 1 }): Promise<IPaginatedData<IProducts>> => {
      console.log(
        "API to REQ: ",
        MAIN + SEARCH + "?query=" + key + "&page=" + pageParam
      );
      const { data } = await axios.get(
        MAIN + SEARCH + "?query=" + key + "&page=" + pageParam,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      return await data;
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
      refetchOnWindowFocus: false,
    }
  );

export const useAddToCart = async ({ count, product }: IAddToCart) => {
  console.log("DATA TO POST: ", { product, count, form: { awad: 2 } });
  try {
    const { data } = await axios.post(
      MAIN + ADD_PRODUCT_TO_CART,
      {
        product,
        count,
        form: { awad: 2 },
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

export const useGetCart = () =>
  useInfiniteQuery(
    ["cart"],
    async ({ pageParam = 1 }): Promise<IPaginatedData<ICart>> => {
      if (typeof pageParam === typeof 1) {
        const { data } = await axios.get(
          MAIN + GET_CART + "?page=" + pageParam,
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

export const useUpdateCart = async ({ cart_id, count }: IUpdateCart) => {
  const { data } = await axios.patch(
    MAIN + ADD_PRODUCT_TO_CART + cart_id,
    {
      count,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
  return data;
};

export const useDeleteCart = async ({ cart_id }: IUpdateCart) => {
  const { data } = await axios.delete(MAIN + ADD_PRODUCT_TO_CART + cart_id, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
  return data;
};

export const useGetCartInfo = () =>
  useQuery(
    ["cartInfo"],
    async () => {
      const { data } = await axios.get(MAIN + GET_CART_INFO, {
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      return data.total;
    },
    { refetchOnWindowFocus: false }
  );

export const usePayment = async () => {
  const { data } = await axios.post(
    MAIN + PAYMENT,
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
  return data;
};
