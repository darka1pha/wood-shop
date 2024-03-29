import axios from "axios"
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
	IGetCatProducts,
	IBanners,
	ISetScore,
	IDeliveryStats,
	IGetOrders,
	IGetPendingOrders,
	IBuyPendings,
	IOrder,
	IError,
} from "./interfaces"
import {apiPathes} from "."
import Cookies from "js-cookie"
import {IRecivedAddress} from "../components/Profile/Addresses"
import {useInfiniteQuery, useQuery, useQueryClient} from "react-query"

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
	COMPELETE,
	PENDING,
	PROGRESS,
	BUY_PENDINGS,
	GET_ORDER,
	GET_NEW_TOKEN,
} = apiPathes

export const getToken = async () => {
	if (Cookies.get("accessToken")) {
		return true
	} else if (!Cookies.get("accessToken") && Cookies.get("refreshToken")) {
		const {data} = await axios.post(
			MAIN + AUTH + GET_NEW_TOKEN,
			{
				refresh: Cookies.get("refreshToken"),
			},
			{withCredentials: true},
		)
		Cookies.set("accessToken", data.access, {
			sameSite: "strict",
			expires: 1 / 24,
		})
		return true
	} else return false
}

export const useMainSignup = async (props: IMainSignup) => {
	const {phone_number} = props
	const {data} = await axios.post(
		MAIN + AUTH + SIGN_UP,
		{phone_number},
		{withCredentials: true},
	)
	return data
}

export const useResetPassword = async (props: IMainSignup) => {
	const {phone_number} = props
	const {data} = await axios.post(
		MAIN + AUTH + RESET,
		{
			phone_number,
		},
		{withCredentials: true},
	)
	return data
}

export const useVerifyResetPassword = async (props: IVerifyResetPassword) => {
	const {token, confirm_password, new_password} = props
	const {data} = await axios.patch(
		MAIN + AUTH + RESET_VERIFY,
		{
			phone_number: localStorage.getItem("phone_number"),
			new_password,
			confirm_password,
			token,
		},
		{withCredentials: true},
	)
	return data
}

export const useVerifySignup = async (props: IVerifySignup) => {
	const {token} = props
	const {data} = await axios.post(
		MAIN + AUTH + SIGN_UP_VERIFY,
		{
			token: token,
			phone_number: localStorage.getItem("phone_number"),
		},
		{withCredentials: true},
	)
	return data
}

export const useMainSignin = async (props: IMainSignup) => {
	const {phone_number} = props
	const {data} = await axios.post(
		MAIN + AUTH + SIGN_IN_PHONENUMBER,
		{
			phone_number,
		},
		{withCredentials: true},
	)
	return data
}

export const useVerifySignin = async (props: IVerifySignup) => {
	const {token} = props
	const response = await axios.post(
		MAIN + AUTH + SIGN_IN_VERIFY,
		{
			token: token,
			phone_number: localStorage.getItem("phone_number"),
		},
		{withCredentials: true},
	)
	localStorage.setItem("APIRes", JSON.stringify(response))
	return response.data
}

export const useSigninPassword = async (props: ISigninPassword) => {
	const {password, phone_number} = props
	const {data} = await axios.post(
		MAIN + AUTH + SIGN_IN_PASSWORD,
		{
			password: password,
			phone_number: phone_number,
		},
		{withCredentials: true},
	)
	return data
}

export const profileUpdate = async (data: {
	phone_number?: string
	first_name?: string
	last_name?: string
	password?: string
	national_id?: string
}) => {
	const {last_name, first_name, password, phone_number, national_id} = data
	await getToken()
	const token = Cookies.get("accessToken")
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
			withCredentials: true,
		},
	)
	return res
}

export const profileUpdatePassword = async (data: {
	password?: string
	confirm_password?: string
	new_password?: string
}) => {
	const {confirm_password, new_password, password} = data
	await getToken()
	const token = Cookies.get("accessToken")
	const res = await axios.patch(
		MAIN + AUTH + UPDATE_PASSWORD,
		{
			confirm_password,
			new_password,
			password,
		},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
			withCredentials: true,
		},
	)
	return res
}

export const useGetFavorites = () =>
	useInfiniteQuery(
		["userFavorites"],
		async ({pageParam = 1}) => {
			if (typeof pageParam === typeof 1) {
				await getToken()
				const {data} = await axios.get(
					MAIN + BOOKMARKS + "?page=" + pageParam,
					{
						headers: {
							Authorization: `Bearer ${Cookies.get("accessToken")}`,
						},
						withCredentials: true,
					},
				)
				return data
			} else console.log("Else")
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
			refetchOnWindowFocus: false,
		},
	)

export const useGetCategories = () =>
	useQuery(
		["categories"],
		async () => {
			const {data} = await axios.get(
				MAIN + CATEGORIES_FULL + "?page_size=100",
				{withCredentials: true},
			)
			return data.results
		},
		{
			refetchOnWindowFocus: false,
		},
	)

export const useDeleteBookmark = async (id: number) => {
	await getToken()
	const {data} = await axios.delete(MAIN + DELETE_BOOKMARK + id, {
		headers: {
			Authorization: `Bearer ${Cookies.get("accessToken")}`,
		},
		withCredentials: true,
	})
	return data
}

export const useAddBookmark = async (id: number) => {
	await getToken()
	const {data} = await axios.post(
		MAIN + DELETE_BOOKMARK,
		{
			id: id,
		},
		{
			headers: {
				Authorization: `Bearer ${Cookies.get("accessToken")}`,
			},
			withCredentials: true,
		},
	)
	return data
}

export const useGetPaymentAddresses = () =>
	useQuery(
		["profileAddresses"],
		async () => {
			await getToken()
			const {data} = await axios.get(MAIN + ADDRESSES + "?page_size=100", {
				headers: {
					Authorization: `Bearer ${Cookies.get("accessToken")}`,
				},
				withCredentials: true,
			})
			return await data.results
		},
		{
			refetchOnWindowFocus: false,
		},
	)

export const useGetAddresses = () =>
	useInfiniteQuery(
		["userAddresses"],
		async ({pageParam = 1}) => {
			await getToken()
			if (typeof pageParam === typeof 1) {
				const {data} = await axios.get(
					MAIN + ADDRESSES + "?page=" + pageParam,
					{
						headers: {
							Authorization: `Bearer ${Cookies.get("accessToken")}`,
						},
						withCredentials: true,
					},
				)
				return await data
			}
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
			refetchOnWindowFocus: false,
		},
	)

export const useAddAddress = async ({
	city,
	postal_code,
	province,
	receiver_family,
	receiver_name,
	receiver_number,
	street_address,
}: IRecivedAddress) => {
	await getToken()
	const {data} = await axios.post(
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
			withCredentials: true,
		},
	)
	return data
}

export const useDeleteAddress = async (id: number) => {
	await getToken()
	const {data} = await axios.delete(MAIN + DELETE_ADDRESS + id, {
		headers: {
			Authorization: `Bearer ${Cookies.get("accessToken")}`,
		},
		withCredentials: true,
	})
	return data
}

export const useGetProvinces = () =>
	useQuery(
		["provinces"],
		async () => {
			await getToken()
			const {data} = await axios.get(MAIN + GET_PROVINCE, {
				headers: {
					Authorization: `Bearer ${Cookies.get("accessToken")}`,
				},
				withCredentials: true,
			})
			return await data.results
		},
		{
			refetchOnWindowFocus: false,
		},
	)

export const useGetCities = async (id: number) => {
	await getToken()
	const {data} = await axios.get(MAIN + GET_PROVINCE + id + "/cities", {
		headers: {
			Authorization: `Bearer ${Cookies.get("accessToken")}`,
		},
		withCredentials: true,
	})
	return await data.results
}

export const useGetCategoryProducts = ({id, ordering}: IGetCatProducts) =>
	useInfiniteQuery(
		[`Products${id}`, id, ordering],
		async ({pageParam = 1}) => {
			const haveToken = await getToken()
			if (haveToken) {
				const {data}: any = await axios.get(
					MAIN +
						GET_CATEGORY_PRODUCTS +
						id +
						`/products?ordering=${ordering}&page=${pageParam}`,
					{
						headers: {
							Authorization: `Bearer ${Cookies.get("accessToken")}`,
						},
						withCredentials: true,
					},
				)
				return data
			} else {
				const {data}: any = await axios.get(
					MAIN +
						GET_CATEGORY_PRODUCTS +
						id +
						`/products?ordering=${ordering}&page=${pageParam}`,
				)
				return data
			}
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage && lastPage.next ? Number(lastPage.next.split("=")[2]) : null,
			refetchOnWindowFocus: false,
		},
	)

export const useGetProductInfo = (id: number) =>
	useQuery<IFullProducts, IError>(
		[`Product-${id}`],
		async () => {
			const {data} = await axios.get(MAIN + PRODUCT_DETAILS + id, {
				withCredentials: true,
			})
			return data.result
		},
		{
			refetchOnWindowFocus: false,
		},
	)

export const useSendNewComment = async ({
	design_value,
	feature_value,
	money_value,
	product,
	quality_value,
	text,
}: IComment) => {
	await getToken()
	const {data} = await axios.post(
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
			withCredentials: true,
		},
	)
	return await data
}

export const useGetComments = (id: number) =>
	useInfiniteQuery(
		[`comments-${id}`],
		async ({pageParam = 1}): Promise<IPaginatedData<IComment>> => {
			if (typeof pageParam === typeof 1) {
				const {data} = await axios.get(
					MAIN + GET_COMMENTS + id + "?page=" + pageParam,
				)
				return await data
			}
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
			refetchOnWindowFocus: false,
		},
	)

export const useSearch = (key: string | string[]) =>
	useInfiniteQuery(
		[`search-${key}`, key],
		async ({pageParam = 1}): Promise<IPaginatedData<IProducts>> => {
			const haveToken = await getToken()
			if (haveToken) {
				const {data} = await axios.get(
					MAIN + SEARCH + "?query=" + key + "&page=" + pageParam,
					{
						headers: {
							Authorization: `Bearer ${Cookies.get("accessToken")}`,
						},
						withCredentials: true,
					},
				)
				return await data
			} else {
				const {data} = await axios.get(
					MAIN + SEARCH + "?query=" + key + "&page=" + pageParam,
				)
				return await data
			}
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
			refetchOnWindowFocus: false,
		},
	)

export const useAddToCart = async ({count, product, form}: IAddToCart) => {
	await getToken()
	const {data} = await axios.post(
		MAIN + ADD_PRODUCT_TO_CART,
		{
			product,
			count,
			form,
		},
		{
			headers: {
				Authorization: `Bearer ${Cookies.get("accessToken")}`,
			},
			withCredentials: true,
		},
	)
	return data
}

export const useGetCart = () =>
	useInfiniteQuery(
		["cart"],
		async ({pageParam = 1}): Promise<IPaginatedData<ICart>> => {
			await getToken()
			if (typeof pageParam === typeof 1) {
				const {data} = await axios.get(MAIN + GET_CART + "?page=" + pageParam, {
					headers: {
						Authorization: `Bearer ${Cookies.get("accessToken")}`,
					},
					withCredentials: true,
				})
				return await data
			}
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
			refetchOnWindowFocus: false,
		},
	)

export const useUpdateCart = async ({cart_id, count}: IUpdateCart) => {
	await getToken()
	const {data} = await axios.patch(
		MAIN + ADD_PRODUCT_TO_CART + cart_id,
		{
			count,
		},
		{
			headers: {
				Authorization: `Bearer ${Cookies.get("accessToken")}`,
			},
			withCredentials: true,
		},
	)
	return data
}

export const useDeleteCart = async ({cart_id}: IUpdateCart) => {
	await getToken()
	const {data} = await axios.delete(MAIN + ADD_PRODUCT_TO_CART + cart_id, {
		headers: {
			Authorization: `Bearer ${Cookies.get("accessToken")}`,
		},
		withCredentials: true,
	})
	return data
}

export const useGetCartInfo = () =>
	useQuery(
		["cartInfo"],
		async () => {
			await getToken()
			const {data} = await axios.get(MAIN + GET_CART_INFO, {
				headers: {
					Authorization: `Bearer ${Cookies.get("accessToken")}`,
				},
				withCredentials: true,
			})
			return data.total
		},
		{refetchOnWindowFocus: false},
	)

export const useGetFiltredData = ({filterOption}) =>
	useQuery(
		[`filteredData-${filterOption}`],
		async () => {
			const haveToken = await getToken()
			if (haveToken) {
				const {data} = await axios.get(
					MAIN + FILTER + `?${filterOption}&page_size=100`,
					{
						headers: {
							Authorization: `Bearer ${Cookies.get("accessToken")}`,
						},
						withCredentials: true,
					},
				)
				return data.results
			} else {
				const {data} = await axios.get(
					MAIN + FILTER + `?${filterOption}&page_size=100`,
				)
				return data.results
			}
		},
		{refetchOnWindowFocus: false},
	)

export const useGetBanners = () =>
	useQuery<Array<IBanners>>(
		["banners"],
		async () => {
			const {data} = await axios.get(MAIN + BANNERS, {withCredentials: true})
			return data.results
		},
		{refetchOnWindowFocus: false},
	)

export const useGetBannerProducts = (id: string | string[]) =>
	useInfiniteQuery(
		[`Banners`],
		async ({pageParam = 1}) => {
			const haveToken = await getToken()
			if (haveToken) {
				const {data}: any = await axios.get(
					MAIN + BANNERS + id + `?page=${pageParam}`,
					{
						headers: {
							Authorization: `Bearer ${Cookies.get("accessToken")}`,
						},
						withCredentials: true,
					},
				)
				return data
			} else {
				const {data}: any = await axios.get(
					MAIN + BANNERS + id + `?page=${pageParam}`,
				)
				return data
			}
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
			refetchOnWindowFocus: false,
		},
	)

export const useSetScore = async ({value, product}: ISetScore) => {
	await getToken()
	const {data} = await axios.post(
		MAIN + SCORE,
		{
			value,
			product,
		},
		{
			headers: {
				Authorization: `Bearer ${Cookies.get("accessToken")}`,
			},
			withCredentials: true,
		},
	)
	return data
}

export const useUpdateScore = async ({value, product}: ISetScore) => {
	await getToken()
	const {data} = await axios.patch(
		MAIN + SCORE + product,
		{
			value,
		},
		{
			headers: {
				Authorization: `Bearer ${Cookies.get("accessToken")}`,
			},
			withCredentials: true,
		},
	)
	return data
}

export const useGetDeliveryStats = () =>
	useQuery<Array<IDeliveryStats>>(
		["deliveryStats"],
		async () => {
			await getToken()
			const {data} = await axios.get(MAIN + DELIVERY_STATUS, {
				headers: {
					Authorization: `Bearer ${Cookies.get("accessToken")}`,
				},
				withCredentials: true,
			})
			return data.results
		},
		{refetchOnWindowFocus: false},
	)

export const useGetCartCount = () =>
	useQuery(
		["cartCounts"],
		async () => {
			await getToken()
			const {data} = Cookies.get("accessToken")
				? await axios.get(MAIN + CART_COUNT, {
						headers: {
							Authorization: `Bearer ${Cookies.get("accessToken")}`,
						},
						withCredentials: true,
				  })
				: {data: null}
			return Cookies.get("accessToken") ? data.result : null
		},
		{refetchOnWindowFocus: false},
	)

export const usePayment = async ({delivery_type, address}) => {
	await getToken()
	const {data} = await axios.post(
		MAIN + PAYMENT,
		{delivery_type, address},
		{
			headers: {
				Authorization: `Bearer ${Cookies.get("accessToken")}`,
			},
			withCredentials: true,
		},
	)
	return data
}

export const useGetCompeleteOrders = () =>
	useInfiniteQuery(
		[`compelete`],
		async ({pageParam = 1}): Promise<IPaginatedData<IGetOrders>> => {
			await getToken()
			const {data} = await axios.get(MAIN + COMPELETE + `?page=${pageParam}`, {
				headers: {
					Authorization: `Bearer ${Cookies.get("accessToken")}`,
				},
				withCredentials: true,
			})
			return data
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
			refetchOnWindowFocus: false,
		},
	)

export const useGetPendingOrders = () =>
	useInfiniteQuery(
		[`pending`],
		async ({pageParam = 1}): Promise<IPaginatedData<IGetPendingOrders>> => {
			await getToken()
			const {data} = await axios.get(MAIN + PENDING + `?page=${pageParam}`, {
				headers: {
					Authorization: `Bearer ${Cookies.get("accessToken")}`,
				},
				withCredentials: true,
			})
			return data
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
			refetchOnWindowFocus: false,
		},
	)

export const useGetProgressOrders = () =>
	useInfiniteQuery(
		[`progress`],
		async ({pageParam = 1}): Promise<IPaginatedData<IGetOrders>> => {
			await getToken()
			const {data} = await axios.get(MAIN + PROGRESS + `?page=${pageParam}`, {
				headers: {
					Authorization: `Bearer ${Cookies.get("accessToken")}`,
				},
				withCredentials: true,
			})
			return data
		},
		{
			getNextPageParam: (lastPage) =>
				lastPage && lastPage.next ? Number(lastPage.next.split("=")[1]) : null,
			refetchOnWindowFocus: false,
		},
	)

export const useBuyPendings = async ({
	order,
	address,
	delivery,
}: IBuyPendings) => {
	await getToken()
	const {data} = await axios.post(
		MAIN + BUY_PENDINGS,
		{order, address, delivery_type: delivery},
		{
			headers: {
				Authorization: `Bearer ${Cookies.get("accessToken")}`,
			},
			withCredentials: true,
		},
	)
	return data
}

export const useGetOrder = ({id}) =>
	useQuery<IOrder>(
		[`Order-${id}`],
		async () => {
			await getToken()
			const {data} = await axios.get(MAIN + GET_ORDER + id, {
				headers: {
					Authorization: `Bearer ${Cookies.get("accessToken")}`,
				},
				withCredentials: true,
			})
			return data.result
		},
		{
			refetchOnWindowFocus: false,
		},
	)
