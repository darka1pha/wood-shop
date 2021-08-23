import axios from "axios"
import Cookies from "js-cookie"
import {apiPathes} from "./apiPathes"
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
	FILTER,
	BANNERS,
	SCORE,
	CART_COUNT,
	DELIVERY_STATUS,
} = apiPathes

export const prefetchFiltered = ({filterOption}) => {
	axios
		.get(MAIN + FILTER + `?${filterOption}&page_size=100`, {
			headers: {
				Authorization: `Bearer ${Cookies.get("accessToken")}`,
			},
		})
		.then(({data}) => {
			return data.results
		})
}
