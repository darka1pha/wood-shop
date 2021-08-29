import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	RadioGroup,
	Spinner,
	Text,
} from "@chakra-ui/react"
import {useRouter} from "next/dist/client/router"
import {memo} from "react"
import {useState} from "react"
import {useMutation} from "react-query"
import {
	useBuyPendings,
	useGetDeliveryStats,
	useGetPaymentAddresses,
} from "../../../API"
import PaymentAddress from "../../PaymentAddress"
import PaymentSend from "../../PaymentSend"

interface EditModalprops {
	isOpen: boolean
	onClose: () => void
	orderId: number
	address: {
		id: Number
		province: string
		city: string
		street_address: string
		postal_code: string
		receiver_name: string
		receiver_family: string
		receiver_number: string
	}
	delivery_type: number
}

const EditModal = ({
	isOpen,
	onClose,
	orderId,
	address,
	delivery_type,
}: EditModalprops) => {
	const {data: addresses} = useGetPaymentAddresses()
	const {data: deliveries} = useGetDeliveryStats()

	const router = useRouter()

	const [isLoading, setIsLoading] = useState(false)

	const buyMutation = useMutation(useBuyPendings, {
		onSuccess: (res) => {
			setIsLoading(false)
			router.replace(res.redirect_url)
		},
		onError: (err) => {
			setIsLoading(false)
		},
	})

	const [selectedSendMethod, setSelectedSendMethod] = useState(
		delivery_type.toString(),
	)
	const [selectedAddress, setSelectedAddress] = useState(address.id.toString())

	const onSendMethodChange = (sendMethodID) => {
		setSelectedSendMethod(sendMethodID)
	}

	const onSelectedAddressChange = (addressID) => {
		setSelectedAddress(addressID)
	}

	const onBuyClick = () => {
		buyMutation.mutate({
			address: Number(selectedAddress),
			delivery: Number(selectedSendMethod),
			order: orderId,
		})
	}

	if (!addresses || !deliveries) return <h1></h1>
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader dir='rtl' w='100%' fontFamily='Vazir'>
					ویرایش و پرداخت
				</ModalHeader>
				<ModalCloseButton
					_focus={{
						outline: 0,
					}}
					right='90%'
				/>
				<ModalBody display='flex' flexDir='column' justifyContent='flex-start'>
					<Flex flexDir='column' justifyContent='flex-end'>
						<Text fontSize='1.2rem' dir='rtl' fontFamily='VazirMedium'>
							شیوه ارسال
						</Text>
						<RadioGroup
							onChange={onSendMethodChange}
							value={selectedSendMethod}>
							{deliveries.map(({id, range_end, range_start, title}) => (
								<PaymentSend
									isChecked={Number(selectedSendMethod) === id}
									id={id}
									range_end={range_end}
									range_start={range_start}
									title={title}
								/>
							))}
						</RadioGroup>
					</Flex>
					<Flex flexDir='column' justifyContent='flex-end'>
						<Text fontSize='1.2rem' dir='rtl' fontFamily='VazirMedium'>
							آدرس
						</Text>
						<RadioGroup
							onChange={onSelectedAddressChange}
							value={selectedAddress}>
							{addresses.map(({street_address, city, province, id}, key) => (
								<PaymentAddress
									isChecked={Number(selectedAddress) === id}
									address={street_address}
									state={province}
									city={city}
									value={id}
									key={key}
								/>
							))}
						</RadioGroup>
					</Flex>
				</ModalBody>
				<ModalFooter display='flex' justifyContent='flex-start'>
					<Button
						onClick={onBuyClick}
						fontFamily='Vazir'
						color='white'
						bgColor='btnBg'
						_hover={{
							bgColor: "btnHover",
						}}
						_focus={{
							outline: 0,
							bgColor: "btnBg",
						}}
						_active={{
							bgColor: "btnActive",
						}}>
						{isLoading ? <Spinner color='white' /> : "تایید و پرداخت}"}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default memo(EditModal)
