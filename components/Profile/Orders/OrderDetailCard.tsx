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
			border='1px solid #bfbfbf'
			borderRadius='.5rem'
			overflow='hidden'>
			<Image h={{base: "100px", md: "120px"}} src={image_url} />
			<Flex
				w={{base: "100px", md: "120px"}}
				h='auto'
				justifyContent='space-between'>
				<Flex bgColor="red"  mr='.5rem' flexDir='column'>
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
				<Flex h='45px' alignItems='center'>
					<Text
						fontSize={{base: "12px", md: "14px"}}
						color='black'
						variant='normalExt'>
						{`${price.toLocaleString()} ریال`}
					</Text>
				</Flex>
				<Flex h={{base: "35px", md: "40px"}} alignItems='center'>
					<Flex
						border='1px solid #e6e6e6'
						h={{base: "35px", md: "40px"}}
						borderRadius='1.5rem'
						alignItems='center'>
						<Text
							color='black'
							variant='normalMedium'
							fontSize={{base: "12px", md: "16px"}}>
							{count.toString()}
						</Text>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default OrderDetailCard
