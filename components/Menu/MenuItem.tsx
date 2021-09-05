import {Button, Flex, Text} from "@chakra-ui/react"
import {ISetCurrentCategory, setCurrentCategory} from "../../redux"
// import Text from "../Text";

import {useRouter} from "next/router"
import {connect} from "react-redux"
import {Dispatch, useEffect} from "react"
import Link from "next/link"

interface MenuItem {
	text: string
	id: number
	setCurrentCategory: ({name, id}: ISetCurrentCategory) => void
	category_set: Array<any>
}

const MenuItem = ({text, id, setCurrentCategory, category_set}: MenuItem) => {
	const router = useRouter()
	return (
		<Flex minW='80px' m='0.5rem 0' flexDir='column'>
			<Button
				p='0 1rem'
				color='white'
				dir='rtl'
				border='none'
				display='flex'
				borderRadius='0'
				alignItems='center'
				justifyContent='flex-start'
				_hover={{
					bg: "transparent",
				}}
				_active={{
					bg: "transparent",
				}}
				_focus={{
					outline: "none",
				}}
				variant='ghost'
				onClick={() => {
					router.push({
						pathname: "/[category]",
						query: {
							id: id,
							category: text,
							order: "default",
						},
					})
					setCurrentCategory({name: text, id})
				}}>
				<Text color='black' fontFamily='VazirBold' fontSize='12px'>
					<Link
						href={{
							pathname: "/[category]",
							query: {
								id: id,
								category: text,
								order: "default",
							},
						}}>
						{text}
					</Link>
				</Text>
			</Button>
			<Flex flexDir='column'>
				{category_set.map(({title, id}) => (
					<Button
						key={id}
						p='0 1rem'
						color='white'
						dir='rtl'
						border='none'
						display='flex'
						borderRadius='0'
						alignItems='center'
						borderLeft='0.5px solid #FFFFFF'
						justifyContent='flex-start'
						_hover={{
							bg: "transparent",
						}}
						_active={{
							bg: "transparent",
						}}
						_focus={{
							outline: "none",
						}}
						variant='ghost'
						onClick={() => {
							router.push({
								pathname: "/[category]",
								query: {
									id: id,
									category: title,
									order: "default",
								},
							})
							setCurrentCategory({name: title, id})
						}}>
						<Text
							color='#4a4a4a'
							fontFamily='VazirMedium'
							fontSize='12px'
							fontWeight='500'>
							<Link
								href={{
									pathname: "/[category]",
									query: {
										id: id,
										category: title,
										order: "default",
									},
								}}>
								{title}
							</Link>
						</Text>
					</Button>
				))}
			</Flex>
		</Flex>
	)
}

const mapDispatchToProps = (dispatch: any) => ({
	setCurrentCategory: (current: ISetCurrentCategory) =>
		dispatch(setCurrentCategory(current)),
})

export default connect(null, mapDispatchToProps)(MenuItem)
