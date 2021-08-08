import {Button} from "@chakra-ui/button"
import {Divider, Flex} from "@chakra-ui/layout"
import {Spinner} from "@chakra-ui/react"
import {useRouter} from "next/router"
import {useState} from "react"
import {Text} from "."

interface ICartDetails {
	final_cost: number
	total_cost: number
	total_off: number
}

const CartDetails = ({final_cost, total_cost, total_off}: ICartDetails) => {
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	return (
		<Flex flexDir='column' w='100%' h='100%'>
			<Flex
				m='1rem 0'
				justifyContent='space-between'
				w='100%'
				flexDir='row-reverse'>
				<Text dir='rtl' color='black' fontSize='12px' variant='normalMedium'>
					مجموع قیمت
				</Text>
				<Flex alignItems='center' flexDir='row-reverse'>
					<Text color='black' variant='normalExt'>
						{total_cost?.toLocaleString()}
					</Text>
					<Text color='#717171' fontSize='12px' variant='normalMedium'>
						ریال&nbsp;
					</Text>
				</Flex>
			</Flex>
			<Flex
				m='.5rem 0'
				justifyContent='space-between'
				w='100%'
				flexDir='row-reverse'>
				<Text dir='rtl' color='black' fontSize='12px' variant='normalMedium'>
					سود شما
				</Text>
				<Flex alignItems='center' flexDir='row-reverse'>
					<Text color='#13bf52' variant='normalExt'>
						{total_off === null || !total_off
							? "0"
							: total_off.toLocaleString()}
					</Text>
					<Text color='#717171' fontSize='12px' variant='normalMedium'>
						ریال&nbsp;
					</Text>
				</Flex>
			</Flex>
			<Divider />
			<Flex
				m='1rem 0'
				justifyContent='space-between'
				w='100%'
				flexDir='row-reverse'>
				<Text fontSize='12px' variant='normalMedium' dir='rtl' color='black'>
					مبلغ قابل پرداخت
				</Text>
				<Flex alignItems='center' flexDir='row-reverse'>
					<Text color='black' variant='normalExt'>
						{final_cost?.toLocaleString()}
					</Text>
					<Text color='#717171' fontSize='12px' variant='normalMedium'>
						ریال&nbsp;
					</Text>
				</Flex>
			</Flex>
			<Flex w='100%'>
				<Button
					onClick={
						final_cost === 0
							? null
							: () => {
									setLoading(true)
									final_cost === 0 ? null : router.push("/cart/payment")
							  }
					}
					disabled={final_cost === 0}
					fontFamily='Vazir'
					fontSize='12px'
					bgColor='#EF394E'
					color='white'
					_hover={{
						bgColor: "#EF394E",
					}}
					_focus={{
						outline: 0,
						bgColor: "#EF394E",
					}}
					_active={{
						bgColor: "#E3122A",
					}}
					w='100%'>
					{isLoading ? <Spinner color='white' /> : " ادامه فرایند خرید"}
				</Button>
			</Flex>
		</Flex>
	)
}

export default CartDetails
