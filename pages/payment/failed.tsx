import { Flex } from "@chakra-ui/react"
import dynamic from "next/dynamic"
import {IoCloseCircleOutline} from "react-icons/io5"
// import PaymentInfoCard from "../../components/PaymentInfoCard"
const PaymentInfoCard = dynamic(
	() => {
		return import("../../components/PaymentInfoCard")
	},
	{
		ssr: false,
	},
)

const Failed = () => {
	const content =
		"سبد خرید شما به صورت تعلیق در قسمت سبد خرید قابل مشاهده است , برای پرداخت یا حذف سبد میتوانید از قسمت سبد خرید اقدام کنید."
	return (
		<Flex
			flexDir='column'
			as='div'
			lang='fa'
			bgColor='bgColor'
			minH='100vh'
			overflowX='hidden'
			justifyContent='center'
			alignItems='center'>
			<PaymentInfoCard
				content={content}
				iconColor='red'
				icon={IoCloseCircleOutline}
				header='پرداخت ناموفق بود'
			/>
		</Flex>
	)
}

export default Failed
