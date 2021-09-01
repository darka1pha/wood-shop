import {Button} from "@chakra-ui/button"
import {Input} from "@chakra-ui/input"
import {Flex} from "@chakra-ui/layout"
import {useRouter} from "next/router"
import React, {useState} from "react"
import {useMutation} from "react-query"
import {connect} from "react-redux"
import {useResetPassword} from "../../../API"
import {IError, IMainSignup} from "../../../API/interfaces"
import {Text} from "../../../components"
import withUser from "../../../components/HOC/withUser"
import {ISetAlert, setAlert} from "../../../redux"

const Index = ({setAlert}) => {
	const router = useRouter()

	const [phonenumber, setPhonenumber] = useState("")

	const resetMutation = useMutation(
		(data: IMainSignup) => useResetPassword(data),
		{
			onSuccess: () => {
				localStorage.setItem("phone_number", "+98" + phonenumber)
				router.push("/auth/reset-pass/verify")
			},
			onError: (err: IError) => {
				console.log(err.response.data.error.code)
				if (err.response.data.error.code === 491) {
					setAlert({content: "شمار وارد شده اشتباه است", type: "error"})
				} else if (err.response.data.error.code === 494) {
					setAlert({content: "کاربری با این شماره یافت نشد", type: "error"})
				}
			},
		},
	)

	const onEnterPressed = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			e.preventDefault()
			if (phonenumber.length === 10) {
				resetMutation.mutate({
					phone_number: "+98" + phonenumber,
				})
			} else {
				setAlert({
					content: "شماره باید 10 کاراکتر باشد",
					type: "error",
				})
			}
		}
	}

	const onInputChange = (e) => {
		if (phonenumber.length < 10) {
			setPhonenumber(e.target.value)
		} else {
			if (
				e.nativeEvent.inputType === "deleteContentBackward" ||
				e.nativeEvent.inputType === "deleteContentForward"
			) {
				setPhonenumber(e.target.value)
			} else {
				setAlert({
					content: "شماره وارد شده نمیتواند بیشتر از 10 کاراکتر باشد",
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
					h='340px'
					w='420px'
					alignItems='center'
					flexDir='column'>
					<Flex p='2rem 4rem 1.5rem 4rem' borderBottom='1px solid #BDBDBD'>
						<Text variant='heading5'>بازیابی رمز عبور</Text>
					</Flex>
					<Flex
						w='240px'
						alignItems='center'
						flexDir='column'
						m='1rem'
						as='form'>
						<Flex w='100%' dir='rtl' flexDir='column' mb='.5rem' mt='1rem'>
							<Text mb='.2rem' mr='.5rem' color='black' variant='normal'>
								شماره تلفن
							</Text>
							<Input
								fontFamily='Vazir'
								_placeholder={{
									fontSize: "12px",
								}}
								placeholder='بدون صفر'
								type='number'
								h='35px'
								value={phonenumber}
								onChange={onInputChange}
								onKeyDown={onEnterPressed}
							/>
						</Flex>
						<Flex w='100%' dir='rtl' flexDir='column' m='1rem 0 0 0'>
							<Button
								fontFamily='Vazir'
								fontSize='14px'
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
									resetMutation.mutate({
										phone_number: "+98" + phonenumber,
									})
								}>
								ارسال کد پیامکی
							</Button>
							<Button
								fontFamily='Vazir'
								fontSize='16px'
								_focus={{
									outline: 0,
								}}
								onClick={() => router.push("/auth/signup/")}>
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
	setAlert: ({content, type}: ISetAlert) => dispatch(setAlert({type, content})),
})

export default withUser(connect(null, mapDispatchToProps)(Index))
