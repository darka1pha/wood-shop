import {Button} from "@chakra-ui/button"
import Icon from "@chakra-ui/icon"
import {Divider, Flex, HStack} from "@chakra-ui/layout"
import {PinInput, PinInputField} from "@chakra-ui/pin-input"
import {useRouter} from "next/router"
import {useEffect, useState} from "react"
import {BiMessageSquare} from "react-icons/bi"
import {useMutation} from "react-query"
import {useMainSignin, useVerifySignin} from "../../../API"
import {IError, IMainSignup, IVerifySignup} from "../../../API/interfaces"
import {Text} from "../../../components"
import {ISetAlert, IUser, setAlert, setCurrentUser} from "../../../redux"
import Cookies from "js-cookie"
import withUser from "../../../components/HOC/withUser"
import {connect} from "react-redux"

const Verify = ({setCurrentUser, setAlert}) => {
	const router = useRouter()
	const [pin, setPin] = useState("")
	const [timer, setTimer] = useState(
		localStorage.getItem(router.pathname)
			? Number(localStorage.getItem(router.pathname))
			: 60,
	)
	const [isEnable, setIsEnable] = useState(false)

	const resendMutation = useMutation(
		(data: IMainSignup) => useMainSignin(data),
		{
			onSuccess: () => {
				setAlert({content: "کد جدید ارسال شد", type: "success"})
				localStorage.removeItem("pnSignin")
				setIsEnable(false)
				setTimer(60)
			},
			onError: () => {
				setAlert({content: "مشکلی رخ داده است دوباره تلاش کنید", type: "error"})
			},
		},
	)

	useEffect(() => {
		let interval: any = null
		localStorage.setItem(router.pathname, timer.toString())
		if (timer > 0) {
			interval = setInterval(() => {
				setTimer(timer - 1)
			}, 1000)
		} else {
			setIsEnable(true)
		}
		return () => {
			clearInterval(interval)
			localStorage.removeItem(router.pathname)
		}
	}, [timer])

	const onResendCode = () => {
		resendMutation.mutate({phone_number: localStorage.getItem("pnSignin")})
	}

	const signinVerifyMutation = useMutation(
		(data: IVerifySignup) => useVerifySignin(data),
		{
			onSuccess: (data) => {
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
				console.log(err.response.data)
				if (err.response.data.error.code === 494) {
					setAlert({
						content: "کد وارد شده اشتباه است.",
						type: "error",
					})
				}
			},
		},
	)

	const onPinComplete = (val: string) => {
		signinVerifyMutation.mutate({token: val})
	}

	if (!localStorage.getItem("pnSignin")) router.push("/auth/signin")

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
					h='320px'
					w='420px'
					alignItems='center'
					flexDir='column'>
					<Flex p='2rem 4rem 1.5rem 4rem' alignItems='center'>
						<Text variant='heading6'>کد ارسال شده را وارد کنید</Text>
						<Icon as={BiMessageSquare} fontSize='1.3rem' ml='.5rem' />
					</Flex>
					<Divider m='1rem 0' w='90%' />
					<Flex justifyContent='center' alignItems='center' flexDir='column'>
						<HStack>
							<PinInput
								value={pin}
								onComplete={(value) => onPinComplete(value)}
								onChange={(value) => setPin(value)}>
								<PinInputField fontFamily='Vazir' />
								<PinInputField fontFamily='Vazir' />
								<PinInputField fontFamily='Vazir' />
								<PinInputField fontFamily='Vazir' />
								<PinInputField fontFamily='Vazir' />
								<PinInputField fontFamily='Vazir' />
							</PinInput>
						</HStack>
						<Button
							w='100%'
							mt='.5rem'
							mb='.5rem'
							onClick={onResendCode}
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
							color='white'
							fontFamily='Vazir'
							fontSize='12px'
							border='none'
							disabled={!isEnable}
							transition='400ms ease-in-out'
							h='2.5rem'>
							{timer > 0 ? timer + "\t" + "ارسال مجدد در" : "ارسال مجدد"}
						</Button>
					</Flex>
					<Divider m='1rem 0' bgColor='white' w='90%' />
					<Flex alignItems='center' dir='rtl'>
						<Text
							variant='heading7'
							onClick={() => router.push("/auth/signin")}
							cursor='pointer'>
							تصحیح شماره تلفن
						</Text>
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

export default connect(null, mapDispatchToProps)(withUser(Verify))
