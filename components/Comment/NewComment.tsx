import {Button} from "@chakra-ui/button"
import {Input} from "@chakra-ui/input"
import {Flex} from "@chakra-ui/layout"
import {Select} from "@chakra-ui/select"
import {Textarea} from "@chakra-ui/textarea"
import {useEffect, useReducer, useState} from "react"
import {Text} from ".."
import RatingContainer from "./RatingContainer"
import {reducer} from "./inputReducer"
import {useMutation, useQueryClient} from "react-query"
import {useSendNewComment} from "../../API"
import {connect} from "react-redux"
import {ISetAlert, setAlert} from "../../redux"
import {IComment, IError} from "../../API/interfaces"
import Cookies from "js-cookie"

interface INewComment {
	setAlert: ({}: ISetAlert) => void
	productId: number
}

const NewComment = ({setAlert, productId}: INewComment) => {
	const [posValues, setPosValues] = useReducer(reducer, [""])
	const [negValues, setNegValues] = useReducer(reducer, [""])
	const [comment, setComment] = useState<IComment>({
		design_value: 0,
		feature_value: 0,
		money_value: 0,
		quality_value: 0,
		product: productId,
		text: "",
	})

	const {
		money_value,
		id,
		design_value,
		feature_value,
		product,
		quality_value,
		text,
	} = comment

	const queryClient = useQueryClient()

	const commentMutation = useMutation(useSendNewComment, {
		onSuccess: (res) => {
			console.log("API RESPONSE: ", res)
			queryClient.refetchQueries([`comments-${productId}`])
			setAlert({content: "کامنت شما ثبت شد", type: "success"})
		},
		onError: (err: IError) => {
			console.log(err.response)
			setAlert({content: "خطا در ثبت کامنت", type: "error"})
		},
	})

	const onCommentFieldChanges = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setComment({...comment, [e.target.name]: e.target.value})
	}

	const sendComment = async () => {
		if (Cookies.get("refreshToken")) {
			if (
				money_value === 0 ||
				feature_value === 0 ||
				quality_value === 0 ||
				design_value === 0
			) {
				setAlert({content: "لطفا امتیازات کالا را وارد کنید", type: "error"})
			} else if (text.length === 0) {
				setAlert({content: "پیام نمیتواند خالی باشد", type: "error"})
			} else {
				commentMutation.mutateAsync(comment)
			}
		} else {
			setAlert({content: "وارد حساب کاربری خود شوید", type: "warning"})
		}
	}

	const ratingTitles = [
		{
			engTitle: "feature_value",
			title: "امکانات",
			rate: 0,
		},
		{
			engTitle: "money_value",
			title: "ارزش نسبت به قیمت",
			rate: 0,
		},
		{
			engTitle: "quality_value",
			title: "کیفیت ساخت",
			rate: 0,
		},
		{
			engTitle: "design_value",
			title: "طراحی و ظاهر",
			rate: 0,
		},
	]

	return (
		<Flex
			w='100%'
			dir='rtl'
			flexDir='column'
			justifyContent='center'
			m='3rem 0'>
			<Flex w='100%' maxW='1920px' flexDir='column' p={{base: "0 1rem", md: 0}}>
				<Text color='black' variant='heading6'>
					نوشتن نظر
				</Text>
				<Flex flexDir={{base: "column", md: "row"}}>
					<Flex
						w={{base: "100%", md: "65%"}}
						flexDir='column'
						p='0 1rem'
						m='1rem 0'>
						<Text
							mb='.5rem'
							color='black'
							whiteSpace='nowrap'
							variant='normalExt'>
							پیام شما
						</Text>
						<Textarea
							value={text}
							name='text'
							onChange={onCommentFieldChanges}
							border='1px solid #BDBDBD'
							maxH='200px'
							minH='150px'
							p='1rem'
							maxW='920px'
							_focus={{
								outline: "none",
								border: "1px solid #BDBDBD",
							}}
							fontFamily='Vazir'
							fontSize={{base: "12px", md: "1rem"}}
						/>
					</Flex>
					<Flex mt={{base: "1rem", md: "3rem"}} flexDir='column'>
						{ratingTitles.map(({rate, title, engTitle}, key) => (
							<RatingContainer
								oldArray={comment}
								engTitle={engTitle}
								mr='.5rem'
								editable
								title={title}
								rate={rate}
								key={key}
								onChange={setComment}
								rating={rate}
							/>
						))}
					</Flex>
				</Flex>
				<Flex
					mt='1rem'
					flexDir={{base: "column", md: "row"}}
					alignItems={{base: "flex-start", md: "center"}}>
					<Flex alignItems='center'>
						<Text
							color='black'
							whiteSpace='nowrap'
							variant='normalExt'
							ml='1rem'
							fontSize={{base: "12px", md: "14px"}}>
							آیا خرید این محصول را پیشنهاد میکنید؟
						</Text>
						<Select
							defaultValue='option1'
							_focus={{
								outline: "none",
							}}
							w='80px'
							dir='ltr'
							fontFamily='Vazir'
							fontSize={{base: "12px", md: "14px"}}
							h={{base: "30px", md: "40px"}}>
							<option value='option1'>بله</option>
							<option value='option2'>خیر</option>
						</Select>
					</Flex>
					<Button
						m={{base: "1rem 0", md: "0 1rem"}}
						color='white'
						fontFamily='Vazir'
						fontWeight='400'
						p='0 2rem'
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
						onClick={sendComment}>
						ارسال
					</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}

const mapDispatchToProps = (dispatch) => ({
	setAlert: ({type, content}: ISetAlert) => dispatch(setAlert({content, type})),
})

export default connect(null, mapDispatchToProps)(NewComment)
