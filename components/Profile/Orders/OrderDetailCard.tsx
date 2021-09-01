import {Flex} from "@chakra-ui/layout"
import {Image} from "@chakra-ui/react"
import {ICart} from "../../../API/interfaces"
import Text from "../../Text"

const OrderDetailCard = ({count, product, form}: ICart) => {
	const {id: productID, image, name, price} = product
	const image_url =
		"https://images.unsplash.com/photo-1629887571501-ac588e591d56?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
	return (
		<Flex
			m='.5rem 0'
			h={{base: "100px", md: "120px"}}
			boxShadow='md'
			borderRadius='.5rem'
			overflow='hidden'>
			<Image h={{base: "100px", md: "120px"}} src={image_url} />
			<Flex w='100%' p='.5rem 1rem' justifyContent='space-between'>
				<Flex mr='.5rem' flexDir='column'>
					<Text fontSize={{base: "12px", md: "16px"}} variant='heading6'>
						{name}
					</Text>
					{form &&
						Object.keys(form)
							.slice(0, 4)
							.map((key) => (
								<Flex>
									<Text
										fontSize={{base: "10px", md: "12px"}}
										color='#717171'
										variant='normal'>
										{key}
									</Text>
									<Text
										fontSize={{base: "10px", md: "12px"}}
										color='#717171'
										variant='normal'>
										{form[key]}
									</Text>
								</Flex>
							))}
				</Flex>
				<Flex
					flexDir='column'
					h='100%'
					justifyContent='center'
					alignItems='center'>
					<Text
						fontSize={{base: "12px", md: "14px"}}
						color='black'
						variant='normalExt'>
						قیمت واحد
					</Text>
					<Text
						mt='.5rem'
						fontSize={{base: "12px", md: "14px"}}
						color='black'
						variant='normalExt'>
						{`${price.toLocaleString()} ریال`}
					</Text>
				</Flex>
				<Flex
					border='1px solid #e6e6e6'
					flexDir='column'
					p="1rem"
					borderRadius='1.5rem'
					alignItems='center'
					justifyContent='center'>
					<Text
						fontSize={{base: "12px", md: "14px"}}
						color='black'
						variant='normalExt'>
						تعداد
					</Text>
					<Text
						color='black'
						variant='normalMedium'
						fontSize={{base: "12px", md: "16px"}}>
						{count.toString()}
					</Text>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default OrderDetailCard
