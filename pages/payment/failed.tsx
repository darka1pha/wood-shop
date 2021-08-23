import {Button, Flex, Icon, Text} from "@chakra-ui/react"
import Link from "next/link"
import { IoCloseCircleOutline } from "react-icons/io5"

const Failed = () => {
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
			<Flex
				borderRadius='.5rem'
				h='280px'
				w='420px'
				boxShadow='lg'
				flexDir='column'
				justifyContent="space-between"
				alignItems='center'
				py="1rem">
				<Flex justifyContent='center' w='100%' alignItems='center' dir='rtl'>
					<Icon
						color='red'
						m='.5rem'
						as={IoCloseCircleOutline}
						fontSize={30}
					/>
					<Text fontFamily='VazirMedium' fontSize={20}>
						{" "}
						پرداخت ناموفق بود.
					</Text>
				</Flex>
				<Flex px="2rem">
					<Text fontFamily='Vazir' fontSize={16} dir='rtl'>
						سبد خرید شما به صورت تعلیق در قسمت سبد خرید قابل مشاهده است , برای پرداخت یا حذف سبد میتوانید از قسمت سبد خرید اقدام کنید.
					</Text>
				</Flex>
				<Button fontFamily="Vazir" mt="1rem" colorScheme="blue">
					<Link href='/'>
						<a>بازگشت به خانه</a>
					</Link>
				</Button>
			</Flex>
		</Flex>
	)
}

export default Failed
