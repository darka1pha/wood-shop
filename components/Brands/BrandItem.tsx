import {Checkbox, Flex, Icon, Square, Text} from "@chakra-ui/react"
import {BsFillSquareFill} from "react-icons/bs"
import {IBrands} from "../../API/interfaces"

const BrandItem = ({id, title_en, title_fa}: IBrands) => {
	return (
		<Flex alignItems='center' dir='rtl' w='100%' p='.5rem' my='.3rem'>
			<Checkbox
				value={id.toString()}
				borderRadius='.1rem'
				colorScheme='whiteAlpha'
				icon={<Square size='3' borderRadius='.1rem' bgColor='#0E668B' />}
			/>
			<Flex color='#525252' justifyContent='space-between' w='100%' mr='.5rem'>
				<Text fontFamily='VazirMedium' fontSize='12px'>
					{title_fa}
				</Text>
				<Text fontFamily='VazirMedium' fontSize='12px'>
					{title_en}
				</Text>
			</Flex>
		</Flex>
	)
}

export default BrandItem
