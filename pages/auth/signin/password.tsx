import {
	Flex,
	Input,
	InputGroup,
	InputLeftAddon,
	Icon,
	Button,
  Text
} from "@chakra-ui/react"
import {useRouter} from "next/router"
import {useState} from "react"
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import {useMutation} from "react-query"
import {connect} from "react-redux"
import {useSigninPassword} from "../../../API"
import {IError, ISigninPassword} from "../../../API/interfaces"
import {ISetAlert, IUser, setAlert, setCurrentUser} from "../../../redux"
import Cookies from "js-cookie"
import withUser from "../../../components/HOC/withUser"

const Password = ({setAlert, setCurrentUser}) => {
	const [show, setShow] = useState(false)
	const router = useRouter()
	const [phonenumber, setPhonenumber] = useState("")
	const [password, setPassword] = useState("")

	const signinPasswordMutation = useMutation(
		(data: ISigninPassword) => useSigninPassword(data),
		{
			onSuccess: (data) => {
				setCurrentUser(data.user)
				Cookies.set("refreshToken", data.token.refresh, {
					sameSite: "strict",
					expires: 24,
				})
				Cookies.set("refreshS", data.token.refresh_s, {
					sameSite: "strict",
					expires: 24,
				})
				Cookies.set("accessToken", data.token.access, {
					sameSite: "strict",
					expires: 24,
				})
				Cookies.set("access_s", data.token.access_s, {
					sameSite: "strict",
					expires: 24,
				})
				router.push("/")
			},
			onError: (err: IError) => {
				console.log("error", err.response)
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
							<Text mb='.2rem' mr='.5rem' color='black' fontSize={12} fontFamily="Vazir">
								شماره تلفن
							</Text>
							<Input
								value={phonenumber}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
									setPhonenumber(e.target.value)
								}
								type='number'
								h='35px'
							/>
						</Flex>
						<Flex w='100%' dir='rtl' flexDir='column'>
							<Text mb='.2rem' mr='.5rem' color='black' fontSize={12} fontFamily="Vazir">
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
									type={show ? "text" : "password"}
									dir='rtl'
									h='35px'
								/>
							</InputGroup>
							<Text
								color='#383838'
								fontFamily="VazirBold"
                fontSize={11}
								cursor='pointer'
								mt='.5rem'
								onClick={() => router.push("/auth/reset-pass")}>
								رمز عبور خود را فراموش کرده اید؟
							</Text>
							<Text
								color='btnBg'
								fontFamily="VazirBold"
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
								onClick={() =>
									signinPasswordMutation.mutate({
										phone_number: "+98" + phonenumber,
										password: password,
									})
								}>
								ورود
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
