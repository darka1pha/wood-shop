import {Button, Flex, Icon, Text} from "@chakra-ui/react"
import dynamic from "next/dynamic"
import Link from "next/link"
import {IoCheckmarkCircleOutline} from "react-icons/io5"
// import PaymentInfoCard from "../../components/PaymentInfoCard"


const PaymentInfoCard = dynamic(
	() => {
		return import("../../components/PaymentInfoCard")
	},
	{
		ssr: false,
	},
)

const Success = () => {
	const content = "وضعیت سفارش در پروفایل قابل مشاهده است."
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
				icon={IoCheckmarkCircleOutline}
				header='پرداخت با موفقیت انجام شد.'
			/>
		</Flex>
	)
}

export default Success
