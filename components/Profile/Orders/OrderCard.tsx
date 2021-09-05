import {
	Image,
	Button,
	Divider,
	Flex,
	Icon,
	Spinner,
	Text,
	Tooltip,
} from "@chakra-ui/react"
import {useRouter} from "next/dist/client/router"
import Link from "next/link"
import {CgDanger} from "react-icons/cg"
import {FiChevronLeft} from "react-icons/fi"
import useMonthToString from "../../../utils/monthToString"

interface OrderCardProps {
	isPending?: boolean
	id: number
	items: [
		{
			name: string
			image: string
		},
	]
	ordered_date: string
	delivery_cost: number
	cost: number
	openModal?: () => void
}

const OrderCard = ({
	isPending,
	cost,
	delivery_cost,
	id,
	items,
	ordered_date,
	openModal,
}: OrderCardProps) => {
	const router = useRouter()
	const _date = ordered_date.split("-")
	const stringMonth = useMonthToString({month: _date[1]})
	console.log("MONTH: ", stringMonth)
	const newDate = `${_date[2].split("T")[0]} ${stringMonth} ${_date[0]}`

	const image_url =
		"https://images.unsplash.com/photo-1629887571501-ac588e591d56?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"

	return (
		<Flex
			my='1rem'
			border='1px solid #E1E1E1'
			borderRadius='.5rem'
			p='1rem '
			justifyContent='center'
			w='100%'
			flexDir='column'>
			<Flex flexDir='column' w='100%'>
				<Flex
					fontFamily='Vazir'
					fontSize={14}
					alignItems={{base: "start", md: "center"}}
					justifyContent='space-between'
					flexDir={{base: "column", md: "row"}}>
					<Flex>
						<Text dir='rtl'>{newDate} &nbsp;&#8226;</Text>
						<Text> &nbsp;ARC-{id} &nbsp;</Text>
					</Flex>
					<Flex cursor='pointer' alignItems='center'>
						<Text
							dir='rtl'
							color='#47C0DF'
							fontFamily='Vazir'
							fontWeight='400'
							fontSize='14px'>
							<Link
								href={{
									pathname: "orders/[orderId]",
									query: {
										orderId: id,
										prev: router.query.activeTab,
									},
								}}>
								مشاهده سفارش
							</Link>
						</Text>
						<Icon color='#47C0DF' as={FiChevronLeft} />
					</Flex>
				</Flex>
				<Flex fontSize={12} my='.5rem'>
					<Text color='#81858b'>مبلغ کل : &nbsp;</Text>
					<Text>{(delivery_cost + cost).toLocaleString()}&nbsp;</Text>
					<Text>ریال</Text>
				</Flex>
			</Flex>
			<Divider my='.5rem' />
			<Flex flexDir='column'>
				<Flex>
					<Text fontSize={14}>محصولات</Text>
				</Flex>
				<Flex m='1rem' flexWrap='wrap'>
					{items?.map(({image, name}, key) => (
						<Tooltip key={key} label={name}>
							<Image src={image_url} h='80px' w='auto' />
						</Tooltip>
					))}
				</Flex>
			</Flex>
			<Divider display={isPending ? "auto" : "none"} my='.5rem' />
			<Flex
				flexWrap='wrap'
				display={isPending ? "flex" : "none"}
				alignItems={{base: "start", md: "center"}}
				justifyContent='space-between'
				flexDir={{base: "column", md: "row"}}>
				<Flex alignItems='center' mb={{base: ".5rem", md: "0.5rem"}}>
					<Icon ml='.5rem' fontSize={25} color='orange.300' as={CgDanger} />
					<Text fontSize={14} color='orange.300'>
						در صورت عدم پرداخت تمام این سفارش به‌صورت خودکار لغو خواهد شد.
					</Text>
				</Flex>
				<Flex>
					<Button
						ml='.5rem'
						fontFamily='Vazir'
						fontSize='12px'
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
						}}
						onClick={openModal}>
						ویرایش اطلاعات و پرداخت
					</Button>
					<Button
						fontFamily='Vazir'
						fontSize='12px'
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
						}}
						onClick={() => console.log("Do Somthing")}>
						پرداخت
					</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default OrderCard
