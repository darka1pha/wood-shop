import {Button, Flex, Icon, Text} from "@chakra-ui/react"
import Link from "next/link"
import { IoCheckmarkCircleOutline } from "react-icons/io5"

const Success = () => {
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
				h='200px'
				w='420px'
				boxShadow='lg'
				flexDir='column'
				justifyContent='center'
				alignItems='center'>
				<Flex justifyContent='center' w='100%' alignItems='center' dir='rtl'>
					<Icon
						color='#02d929'
						m='.5rem'
						as={IoCheckmarkCircleOutline}
						fontSize={30}
					/>
					<Text fontFamily='VazirMedium' fontSize={20}>
						{" "}
						پرداخت با موفقیت انجام شد.
					</Text>
				</Flex>
				<Flex>
					<Text fontFamily='Vazir' fontSize={16} dir='rtl'>
						وضعیت سفارش در پروفایل قابل مشاهده است.
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

export default Success
