export interface IMainSignup {
	phone_number: string
}
export interface IVerifySignup {
	token: string
}
export interface ISigninPassword {
	phone_number: string
	password: string
}

export interface IError {
	response: {
		data: {
			error: {
				code: number
				message: string
			}
			remain_time: number
		}
		status: number
	}
}

export interface IFavorites {
	id: number
	name: string
	price: number
	image: string
}

export interface IProvince {
	name: string
	id: number
}

export interface IProducts {
	id: number
	name: string
	image: string
	price: number
	score?: number
	bookmarked: boolean
	form: Object
	score_value: number
	off_id: {
		end_date: string
		id: number
		percentage: number
		start_date: string
	}
}

interface ITexture {
	image: string
	id: number
}

export interface IFullProducts {
	creation_duration: number
	description: string
	form: Array<any>
	id: number
	image: string
	images: Array<string>
	name: string
	off_id: {
		end_date: string
		id: number
		percentage: number
		start_date: string
	}
	price: number
	score: number
	ordered_count: number
	score_value: number
	bookmarked: boolean
}

export interface IGetProductInfo {
	result: {IFullProducts}
}

export interface IComment {
	id?: number
	text: string
	feature_value: number
	money_value: number
	design_value: number
	quality_value: number
	product?: number
	datetime?: string
	user?: {
		email?: string
		first_name?: string
		last_name?: string
	}
}

export interface IVerifyResetPassword {
	token: string
	phone_number?: string
	new_password: string
	confirm_password: string
}

export interface IAddToCart {
	product: number
	count: number
	form: Object
}

export interface ICart {
	setLoading?: (isLoading: boolean) => void
	count: number
	id?: number
	product: {
		id: number
		image: string
		name: string
		price: number | string
	}
	form: {}
}

export interface IPaginatedData<T> {
	next: string | null
	results: Array<T>
}

export interface IUpdateCart {
	count?: 1 | -1
	cart_id: number
}

export interface IGetCatProducts {
	id: number
	ordering: "cheapest" | "expensivest" | "default"
}

export interface IBanners {
	id: number
	title: string
	image: string
	url: string
}

export interface ISetScore {
	value: number
	product: number
}

export interface ISetScore {
	value: number
	product: number
}

export interface IDeliveryStats {
	id: number
	title: string
	range_start: number
	range_end: number
}

export interface IPayment {
	delivery_type: number
	addresses: number
}

export interface IBrands {
	id: number
	title_fa: string
	title_en: string
}

export interface IGetOrders {
	id: number
	cart_count: number
	items: [
		product: {
			name: string
			image: string
		},
	]
	ordered_date: string
	delivery_cost: number
	cost: number
}

export interface IGetPendingOrders {
	id: number
	cart_count: number
	items: [
		product: {
			name: string
			image: string
		},
	]
	address: {
		id: number
		province: string
		city: string
		street_address: string
		postal_code: string
		receiver_name: string
		receiver_family: string
		receiver_number: string
	}
	ordered_date: string
	delivery_cost: number
	cost: number
	delivery_type: number
}

export interface IBuyPendings {
	order: number
	address: number
	delivery: number
}

export interface IOrder {
	id: number
	address: {
		id: number
		province: string
		city: string
		street_address: string
		postal_code: string
		receiver_name: string
		receiver_family: string
		receiver_number: string
	}
	items: [
		{
			form: {}
			count: number
			product: {
				id: number
				name: string
				price: string
				image: string
			}
		},
	]
	ordered_date: string
	delivery_cost: number
	cost: number
	delivery_type: number
}
