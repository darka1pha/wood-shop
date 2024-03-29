import {
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
	Icon,
	Button,
	Text,
	Spinner,
} from "@chakra-ui/react"
import {useRouter} from "next/router"
import {useState} from "react"
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import {useMutation} from "react-query"
import {connect, useDispatch} from "react-redux"
import {useSigninPassword} from "../../../API"
import {IError, ISigninPassword} from "../../../API/interfaces"
import {ISetAlert, IUser, setAlert, setCurrentUser} from "../../../redux"
import Cookies from "js-cookie"
import withUser from "../../../components/HOC/withUser"

const Password = ({setAlert, setCurrentUser}) => {
	const update = () => {
		return {type: "up"}
	}

	const dispatch = useDispatch()

	dispatch(update)

	const [show, setShow] = useState(false)
	const router = useRouter()
	const [phonenumber, setPhonenumber] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const signinPasswordMutation = useMutation(
		(data: ISigninPassword) => useSigninPassword(data),
		{
			onSuccess: (data) => {
				setIsLoading(false)
				setCurrentUser(data.user)
				Cookies.set("refreshToken", data.token.refresh, {
					sameSite: "strict",
					expires: 24,
				})
				Cookies.set("accessToken", data.token.access, {
					sameSite: "strict",
					expires: 24,
				})
				router.push("/")
			},
			onError: (err: IError) => {
				setIsLoading(false)
				if (err.response.data.error.code === 491) {
					setAlert({
						content: "فرمت شماره تلفن یا رمز عبور اشتباه است",
						type: "error",
					})
				} else if (err.response.data.error.code === 494) {
					setAlert({
						content: "شماره تلفن یا رمز عبور اشتباه است",
						type: "error",
					})
				} else if (err.response.data.error.code === 493) {
					setAlert({
						content: "کاربری با این شماره یافت نشد",
						type: "error",
					})
				}
			},
		},
	)

	const onEnterPressed = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault()
			if (phonenumber.length === 10 && password.length >= 8) {
				signinPasswordMutation.mutate({
					phone_number: "+98" + phonenumber,
					password: password,
				})
			} else if (password.length <= 8) {
				setAlert({
					content: "شماره باید 10 کاراکتر باشد",
					type: "error",
				})
			} else {
				setAlert({
					content: "شماره باید 10 کاراکتر باشد",
					type: "error",
				})
			}
		}
	}

	return (
		<Flex
			minH='100vh'
			w='100%'
			alignItems='center'
			justifyContent='center'
			p={{base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem"}}
			pos='relative'>
			<Flex
				w='100%'
				h='100%'
				pos='absolute'
				top='0'
				left='0'
				zIndex='-1'
				bgRepeat='no-repeat'
				bgSize='cover'
				className='blur'
				bgImage="url('/assets/authbg.webp')"
			/>
			<Flex
				w='100%'
				maxW='1920px'
				h='100%'
				alignItems='center'
				justifyContent='center'>
				<Flex
					bgColor='white'
					borderRadius='.5rem'
					h='420px'
					w='420px'
					alignItems='center'
					flexDir='column'>
					<Flex p='2rem 4rem 1.5rem 4rem' borderBottom='1px solid #ededed'>
						<Text fontFamily='VazirBold' fontSize={18}>
							ورود به حساب کاربری
						</Text>
					</Flex>
					<Flex
						w='240px'
						alignItems='center'
						flexDir='column'
						m='1rem'
						as='form'>
						<Flex w='100%' dir='rtl' flexDir='column' mb='1rem' mt='1rem'>
							<Text
								mb='.2rem'
								mr='.5rem'
								color='black'
								fontSize={12}
								fontFamily='Vazir'>
								شماره تلفن
							</Text>
							<Input
								fontSize='14px'
								fontFamily='Vazir'
								placeholder='9123456789'
								value={phonenumber}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPhonenumber(e.target.value)
								}
								type='number'
								h='35px'
								onKeyDown={onEnterPressed}
							/>
						</Flex>
						<Flex w='100%' dir='rtl' flexDir='column'>
							<Text
								mb='.2rem'
								mr='.5rem'
								color='black'
								fontSize={12}
								fontFamily='Vazir'>
								رمز عبور
							</Text>
							<InputGroup dir='ltr'>
								<InputLeftAddon
									cursor='pointer'
									onClick={() => setShow(!show)}
									children={
										<Icon as={!show ? AiOutlineEyeInvisible : AiOutlineEye} />
									}
									h='35px'
								/>
								<Input
									value={password}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setPassword(e.target.value)
									}
									onKeyDown={onEnterPressed}
									type={show ? "text" : "password"}
									dir='rtl'
									h='35px'
								/>
							</InputGroup>
							<Text
								color='#383838'
								fontFamily='VazirBold'
								fontSize={11}
								cursor='pointer'
								mt='.5rem'
								onClick={() => router.push("/auth/reset-pass")}>
								رمز عبور خود را فراموش کرده اید؟
							</Text>
							<Text
								color='btnBg'
								fontFamily='VazirBold'
								fontSize={11}
								cursor='pointer'
								mt='.5rem'
								onClick={() => router.push("/auth/signin")}>
								ورود با کد پیامکی
							</Text>
						</Flex>
						<Flex w='100%' dir='rtl' flexDir='column' m='1rem 0 0 0'>
							<Button
								fontFamily='Vazir'
								fontSize='16px'
								mb='.5rem'
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
								onClick={() => {
									setIsLoading(true)
									signinPasswordMutation.mutate({
										phone_number: "+98" + phonenumber,
										password: password,
									})
								}}>
								{isLoading ? <Spinner color='#fff' /> : "ورود"}
							</Button>
							<Button
								fontFamily='Vazir'
								fontSize='16px'
								_focus={{
									outline: 0,
								}}
								onClick={() => router.push("/auth/signup")}>
								ثبت نام
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	)
}

const mapDispatchToProps = (dispatch: any) => ({
	setCurrentUser: (user: IUser) => dispatch(setCurrentUser(user)),
	setAlert: ({content, type}: ISetAlert) => dispatch(setAlert({type, content})),
})

export default connect(null, mapDispatchToProps)(withUser(Password))
