import Icon from "@chakra-ui/icon"
import {Flex} from "@chakra-ui/layout"
import {AiOutlineDelete, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai"
import {useMutation, useQueryClient} from "react-query"
import {connect} from "react-redux"
import {Text} from "."
import {useDeleteCart, useUpdateCart} from "../API"
import {ICart} from "../API/interfaces"
import {setLoading} from "../redux"

const CartItem = ({count, product, id, setLoading, form}: ICart) => {
	const {id: productID, image, name, price} = product
	const queryQlient = useQueryClient()
	const increaseMutation = useMutation(useUpdateCart, {
		onSuccess: async () => {
			await queryQlient.refetchQueries("cartInfo")
			await queryQlient.refetchQueries("cart")
			await queryQlient.refetchQueries("cartCounts")
			setTimeout(() => setLoading(false), 1000)
		},
		onError: (err) => {
			console.log("Increase Error: ", err)
			setTimeout(() => setLoading(false), 1000)
		},
	})
	const decreaceMutation = useMutation(useUpdateCart, {
		onSuccess: async () => {
			await queryQlient.refetchQueries("cartInfo")
			await queryQlient.refetchQueries("cart")
			await queryQlient.refetchQueries("cartCounts")
			setTimeout(() => setLoading(false), 1000)
		},
		onError: (err) => {
			console.log("Decrease Error: ", err)
			setTimeout(() => setLoading(false), 1000)
		},
	})

	const deleteMutation = useMutation(useDeleteCart, {
		onSuccess: async () => {
			queryQlient.refetchQueries("cart")
			queryQlient.refetchQueries("cartInfo")
			queryQlient.refetchQueries("cartCounts")
			setLoading(false)
		},
		onError: (err) => {
			console.log("Delete Error: ", err)
			setTimeout(() => setLoading(false), 1000)
		},
	})

	const onIncreaseItem = () => {
		setLoading(true)
		increaseMutation.mutate({cart_id: id, count: 1})
	}

	const onDecreaseItem = () => {
		setLoading(true)
		decreaceMutation.mutate({cart_id: id, count: -1})
	}

	const onDeleteItem = () => {
		setLoading(true)
		deleteMutation.mutate({cart_id: id})
	}
	console.log(form)

	return (
		<Flex m='.5rem 0' h={{base: "100px", md: "120px"}}>
			<Flex
				h='100%'
				w={{base: "100px", md: "120px"}}
				bgImage={`url(${image})`}
				bgSize='contain'
				bgRepeat='no-repeat'
			/>
			<Flex w='100%' justifyContent='space-between'>
				<Flex mr='.5rem' flexDir='column'>
					<Text fontSize={{base: "12px", md: "16px"}} variant='heading6'>
						{name}
					</Text>
					<Text
						fontSize={{base: "10px", md: "12px"}}
						color='#717171'
						variant='normal'>
						سلامت فیزیکی
					</Text>
					{form &&
						Object.keys(form)
							.slice(0, 4)
							.map((key) => (
								<Flex key={key}>
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
					<Icon
						fontSize={{base: "0.7rem", md: "1rem"}}
						color='#4f4f4f'
						cursor='pointer'
						m={{base: "0 .5rem", md: "0 .8rem"}}
						as={AiOutlineDelete}
						onClick={onDeleteItem}
					/>
					<Flex
						border='1px solid #e6e6e6'
						h={{base: "35px", md: "40px"}}
						borderRadius='1.5rem'
						alignItems='center'>
						<Icon
							role='button'
							fontSize={{base: "0.7rem", md: "1rem"}}
							color={count === 1 ? "#7a7a7a" : "#4f4f4f"}
							cursor={count === 1 ? "not-allowed" : "pointer"}
							m={{base: "0 .5rem", md: "0 .8rem"}}
							as={AiOutlineMinus}
							onClick={count === 1 ? null : onDecreaseItem}
						/>
						<Text
							color='black'
							variant='normalMedium'
							fontSize={{base: "12px", md: "16px"}}>
							{count.toString()}
						</Text>
						<Icon
							color='#4f4f4f'
							cursor='pointer'
							m={{base: "0 .5rem", md: "0 .8rem"}}
							fontSize={{base: "0.7rem", md: "1rem"}}
							as={AiOutlinePlus}
							onClick={onIncreaseItem}
						/>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

const mapDispatchToProps = (dispatch) => ({
	setLoading: (isLoading: boolean) => dispatch(setLoading(isLoading)),
})

export default connect(null, mapDispatchToProps)(CartItem)
