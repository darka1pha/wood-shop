import {Button, Flex, Icon, Text} from "@chakra-ui/react"
import Link from "next/link"
import {IoCloseCircleOutline} from "react-icons/io5"

interface IPaymentInfoCart {
	icon: typeof IoCloseCircleOutline
	iconColor: "red" | "green"
	content: string
	header: string
}

const PaymentInfoCard = ({
	icon,
	iconColor,
	content,
	header,
}: IPaymentInfoCart) => {
	return (
		<Flex
			borderRadius='.5rem'
			h='280px'
			w='420px'
			boxShadow='lg'
			flexDir='column'
			justifyContent='space-between'
			alignItems='center'
			py='1rem'>
			<Flex justifyContent='center' w='100%' alignItems='center' dir='rtl'>
				<Icon color={iconColor} m='.5rem' as={icon} fontSize={30} />
				<Text fontFamily='VazirMedium' fontSize={20}>
					{header}
				</Text>
			</Flex>
			<Flex px='2rem'>
				<Text fontFamily='Vazir' fontSize={16} dir='rtl'>
					{content}
				</Text>
			</Flex>
			<Button fontFamily='Vazir' mt='1rem' colorScheme='blue'>
				<Link href='/'>
					<a>بازگشت به خانه</a>
				</Link>
			</Button>
		</Flex>
	)
}

export default PaymentInfoCard
