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
	Text,
} from "@chakra-ui/react"
import {memo} from "react"
import {useState} from "react"
import {useGetDeliveryStats, useGetPaymentAddresses} from "../../../API"
import PaymentAddress from "../../PaymentAddress"
import PaymentSend from "../../PaymentSend"

interface EditModalprops {
	isOpen: boolean
	onClose: () => void
	orderId: number
	address: {
		id: 0
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

	console.log("Selected :", delivery_type)

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
				<ModalFooter display="flex" justifyContent="flex-start">
					<Button
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
						تایید و پرداخت
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default memo(EditModal)
