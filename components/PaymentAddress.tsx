import {Flex} from "@chakra-ui/layout"
import {Radio} from "@chakra-ui/radio"
import {Text} from "@chakra-ui/react"

interface IPaymentAddress {
	address?: string
	value?: string
	city?: string
	state?: string
	checked?: boolean
}

const PaymentAddress = ({
	address,
	value,
	city,
	state,
	checked,
}: IPaymentAddress) => {
	return (
		<Flex justifyContent='flex-end' m='1rem' fontFamily='Vazir'>
			<Radio
				isChecked={checked}
				cursor='pointer'
				display='flex'
				flexDir='row-reverse'
				ml='.5rem'
				value={value.toString()}
				transition='ease-in-out all 300ms'
				colorScheme='BlueButton'
				size='lg'
				_focus={{
					outline: 0,
				}}>
				<Text
					color={checked ? "#0E668B" : "black"}
					cursor='pointer'
					mr='.5rem'
					fontFamily='Vazir'
					fontSize='12px'
					fontWeight={checked ? "700" : "500"}
					transition='ease-in-out all 300ms'>
					{state + " -  " + city + " , " + address}
				</Text>
			</Radio>
		</Flex>
	)
}

export default PaymentAddress
