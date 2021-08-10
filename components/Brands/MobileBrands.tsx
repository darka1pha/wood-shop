import {
	Button,
	Checkbox,
	CheckboxGroup,
	Flex,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
} from "@chakra-ui/react"
import {useState} from "react"
import {ChangeEventHandler} from "react"
import {CgPlayListSearch} from "react-icons/cg"
import BrandItem from "./BrandItem"

const MobileBrands = () => {
	const {isOpen, onOpen, onClose} = useDisclosure()
	const [filters, setFilters] = useState([])
	const onCheckboxGroupChange = (selectedFilter) => {
		console.log(selectedFilter)
		setFilters(selectedFilter)
	}
	return (
		<Flex
			display={{base: "flex", md: "none"}}
			bgColor={{base: "transparent", md: "itemsBg"}}
			alignItems='center'
			p='0 .5rem 0 0'
			dir='rtl'
			borderRadius='.5rem'
			mb='1rem'>
			<Button
				_focus={{
					outline: 0,
				}}
				_active={{
					outline: 0,
				}}
				_hover={{
					outline: 0,
				}}
				onClick={onOpen}
				fontFamily='Vazir'
				fontSize='12px'
				display='flex'
				bgColor='itemsBorder'
				h='35px'
				rightIcon={
					<Icon fontSize='1.3rem' as={CgPlayListSearch} color='black' />
				}>
				جستجوی پیشرفته
			</Button>
			<Modal lockFocusAcrossFrames isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent top='10px'>
					<ModalCloseButton
						_focus={{
							outline: 0,
						}}
						_active={{
							outline: 0,
						}}
					/>
					<ModalBody p='2rem 0'>
						<ModalHeader
							fontFamily='Vazir'
							fontSize='18px'
							display='flex'
							alignItems='center'
							justifyContent='center'>
							جستجوی پیشرفته
						</ModalHeader>
						<Flex w='100%' justifyContent='center'>
							<Flex w='240px' flexDir='column'>
								<CheckboxGroup onChange={(e) => onCheckboxGroupChange(e)}>
									<BrandItem title_en='Test' title_fa='تست' id={1} />
									<BrandItem title_en='Test' title_fa='تست' id={2} />
									<BrandItem title_en='Test' title_fa='تست' id={3} />
									<BrandItem title_en='Test' title_fa='تست' id={4} />
									<BrandItem title_en='Test' title_fa='تست' id={5} />
									<BrandItem title_en='Test' title_fa='تست' id={6} />
									<BrandItem title_en='Test' title_fa='تست' id={7} />
								</CheckboxGroup>
								<Button
									onClick={() => console.log(filters)}
									disabled={filters.length === 0}
									fontFamily='Vazir'>
									تایید
								</Button>
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Flex>
	)
}

export default MobileBrands
