import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Select } from "@chakra-ui/select";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import { RiMapPinAddLine } from "react-icons/ri";
import Text from "../Text";
import AddressItem from "./AddressItem";


interface IAddress {
	name?: string;
	lastname?: string;
	tag?: string;
	phoneNumber?: string;
	postalCode?: string;
	address?: string;
	unit?: string;

	city?: string;
	state?: string;

}

const Addresses = () => {

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [addresses, setAddresses] = useState<Array<IAddress>>([{
		name: "ابوالفضل",
		address: "کرمان ایران مریکا",
		lastname: "عمرانی",
		postalCode: "2564365874",
		phoneNumber: "09378239855",
		tag: "شهید حقانی",
		unit: "4",

		city: "کرمان",
		state: "کرمان"

	}, {
		name: "حمیت",
		address: "کرمان ایران مریکا",
		lastname: "رادفر",
		postalCode: "2564365874",
		phoneNumber: "09378239855",
		tag: "شهید حقانی",
		unit: "10",

		city: "کرمان",
		state: "کرمان"

	},
	])

	const [tempAddress, setTempAddress] = useState<IAddress>({
		name: "",
		address: "",
		lastname: "",
		postalCode: "",
		phoneNumber: "",
		tag: "",
		unit: "",
		city: "",
		state: ""

	})

	const { lastname, postalCode, phoneNumber, tag, unit, address, name, city, state } = tempAddress
	const removeAddress = (id: number) => {
		console.log(id)
		setAddresses(addresses.filter((_, index) => {
			return index != id
		}))
	}

	const addAddress = (newAddress: IAddress) => {
		console.log(newAddress)
		setAddresses([...addresses, newAddress])
		setTempAddress({
			name: "",
			address: "",
			lastname: "",
			postalCode: "",
			phoneNumber: "",
			tag: "",
			unit: "",
			city: "",
			state: ""
		})
		onClose()
	}

	const onAddressFieldChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempAddress({ ...tempAddress, [e.target.name]: e.target.value });
	}

	const onSelectChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setTempAddress({ ...tempAddress, [e.target.name]: e.target.value });
	}

	return (
		<Flex
			w="100%"
			minH="340px"
			mr="2rem"
			borderRadius=".5rem"
			border="1px solid #CFCFCF"
			justifyContent="flex-start"
			alignItems="flex-end"
			flexDir="column"
			overflow="hidden"
			p="1.5rem"
		>
			<Flex
				alignItems="center"
				pb="1rem"
				borderBottom="2px solid #0E668B"
				h="10%">
				<Text variant="heading5">
					نشانی ها
				</Text>
			</Flex>
			{
				addresses.map(({ unit, tag, address, phoneNumber, postalCode, lastname, name, city, state }, key: number) => (
					<AddressItem
						address={address}
						id={key}
						key={key}
						name={name + " " + lastname}
						postal_code={postalCode}
						phone_number={phoneNumber}
						onRemove={() => removeAddress(key)}
						city={city}
						state={state}
					/>
				))
			}
			<Flex onClick={onOpen} cursor="pointer" mt="1rem" w="100%" flexDir="row-reverse" justifyContent="space-between">
				<Flex
					alignItems="center"
				>
					<Text color="#424750" variant="normalExt">
						اضافه کردن آدرس جدید
					</Text>
					<Icon
						as={RiMapPinAddLine}
						ml=".2rem"
						fontSize="1.4rem"
					/>
				</Flex>
				<Icon
					as={FiChevronLeft}
				/>
			</Flex>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent minW="640px">
					<ModalHeader dir="rtl" w="100%" fontFamily="iranSans">افزودن آدرس</ModalHeader>
					<ModalCloseButton
						_focus={{
							outline: 0
						}}
						right="92%"
					/>
					<ModalBody p="1rem 4rem">
						<Flex justifyContent="space-between">
							<Flex dir="rtl" w="45%" flexDir="column">
								<Text mr=".5rem" color="#424750" variant="normal">
									شهر
								</Text>
								<Select
									fontFamily="iranSans"
									fontSize="12px"
									color="#6F6F6F"
									dir="ltr"
									focusBorderColor="pink.300"
									placeholder="شهر خود را انتخاب کنید"
									onChange={onSelectChanges}
									value={city}
									name="city"
								>
									<option value="تهران">تهران</option>
									<option value="کرمان">کرمان</option>
									<option value="شیراز">شیراز</option>
								</Select>
							</Flex>
							<Flex dir="rtl" w="45%" flexDir="column">
								<Text mr=".5rem" color="#424750" variant="normal">
									استان
								</Text>
								<Select
									dir="ltr"
									fontFamily="iranSans"
									fontSize="12px"
									color="#6F6F6F"
									onChange={onSelectChanges}
									focusBorderColor="pink.300"
									value={state}
									name="state"
									placeholder="استان خود را انتخاب کنید">
									<option value="تهران">تهران</option>
									<option value="کرمان">کرمان </option>
									<option value="شیراز">شیراز</option>
								</Select>
							</Flex>

						</Flex>
						<Flex m="1rem 0" dir="rtl" flexDir="column">
							<Text mr=".5rem" color="#424750" variant="normal">
								نشانی پستی
							</Text>
							<Input
								fontFamily="iranSans"
								fontSize="14px"
								focusBorderColor="pink.300"
								name="address"
								value={address}
								onChange={onAddressFieldChanges}
							/>
						</Flex>
						<Flex justifyContent="space-between" m="1rem 0" dir="rtl">
							<Flex w="20%" dir="rtl" flexDir="column">
								<Text mr=".5rem" color="#424750" variant="normal">
									پلاک
								</Text>
								<Input
									focusBorderColor="pink.300"
									name="tag"
									onChange={onAddressFieldChanges}
									value={tag}
								/>
							</Flex>
							<Flex w="20%" dir="rtl" flexDir="column">
								<Text mr=".5rem" color="#424750" variant="normal">
									واحد
								</Text>
								<Input
									focusBorderColor="pink.300"
									name="unit"
									onChange={onAddressFieldChanges}
									value={unit}
								/>
							</Flex>
							<Flex dir="rtl" flexDir="column">
								<Text mr=".5rem" color="#424750" variant="normal">
									کد پستی
								</Text>
								<Input
									focusBorderColor="pink.300"
									name="postalCode"
									onChange={onAddressFieldChanges}
									value={postalCode}
								/>
							</Flex>
						</Flex>
						<Flex h="1px" w="100%" bgColor="#E9E9E9" />
						<Flex justifyContent="space-between" m="1rem 0" dir="rtl">
							<Flex w="45%" dir="rtl" flexDir="column">
								<Text mr=".5rem" color="#424750" variant="normal">
									نام گیرنده
								</Text>
								<Input
									focusBorderColor="pink.300"
									name="name"
									onChange={onAddressFieldChanges}
									value={name}
								/>
							</Flex>
							<Flex w="45%" dir="rtl" flexDir="column">
								<Text mr=".5rem" color="#424750" variant="normal">
									نام خانوادگی گیرنده
								</Text>
								<Input
									focusBorderColor="pink.300"
									name="lastname"
									onChange={onAddressFieldChanges}
									value={lastname}
								/>
							</Flex>
						</Flex>
						<Flex justifySelf="flex-end" w="100%" dir="rtl" flexDir="column">
							<Text mr=".5rem" color="#424750" variant="normal">
								شماره تلفن
								</Text>
							<Input
								focusBorderColor="pink.300"
								w="45%"
								name="phoneNumber"
								onChange={onAddressFieldChanges}
								value={phoneNumber}
							/>
						</Flex>
					</ModalBody>
					<ModalFooter dir="rtl">
						<Button
							fontFamily="iranSans"
							fontSize="12px"
							bgColor="#EF394E"
							color="white"
							_hover={{
								bgColor: "#EF394E"
							}}
							_focus={{
								outline: 0,
								bgColor: '#EF394E'
							}}
							_active={{
								bgColor: "#E3122A"
							}}
							mr={3}
							onClick={() => addAddress(tempAddress)}>
							تایید و ثبت
            		</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Flex>
	);
}

export default Addresses;