import {Flex} from "@chakra-ui/layout"
import Text from "../Text"
import OrderSkeleton from "../Skeleton/OrderSkeleton"
import Head from "next/head"
import OrderTabs from "./Orders/OrderTabs"

// interface IOrders {
//   orders?: ;
// }

const Orders = () => {
	const testOrder = [
		{
			id: 1,
			address: {
				id: 0,
				province: "string",
				city: "string",
				street_address: "string",
				postal_code: "string",
				receiver_name: "string",
				receiver_family: "string",
				receiver_number: "string",
			},
			progress_status: "string",
			ordered_date: "2021-08-24T12:23:17.491Z",
			delivery_cost: 0,
			cost: 0,
			delivery_type: {
				id: 0,
				title: "string",
				range_start: 0,
				range_end: 0,
				is_active: true,
				value: 0,
				description: "string",
			},
			items: [
				{
					name: "میز مانیتور",
					price: "500000",
					count: 2,
					image_url:
						"https://dkstatics-public.digikala.com/digikala-products/1269571.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90",
				},
				{
					name: "میز تحریر",
					price: "807000",
					count: 3,
					image_url:
						"https://dkstatics-public.digikala.com/digikala-products/3280236.jpg?x-oss-process=image/resize,m_lfit,h_600,w_600/quality,q_90",
				},
			],
		},
		[
			{
				name: "تست 1",
				price: "5000",
				status: "ارسال شد",
				orderDate: "1400/12/31",
				transactionNumber: "123456789",
			},
			{
				name: "فثسف 2",
				price: "5000",
				status: "ارسال شد",
				orderDate: "1400/12/31",
				transactionNumber: "123456789",
			},
		],
	]
	// if (true) return <OrderSkeleton />

	return (
		<Flex
			w='100%'
			minH='340px'
			mr={{base: 0, md: "2rem"}}
			borderRadius='.5rem'
			border='1px solid #CFCFCF'
			justifyContent='flex-start'
			alignItems='flex-end'
			flexDir='column'
			overflow='hidden'
			p={{base: "1.5rem .5rem", md: "1.5rem"}}>
			<Head>
				<title>سفارشات</title>
				<meta name='description' content='اصلاعات پروفایل کاربر' />
				<meta name='keywords' content='پروفایل,اطلاعات کاربری,فروشگاه آنلاین' />
				<meta property='og:title' content='سفارشات' />
				<meta property='og:description' content='اصلاعات پروفایل کاربر' />
				<meta property='og:type' content='website' />
			</Head>
			<Flex
				alignItems='center'
				pb='.5rem'
				borderBottom='2px solid #0E668B'
				h={{base: "35px", md: "35px"}}
				mb='2rem'>
				<Text fontSize={{base: "14px", md: "18px"}} variant='heading5'>
					تاریخچه سفارشات
				</Text>
			</Flex>
			<OrderTabs />
		</Flex>
	)
}

export default Orders
