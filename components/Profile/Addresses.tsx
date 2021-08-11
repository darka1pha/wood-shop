import {Button} from "@chakra-ui/button"
import {useDisclosure} from "@chakra-ui/hooks"
import Icon from "@chakra-ui/icon"
import {Input} from "@chakra-ui/input"
import {Flex, FlexProps} from "@chakra-ui/layout"
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/modal"
import {Select} from "@chakra-ui/select"
import {motion} from "framer-motion"
import Head from "next/head"
import React, {useEffect, useRef, useState, Fragment} from "react"
import {FiChevronLeft} from "react-icons/fi"
import {RiMapPinAddLine} from "react-icons/ri"
import {useMutation, useQueryClient} from "react-query"
import {
	useAddAddress,
	useDeleteAddress,
	useGetAddresses,
	useGetCities,
	useGetProvinces,
} from "../../API"
import {IError, IProvince} from "../../API/interfaces"
import AddressesSkeleton from "../Skeleton/AddressesSkeleton"
import Text from "../Text"
import AddressItem from "./AddressItem"

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
}

export interface IRecivedAddress {
	id?: number
	province: number | string
	city: number | string
	street_address: string
	postal_code: string
	receiver_name: string
	receiver_family: string
	receiver_number: string
}

const Addresses = () => {
	const {isOpen, onOpen, onClose} = useDisclosure()
	const containerRef = useRef(null)
	const queryClient = useQueryClient()

	const [cities, setCities] = useState(null)

	const {
		data: addresses,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isSuccess,
	} = useGetAddresses()

	const {data: provinces} = useGetProvinces()

	const {mutateAsync: deleteMutation} = useMutation(useDeleteAddress, {
		onSuccess: async () => {
			await queryClient.refetchQueries(["userAddresses"])
		},
	})

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

	const removeAddress = async (id: number) => {
		console.log("Id of Address: ", id)
		deleteMutation(id)
	}

	const addressMutation = useMutation(
		(data: IRecivedAddress) => useAddAddress(data),
		{
			onSuccess: async (res) => {
				await queryClient.refetchQueries(["userAddresses"])
			},
			onError: (err: IError) => {
				console.log(err.response)
			},
		},
	)

	const isBottom = (el) => {
		return el.current?.getBoundingClientRect().bottom <= window.innerHeight
	}

	const fetchMoreItems = () => {
		fetchNextPage()
	}

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

	useEffect(() => {
		console.log("Cities: ", cities)
		const trackScrolling = () => {
			if (containerRef) {
				if (isBottom(containerRef)) {
					if (hasNextPage) {
						fetchMoreItems()
						document.removeEventListener("scroll", trackScrolling)
					}
				}
			}
		}
		document.addEventListener("scroll", trackScrolling)
		return () => {
			document.removeEventListener("scroll", trackScrolling)
		}
	}, [addresses, containerRef, provinces, cities])

	if (!provinces || !addresses) return <AddressesSkeleton />
	return (
		<Flex
			w='100%'
			minH='340px'
			mr={{base: 0, md: "2rem"}}
			borderRadius='.5rem'
			border='1px solid #CFCFCF'
			justifyContent='flex-start'
			alignItems='flex-end'
			flexDir='column'
			overflow='hidden'
			p='1.5rem'
			ref={containerRef}>
			<Head>
				<title>آدرس ها</title>
				<meta name='description' content='اصلاعات پروفایل کاربر' />
				<meta name='keywords' content='پروفایل,اطلاعات کاربری,فروشگاه آنلاین' />
				<meta property='og:title' content='آدرس ها' />
				<meta property='og:description' content='اصلاعات پروفایل کاربر' />
				<meta property='og:type' content='website' />
			</Head>
			<Flex
				alignItems='center'
				pb='.5rem'
				borderBottom='2px solid #0E668B'
				h={{base: "35px", md: "35px"}}
				mb='2rem'>
				<Text variant='heading5'>نشانی ها</Text>
			</Flex>

			{isSuccess &&
				addresses?.pages?.map((group, index) => (
					<Fragment key={index}>
						{group?.results.map(
							(
								{
									id,
									city,
									postal_code,
									province,
									receiver_family,
									receiver_name,
									receiver_number,
									street_address,
								}: IRecivedAddress,
								key: number,
							) => (
								<AddressItem
									address={street_address}
									id={id}
									key={key}
									name={receiver_name + " " + receiver_family}
									postal_code={postal_code}
									phone_number={receiver_number}
									onRemove={() => removeAddress(id)}
									city={city}
									state={province}
								/>
							),
						)}
					</Fragment>
				))}
			<Flex
				onClick={onOpen}
				cursor='pointer'
				mt='1rem'
				w='100%'
				flexDir='row-reverse'
				justifyContent='space-between'>
				<Flex alignItems='center'>
					<Text color='#424750' variant='normalExt'>
						اضافه کردن آدرس جدید
					</Text>
					<Icon as={RiMapPinAddLine} ml='.2rem' fontSize='1.4rem' />
				</Flex>
				<Icon as={FiChevronLeft} />
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

export default Addresses
