import {Flex} from "@chakra-ui/layout"
import Text from "../Text"
import OrderSkeleton from "../Skeleton/OrderSkeleton"
import Head from "next/head"
import OrderTabs from "./Orders/OrderTabs"
import {useGetPendingOrders} from "../../API"

const Orders = () => {
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
