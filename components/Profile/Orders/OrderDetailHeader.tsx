import {Flex, Text} from "@chakra-ui/react"

const OrderDetailHeader = () => {
	return (
		<Flex dir='rtl' flexDir='column'>
			<Flex m='1rem'>
				<Flex ml='1rem'>
					<Text color='#81858b' fontFamily='VazirMedium' fontSize={14}>
						تحویل گیرنده :
					</Text>
					<Text fontFamily='VazirMedium' fontSize={14}>
						&nbsp;ابوالفضل عمرانی
					</Text>
				</Flex>
				<Flex>
					<Text color='#81858b' fontFamily='VazirMedium' fontSize={14}>
						شماره تلفن :
					</Text>
					<Text fontFamily='VazirMedium' fontSize={14}>
						&nbsp;09378239855
					</Text>
				</Flex>
			</Flex>
			<Flex mx='1rem'>
				<Text color='#81858b' fontFamily='VazirMedium' fontSize={14}>
					ارسال به آدرس :
				</Text>
				<Text fontFamily='VazirMedium' fontSize={14}>
					&nbsp;کرمان,خیابان هزار و یک شب,کوچه 22
				</Text>
			</Flex>
			<Flex m='1rem'>
				<Text color='#81858b' fontFamily='VazirMedium' fontSize={14}>
					مبلغ سفارش :
				</Text>
				<Text fontFamily='VazirMedium' fontSize={14}>
					&nbsp;{(32540000).toLocaleString()}&nbsp;ریال
				</Text>
			</Flex>
		</Flex>
	)
}

export default OrderDetailHeader
