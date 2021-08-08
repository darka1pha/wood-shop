import {Button} from "@chakra-ui/button"
import {useDisclosure} from "@chakra-ui/hooks"
import Icon from "@chakra-ui/icon"
import {Input} from "@chakra-ui/input"
import {Divider, Flex} from "@chakra-ui/layout"
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/modal"
import {RadioGroup} from "@chakra-ui/radio"
import {Spinner} from "@chakra-ui/react"
import {Select} from "@chakra-ui/select"
import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import {RiMapPinAddLine} from "react-icons/ri"
import {useMutation, useQueryClient} from "react-query"
import {connect} from "react-redux"
import {
	useAddAddress,
	useGetAddresses,
	useGetCartInfo,
	useGetCities,
	useGetDeliveryStats,
	useGetPaymentAddresses,
	useGetProvinces,
	usePayment,
} from "../../API"
import {IError, IProvince} from "../../API/interfaces"
import {PaymentAddress, PaymentSend, Text} from "../../components"
import {IRecivedAddress} from "../../components/Profile/Addresses"
import {ISetAlert, setAlert} from "../../redux"

interface IAddress {
	receiver_name?: string
	receiver_family?: string
	receiver_number?: string
	tag?: string
	postal_code?: string
	address?: string
	unit?: string
	city?: string
	province?: string
	id?: number
}

const payment = ({setAlert}) => {
	const [selectedAddress, setSelectedAddress] = useState()
	const [selectedSendMethod, setSelectedSendMethod] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [sendCost, setSendCost] = useState(0)
	const router = useRouter()

	const {data: addresses} = useGetPaymentAddresses()

	const {data: provinces} = useGetProvinces()
	const [cities, setCities] = useState(null)
	const queryClient = useQueryClient()

	const {isOpen, onOpen, onClose} = useDisclosure()
	const paymentMutation = useMutation(usePayment, {
		onSuccess: (res) => {
			setIsLoading(false)
			router.replace(res.redirect_url)
		},
		onError: (err) => {
			setIsLoading(false)
		},
	})

	const {
		data: cartInfo,
		isLoading: isCartInfoLoading,
		isError: cartInfoError,
		isLoadingError: loadingError,
	} = useGetCartInfo()

	const {data: deliveryStats} = useGetDeliveryStats()

	const addAddress = async (newAddress: IAddress) => {
		const {
			address,
			city,
			receiver_family,
			receiver_name,
			receiver_number,
			postal_code,
			province,
			tag,
			unit,
			id,
		} = newAddress

		await addressMutation.mutateAsync({
			city,
			province,
			receiver_family,
			receiver_name,
			receiver_number: "+98" + receiver_number,
			postal_code,
			street_address: address + " " + tag + " " + unit,
		})
		onClose()
	}

	const [tempAddress, setTempAddress] = useState<IAddress>({
		receiver_name: "",
		address: "",
		receiver_family: "",
		postal_code: "",
		receiver_number: "",
		tag: "",
		unit: "",
		city: "",
		province: "",
	})

	const {
		receiver_number,
		postal_code,
		receiver_family,
		tag,
		unit,
		address,
		receiver_name,
		city,
		province,
	} = tempAddress

	const addressMutation = useMutation(
		(data: IRecivedAddress) => useAddAddress(data),
		{
			onSuccess: async (res) => {
				await queryClient.refetchQueries(["profileAddresses"])
			},
			onError: (err: IError) => {
				console.log(err.response)
				setAlert({
					type: "error",
					content: "خطایی رخ داده است!",
				})
			},
		},
	)

	const onAddressFieldChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempAddress({...tempAddress, [e.target.name]: e.target.value})
	}

	const onSelectChanges = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTempAddress({...tempAddress, [e.target.name]: e.target.value})
		const data = await useGetCities(Number(e.target.value))
		setCities(data)
	}

	const onSelectCitiesChanges = async (
		e: React.ChangeEvent<HTMLSelectElement>,
	) => {
		setTempAddress({...tempAddress, [e.target.name]: e.target.value})
	}

	const onConfirmOrder = () => {
		if (selectedSendMethod && selectedAddress) {
			setIsLoading(true)
			paymentMutation.mutate({
				address: Number(selectedAddress),
				delivery_type: Number(selectedSendMethod),
			})
		} else {
			setAlert({
				type: "error",
				content: "لطفا آدرس و شیوه ارسال را انتخاب کنید",
			})
		}
	}

	const onSendMethodChange = (sendMethodID) => {
		setSelectedSendMethod(sendMethodID)
		deliveryStats.map(({id, range_start}) => {
			if (id === Number(sendMethodID)) {
				setSendCost(range_start)
			}
		})
	}

	const onSelectedAddressChange = (addressID) => {
		setSelectedAddress(addressID)
	}

	if (!deliveryStats || !cartInfo || !addresses || !provinces)
		return <h1>nii</h1>

	return (
		<Flex
			as='div'
			lang='fa'
			minH='100vh'
			overflowX='hidden'
			p={{base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem"}}
			bgColor='bgColor'
			flexDir='column'
			alignItems='center'>
			<Flex
				maxW='1280px'
				w='100%'
				p='1rem'
				flexDirection={{base: "column", md: "row-reverse"}}
				justifyContent='space-between'>
				<Flex
					p='2rem 1.5rem'
					border='1px solid #CFCFCF'
					borderRadius='.5rem'
					w={{base: "100%", md: "60%"}}
					justifyContent='flex-end'
					flexDirection='column'>
					<Flex flexDirection='column'>
						<Text dir='rtl' color='#545454' variant='heading6'>
							انتخاب شیوه ارسال
						</Text>
						<RadioGroup
							onChange={onSendMethodChange}
							value={selectedSendMethod}>
							{deliveryStats.map(({id, range_end, range_start, title}) => (
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
					<Text dir='rtl' color='#545454' variant='heading6'>
						انتخاب آدرس برای ارسال
					</Text>
					<RadioGroup
						onChange={onSelectedAddressChange}
						value={selectedAddress}>
						{addresses?.map(({street_address, city, province, id}, key) => (
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
					<Flex
						cursor='pointer'
						onClick={onOpen}
						mr='1rem'
						justifyContent='flex-end'
						alignItems='center'>
						<Text color='#424750' variant='normalExt'>
							اضافه کردن آدرس جدید
						</Text>
						<Icon as={RiMapPinAddLine} ml='.2rem' fontSize='1.4rem' />
					</Flex>
				</Flex>
				<Flex
					h='260px'
					w={{base: "100%", md: "38%"}}
					p='2rem 1.5rem'
					flexDirection='column'
					border='1px solid #CFCFCF'
					borderRadius='.5rem'
					m={{base: "1rem 0", md: "0"}}>
					<Flex dir='rtl' p='0 1rem' flexDirection='column'>
						<Text dir='rtl' color='#545454' variant='heading6'>
							ریز فاکتور
						</Text>
						<Flex m='1rem'>
							<Text dir='rtl' color='#545454' variant='heading7'>
								مبلغ سفارش&nbsp;:&nbsp;
							</Text>
							<Text dir='rtl' color='#545454' variant='normal'>
								{cartInfo?.final_cost.toLocaleString()}
							</Text>
							<Text dir='rtl' color='#545454' variant='normal'>
								&nbsp;ریال
							</Text>
						</Flex>
					</Flex>
					<Flex dir='rtl' p='0 1rem' flexDirection='column'>
						<Flex m='0 1rem'>
							<Text dir='rtl' color='#545454' variant='heading7'>
								هزینه حمل و نقل&nbsp;:&nbsp;
							</Text>
							<Text dir='rtl' color='#545454' variant='normal'>
								{sendCost.toLocaleString()}
							</Text>
							<Text dir='rtl' color='#545454' variant='normal'>
								&nbsp;ریال
							</Text>
						</Flex>
					</Flex>
					<Flex dir='rtl' p='0 1rem' flexDirection='column'>
						<Flex m='1rem'>
							<Text dir='rtl' color='#545454' variant='heading7'>
								مجموع&nbsp;:&nbsp;
							</Text>
							<Text dir='rtl' color='#545454' variant='normal'>
								{(sendCost + cartInfo?.final_cost).toLocaleString()}
							</Text>
							<Text dir='rtl' color='#545454' variant='normal'>
								&nbsp;ریال
							</Text>
						</Flex>
						<Button
							disabled={!selectedAddress || !selectedSendMethod}
							fontFamily='Vazir'
							fontSize='12px'
							bgColor='#348541'
							color='white'
							_hover={{
								bgColor: "#2f783a",
							}}
							_focus={{
								outline: 0,
								bgColor: "#348541",
							}}
							_active={{
								bgColor: "#286632",
							}}
							onClick={onConfirmOrder}>
							{isLoading ? <Spinner color='white' /> : "پرداخت"}
						</Button>
					</Flex>
				</Flex>
			</Flex>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent
					w={{base: "85%", md: "auto"}}
					minW={{base: "320px", md: "640px"}}>
					<ModalHeader dir='rtl' w='100%' fontFamily='Vazir'>
						افزودن آدرس
					</ModalHeader>
					<ModalCloseButton
						_focus={{
							outline: 0,
						}}
						right={{base: "88%", md: "92%"}}
					/>
					<ModalBody p={{base: "1rem 2rem", md: "1rem 4rem"}}>
						<Flex
							flexDir={{base: "column", md: "row"}}
							justifyContent='space-between'>
							<Flex
								mb={{base: "1rem", md: 0}}
								dir='rtl'
								w={{base: "100%", md: "45%"}}
								flexDir='column'>
								<Text mr='.5rem' color='#424750' variant='normal'>
									شهر
								</Text>
								<Select
									fontFamily='Vazir'
									fontSize='12px'
									color='#6F6F6F'
									dir='ltr'
									focusBorderColor='pink.300'
									placeholder='شهر خود را انتخاب کنید'
									onChange={onSelectCitiesChanges}
									value={city}
									name='city'>
									{cities?.map(({id, name}: IProvince) => (
										<option key={id} value={id}>
											{name}
										</option>
									))}
								</Select>
							</Flex>
							<Flex dir='rtl' w={{base: "100%", md: "45%"}} flexDir='column'>
								<Text mr='.5rem' color='#424750' variant='normal'>
									استان
								</Text>
								<Select
									dir='ltr'
									fontFamily='Vazir'
									fontSize='12px'
									color='#6F6F6F'
									onChange={onSelectChanges}
									focusBorderColor='pink.300'
									value={province}
									name='province'
									placeholder='استان خود را انتخاب کنید'>
									{provinces?.map(({id, name}: IProvince) => (
										<option id='province' key={id} value={id}>
											{name}
										</option>
									))}
								</Select>
							</Flex>
						</Flex>
						<Flex m='1rem 0' dir='rtl' flexDir='column'>
							<Text mr='.5rem' color='#424750' variant='normal'>
								نشانی پستی
							</Text>
							<Input
								fontFamily='Vazir'
								fontSize='14px'
								focusBorderColor='pink.300'
								name='address'
								value={address}
								onChange={onAddressFieldChanges}
							/>
						</Flex>
						<Flex
							flexDir={{base: "column", md: "row"}}
							justifyContent='space-between'
							m='1rem 0'
							dir='rtl'>
							<Flex
								mb={{base: "1rem", md: 0}}
								w={{base: "100%", md: "20%"}}
								dir='rtl'
								flexDir='column'>
								<Text mr='.5rem' color='#424750' variant='normal'>
									پلاک
								</Text>
								<Input
									focusBorderColor='pink.300'
									name='tag'
									onChange={onAddressFieldChanges}
									value={tag}
								/>
							</Flex>
							<Flex
								mb={{base: "1rem", md: 0}}
								w={{base: "100%", md: "20%"}}
								dir='rtl'
								flexDir='column'>
								<Text mr='.5rem' color='#424750' variant='normal'>
									واحد
								</Text>
								<Input
									focusBorderColor='pink.300'
									name='unit'
									onChange={onAddressFieldChanges}
									value={unit}
								/>
							</Flex>
							<Flex dir='rtl' flexDir='column'>
								<Text mr='.5rem' color='#424750' variant='normal'>
									کد پستی
								</Text>
								<Input
									focusBorderColor='pink.300'
									name='postal_code'
									onChange={onAddressFieldChanges}
									value={postal_code}
								/>
							</Flex>
						</Flex>
						<Flex h='1px' w='100%' bgColor='#E9E9E9' />
						<Flex
							flexDir={{base: "column", md: "row"}}
							justifyContent='space-between'
							m='1rem 0'
							dir='rtl'>
							<Flex
								mb={{base: "1rem", md: 0}}
								w={{base: "100%", md: "45%"}}
								dir='rtl'
								flexDir='column'>
								<Text mr='.5rem' color='#424750' variant='normal'>
									نام گیرنده
								</Text>
								<Input
									focusBorderColor='pink.300'
									name='receiver_name'
									onChange={onAddressFieldChanges}
									value={receiver_name}
								/>
							</Flex>
							<Flex w={{base: "100%", md: "45%"}} dir='rtl' flexDir='column'>
								<Text mr='.5rem' color='#424750' variant='normal'>
									نام خانوادگی گیرنده
								</Text>
								<Input
									focusBorderColor='pink.300'
									name='receiver_family'
									onChange={onAddressFieldChanges}
									value={receiver_family}
								/>
							</Flex>
						</Flex>
						<Flex justifySelf='flex-end' w='100%' dir='rtl' flexDir='column'>
							<Text mr='.5rem' color='#424750' variant='normal'>
								شماره تلفن
							</Text>
							<Input
								focusBorderColor='pink.300'
								w={{base: "100%", md: "45%"}}
								name='receiver_number'
								onChange={onAddressFieldChanges}
								value={receiver_number}
							/>
						</Flex>
					</ModalBody>
					<ModalFooter dir='rtl'>
						<Button
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
							mr={3}
							onClick={() => addAddress(tempAddress)}>
							تایید و ثبت
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	)
}

const mapDispatchToProps = (dispatch) => ({
	setAlert: ({type, content}: ISetAlert) => dispatch(setAlert({content, type})),
})

export default connect(null, mapDispatchToProps)(payment)
