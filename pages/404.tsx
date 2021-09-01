import {Button, Flex, Icon, Text} from "@chakra-ui/react"
import {useRouter} from "next/dist/client/router"
import {RiSignalWifiErrorLine} from "react-icons/ri"

export default function Custom404() {
	const router = useRouter()
	return (
		<Flex w='100%' h='100vh'>
			<Flex
				flexDir='column'
				justifyContent='center'
				alignItems='center'
				w='100%'
				h='100%'>
				<Icon as={RiSignalWifiErrorLine} h='120px' w='120px' color='#595959' />
				<Text
					color='#595959'
					fontWeight='bold'
					fontFamily='Vazir'
					fontSize='1.5rem'>
					صفحه مورد نظر وجود ندارد
				</Text>
				<Button
					_focus={{
						outline: 0,
					}}
					mt='0.5rem'
					fontWeight='bold'
					fontFamily='Vazir'
					onClick={() => router.push("/")}>
					بازگشت به خانه
				</Button>
			</Flex>
		</Flex>
	)
}
