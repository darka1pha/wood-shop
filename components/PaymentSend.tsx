import {Flex} from "@chakra-ui/layout"
import {Radio} from "@chakra-ui/radio"
import {Text} from "@chakra-ui/react"

interface IPaymentAddress {
	isChecked: boolean
	id: number
	title: string
	range_start: number
	range_end: number
}

const PaymentSend = ({
	isChecked,
	title,
	range_start,
	range_end,
	id,
}: IPaymentAddress) => {
	return (
		<Flex
			alignItems='flex-start'
			border={isChecked ? "2px solid #0E668B" : "none"}
			justifyContent='flex-end'
			p='1rem'
			borderRadius='.5rem'
			m='1rem'
			fontFamily='Vazir'>
			<Radio
				cursor='pointer'
				display='flex'
				flexDir='row-reverse'
				ml='.5rem'
				value={id.toString()}
				colorScheme='BlueButton'
				size='lg'
				_focus={{
					outline: 0,
				}}>
				<Flex flexDir='column'>
					<Text
						dir='rtl'
						color='#545454'
						fontSize='14px'
						fontFamily='VazirMedium'
						cursor='pointer'
						mr='.5rem'>
						{title}
					</Text>
					<Flex dir='rtl'>
						<Text
							color='#545454'
							fontSize='12px'
							fontFamily='VazirMedium'
							cursor='pointer'
							mr='.5rem'>
							هزینه ارسال :&nbsp;
						</Text>
						<Text
							color='#545454'
							fontSize='12px'
							fontFamily='VazirMedium'
							cursor='pointer'
							mr='.5rem'>
							{range_start.toLocaleString()}
						</Text>
						<Text
							display={range_end ? "block" : "none"}
							color='#545454'
							fontSize='12px'
							fontFamily='VazirMedium'
							cursor='pointer'
							mr='.5rem'>
							- {range_end?.toLocaleString()}
						</Text>
						<Text
							color='#545454'
							fontSize='12px'
							fontFamily='VazirMedium'
							cursor='pointer'
							mr='.5rem'>
							ریال
						</Text>
					</Flex>
				</Flex>
			</Radio>
		</Flex>
	)
}

export default PaymentSend
