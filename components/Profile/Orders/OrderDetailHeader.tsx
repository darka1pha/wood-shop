import {Flex, Text} from "@chakra-ui/react"

interface IOrder {
	address: {
		province: string
		city: string
		street_address: string
		receiver_name: string
		receiver_family: string
		receiver_number: string
	}
	ordered_date: string
	delivery_cost: number
	cost: number
}

const OrderDetailHeader = ({address, delivery_cost, cost}: IOrder) => {
	const finalCost = delivery_cost + cost
	const {
		city,
		province,
		receiver_family,
		receiver_name,
		receiver_number,
		street_address,
	} = address
	return (
		<Flex dir='rtl' flexDir='column'>
			<Flex m='1rem'>
				<Flex ml='1rem'>
					<Text color='#81858b' fontFamily='VazirMedium' fontSize={14}>
						تحویل گیرنده :
					</Text>
					<Text fontFamily='VazirMedium' fontSize={14}>
						&nbsp;{receiver_name + " " + receiver_family}
					</Text>
				</Flex>
				<Flex>
					<Text color='#81858b' fontFamily='VazirMedium' fontSize={14}>
						شماره تلفن : &nbsp;
					</Text>
					<Text dir="ltr" fontFamily='VazirMedium' fontSize={14}>
						&nbsp;{receiver_number}
					</Text>
				</Flex>
			</Flex>
			<Flex mx='1rem'>
				<Text color='#81858b' fontFamily='VazirMedium' fontSize={14}>
					ارسال به آدرس :
				</Text>
				<Text fontFamily='VazirMedium' fontSize={14}>
					&nbsp;{province + " , " + city + " , " + street_address}
				</Text>
			</Flex>
			<Flex m='1rem'>
				<Text color='#81858b' fontFamily='VazirMedium' fontSize={14}>
					مبلغ سفارش :
				</Text>
				<Text fontFamily='VazirMedium' fontSize={14}>
					&nbsp;{finalCost.toLocaleString()}&nbsp;ریال
				</Text>
			</Flex>
		</Flex>
	)
}

export default OrderDetailHeader
