import {
	Flex,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	useDisclosure,
} from "@chakra-ui/react"
import {useRouter} from "next/dist/client/router"
import React, {memo, useState} from "react"
import {
	useGetCompeleteOrders,
	useGetPendingOrders,
	useGetProgressOrders,
} from "../../../API"
import OrderSkeleton from "../../Skeleton/OrderSkeleton"
import EditModal from "./EditModal"
import NoOrder from "./NoOrder"
import OrderCard from "./OrderCard"
import TabItem from "./TabItem"

const OrderTabs = () => {
	const {data: pendings, isError: pendingsError} = useGetPendingOrders()
	const {data: compeletes, isError: compeletesError} = useGetCompeleteOrders()
	const {data: progresses, isError: progressesError} = useGetProgressOrders()

	const {isOpen, onOpen, onClose} = useDisclosure()

	const router = useRouter()
	const [tabIndex, setTabIndex] = useState(
		router.query.activeTab === "done"
			? 1
			: router.query.activeTab === "processing"
			? 2
			: 0,
	)

	const orderTitles = [
		{
			engTitle: "pending",
			title: "در انتظار پرداخت",
		},
		{
			engTitle: "done",
			title: "تحویل داده شده",
		},
		{
			engTitle: "processing",
			title: "درحال پردازش",
		},
	]

	if (!pendings || !compeletes || !progresses) return <OrderSkeleton />

	console.log("CP: ", compeletes.pages[0].results.length)

	return (
		<Flex dir='rtl' w='100%' fontFamily='VazirMedium'>
			<Tabs
				index={tabIndex}
				onChange={(index) => setTabIndex(index)}
				w='100%'
				isLazy>
				<TabList>
					{orderTitles.map(({title, engTitle}, key) => (
						<TabItem
							changeQuery={() => {
								router.push({
									pathname: "profile",
									query: {page: "orders", activeTab: engTitle},
								})
							}}
							isActive={tabIndex === key}
							key={key}
							count={
								5
								// key === 0
								// 	? pendings.pages[0].results[0].cart_count
								// 	: key === 1
								// 	? compeletes.pages[0].results[0].cart_count
								// 	: pendings.pages[0].results[0].cart_count
							}>
							{title}
						</TabItem>
					))}
				</TabList>
				<TabPanels>
					<TabPanel>
						{pendings.pages[0].results.length !== 0 ? (
							pendings.pages.map(({results}, index) => (
								<React.Fragment key={index}>
									{results.map(
										(
											{
												cost,
												items,
												id,
												delivery_cost,
												ordered_date,
												address,
												delivery_type,
											},
											key,
										) => (
											<>
												<OrderCard
													openModal={onOpen}
													isPending={true}
													cost={cost}
													items={items}
													id={id}
													delivery_cost={delivery_cost}
													ordered_date={ordered_date}
													key={key}
												/>
												<EditModal
													delivery_type={delivery_type}
													address={address}
													orderId={id}
													key={key}
													isOpen={isOpen}
													onClose={onClose}
												/>
											</>
										),
									)}
								</React.Fragment>
							))
						) : (
							<NoOrder />
						)}
					</TabPanel>
					<TabPanel>
						{compeletes.pages[0].results.length !== 0 ? (
							compeletes.pages.map(({results}, index) => (
								<React.Fragment key={index}>
									{results.map(
										({cost, items, id, delivery_cost, ordered_date}, key) => (
											<OrderCard
												cost={cost}
												items={items}
												id={id}
												delivery_cost={delivery_cost}
												ordered_date={ordered_date}
												key={key}
											/>
										),
									)}
								</React.Fragment>
							))
						) : (
							<NoOrder />
						)}
					</TabPanel>
					<TabPanel>
						{progresses.pages[0].results.length !== 0 ? (
							progresses.pages.map(({results}, index) => (
								<React.Fragment key={index}>
									{results.map(
										({cost, items, id, delivery_cost, ordered_date}, key) => (
											<OrderCard
												cost={cost}
												items={items}
												id={id}
												delivery_cost={delivery_cost}
												ordered_date={ordered_date}
												key={key}
											/>
										),
									)}
								</React.Fragment>
							))
						) : (
							<NoOrder />
						)}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Flex>
	)
}

export default memo(OrderTabs)
