import {
	Button,
	CheckboxGroup,
	Flex,
	Icon,
	Input,
	InputGroup,
	InputRightAddon,
	InputRightElement,
	Text,
} from "@chakra-ui/react"
import {useState} from "react"
import {FiSearch} from "react-icons/fi"
import BrandItem from "./BrandItem"

const BrandsContainer = () => {
	const [filters, setFilters] = useState([])
	const onCheckboxGroupChange = (selectedFilter) => {
		console.log(selectedFilter)
		setFilters(selectedFilter)
	}
	return (
		<Flex
			p='1rem'
			w='100%'
			bgColor='itemsBg'
			my='.5rem'
			borderRadius='0.5rem'
			flexDir='column'>
			<Flex flexDir='row-reverse' w='100%'>
				<Text dir='rtl' fontFamily='VazirBold' fontSize='18px'>
					برند
				</Text>
			</Flex>
			<Flex w='100%' my='.5rem'>
				<InputGroup>
					<Input
						fontFamily='Vazir'
						justifyContent='center'
						dir='rtl'
						placeholder='جستجو...'
						pr='2rem'
						bgColor='#e7e7e7'
						_placeholder={{color: "#b7b7b7"}}
						_focus={{
							outline: 0,
							border: "1px solid #b7b7b7",
						}}
					/>
					<InputRightElement
						children={<Icon color='#b7b7b7' as={FiSearch} />}
					/>
				</InputGroup>
			</Flex>
			<Flex flexDir='column' w='100%' my='.5rem'>
				<CheckboxGroup onChange={onCheckboxGroupChange}>
					<BrandItem title_en='Test' title_fa='تست' id={1} />
					<BrandItem title_en='Test' title_fa='تست' id={2} />
					<BrandItem title_en='Test' title_fa='تست' id={3} />
					<BrandItem title_en='Test' title_fa='تست' id={4} />
					<BrandItem title_en='Test' title_fa='تست' id={5} />
					<BrandItem title_en='Test' title_fa='تست' id={6} />
					<BrandItem title_en='Test' title_fa='تست' id={7} />
				</CheckboxGroup>
				<Button
					fontFamily='Vazir'
					bgColor='btnBg'
					color='white'
					_hover={{
						bgColor: "btnHover",
					}}
					_focus={{
						outline: 0,
						bgColor: "btnBg",
					}}
					_active={{
						bgColor: "btnActive",
					}}
					display='flex'
					h='35px'
					onClick={() => console.log(filters)}
					disabled={filters.length === 0}>
					اعمال فیلتر
				</Button>
			</Flex>
		</Flex>
	)
}

export default BrandsContainer
