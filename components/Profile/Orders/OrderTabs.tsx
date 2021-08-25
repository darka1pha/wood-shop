import {Flex, TabList, TabPanel, TabPanels, Tabs} from "@chakra-ui/react"
import {useRouter} from "next/dist/client/router"
import {useState} from "react"
import {orderTabsProps} from "./interfaces"
import OrderCard from "./OrderCard"
import TabItem from "./TabItem"

const orderTitles = [
	{
		engTitle: "pending",
		title: "در انتظار پرداخت",
		count: 5,
	},
	{
		engTitle: "done",
		title: "تحویل داده شده",
		count: 4,
	},
	{
		engTitle: "processing",
		title: "درحال پردازش",
		count: 1,
	},
]

const OrderTabs = ({pending, done, processing}: orderTabsProps) => {
	const router = useRouter()
	const [tabIndex, setTabIndex] = useState(
		router.query.activeTab === "done"
			? 2
			: router.query.activeTab === "processing"
			? 1
			: 0,
	)
	return (
		<Flex dir='rtl' w='100%' fontFamily='VazirMedium'>
			<Tabs
				index={tabIndex}
				onChange={(index) => setTabIndex(index)}
				w='100%'
				isLazy>
				<TabList>
					{orderTitles.map(({title, count, engTitle}, key) => (
						<TabItem
							changeQuery={() => {
								router.push({
									pathname: "profile",
									query: {page: "orders", activeTab: engTitle},
								})
							}}
							isActive={tabIndex === key}
							key={key}
							count={count}>
							{title}
						</TabItem>
					))}
				</TabList>
				<TabPanels>
					{orderTitles.map(({title, count}, key) => (
						<TabPanel>
							<OrderCard isPending={true} />
							<OrderCard />
							<OrderCard />
							<OrderCard />
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		</Flex>
	)
}

export default OrderTabs
