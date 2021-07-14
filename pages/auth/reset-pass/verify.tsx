import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Divider, Flex, HStack } from "@chakra-ui/layout";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { useMutation } from "react-query";
import { connect } from "react-redux";
import { useVerifyResetPassword } from "../../../API";
import { IError, IVerifyResetPassword } from "../../../API/interfaces";
import { Text } from "../../../components";
import { ISetAlert, IUser, setAlert, setCurrentUser } from "../../../redux";
import Cookies from "js-cookie";
import { Input } from "@chakra-ui/input";
import { createStructuredSelector } from "reselect";
import Profile from "../../profile";

const verify = ({ setCurrentUser, setAlert, currentUser }) => {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [timer, setTimer] = useState(60);
  const [isEnable, setIsEnable] = useState(false);
  const [confirmActive, setConfirmActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else {
      setIsEnable(true);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const onResendCode = () => {
    setIsEnable(false);
    setTimer(2);
  };

  const resetVerifyMutation = useMutation(
    (data: IVerifyResetPassword) => useVerifyResetPassword(data),
    {
      onSuccess: (data) => {
        setCurrentUser(data.user);
        Cookies.set("refreshToken", data.token.refresh, {
          sameSite: "strict",
          expires: 24,
        });
        Cookies.set("accessToken", data.token.access, {
          sameSite: "strict",
          expires: 24,
        });
        router.push("/");
      },
      onError: (err: IError) => {
        console.log("Error: ", err.response);
        if (err.response.data.error.code === 491) {
          setAlert({
            content: "رمز عبور حداقل باید 8 کاراکتر باشد",
            type: "error",
          });
        } else if (err.response.data.error.code === 420) {
          setAlert({
            content: `لطفا ${err.response.data.remain_time} ثانیه دیگر تلاش کنید`,
            type: "error",
          });
        } else if (err.response.data.error.code === 495) {
          setAlert({
            content: `کد وارد شده اشتباه است یا منقضی شده`,
            type: "error",
          });
        }
      },
    }
  );

  const onPinComplete = (val: string) => {
    if (confirmPass === pass && val.length === 6) setConfirmActive(true);
    else setConfirmActive(false);
  };

  const onConfirmed = async () => {
    resetVerifyMutation.mutateAsync({
      confirm_password: confirmPass,
      new_password: pass,
      token: pin,
    });
  };

  useEffect(() => {
    if (currentUser) router.push("/profile");
  }, []);

  if (currentUser) return <Profile />;

  return (
    <Flex
      minH="100vh"
      w="100%"
      alignItems="center"
      justifyContent="center"
      p={{ base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem" }}
      pos="relative">
      <Flex
        w="100%"
        h="100%"
        pos="absolute"
        top="0"
        left="0"
        zIndex="-1"
        bgRepeat="no-repeat"
        bgSize="cover"
        className="blur"
        bgImage="url('/assets/authbg.webp')"
      />
      <Flex
        w="100%"
        maxW="1920px"
        h="100%"
        alignItems="center"
        justifyContent="center">
        <Flex
          bgColor="white"
          borderRadius=".5rem"
          h="420px"
          w="420px"
          alignItems="center"
          flexDir="column">
          <Flex p="1.5rem 4rem 1rem 4rem" alignItems="center">
            <Text variant="heading6">بازیابی رمز عبور</Text>
            <Icon as={BiLock} fontSize="1.3rem" ml=".5rem" />
          </Flex>
          <Divider m="1rem 0" w="90%" />
          <Flex justifyContent="center" alignItems="center" flexDir="column">
            <HStack>
              <PinInput
                value={pin}
                onComplete={(value) => onPinComplete(value)}
                onChange={(value) => {
                  setPin(value);
                }}>
                <PinInputField fontFamily="Vazir" />
                <PinInputField fontFamily="Vazir" />
                <PinInputField fontFamily="Vazir" />
                <PinInputField fontFamily="Vazir" />
                <PinInputField fontFamily="Vazir" />
                <PinInputField fontFamily="Vazir" />
              </PinInput>
            </HStack>
            <Button
              w="100%"
              mt=".5rem"
              mb=".5rem"
              onClick={onResendCode}
              bgColor="#348541"
              color="white"
              fontFamily="Vazir"
              fontSize="12px"
              border="none"
              disabled={!isEnable}
              _hover={{ bgColor: "#3a9448" }}
              transition="400ms ease-in-out"
              h="2.5rem">
              {timer > 0 ? timer + "\t" + "ارسال مجدد در" : "ارسال مجدد"}
            </Button>
            <Input
              mb=".5rem"
              type="password"
              placeholder="رمز عبور جدید"
              _placeholder={{
                fontFamily: "Vazir",
                fontSize: "13px",
              }}
              value={pass}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPass(e.target.value);
                if (e.target.value === confirmPass && pin.length === 6)
                  setConfirmActive(true);
                else setConfirmActive(false);
              }}
              dir="rtl"
            />
            <Input
              justifyContent="center"
              type="password"
              placeholder="تایید رمز عبور"
              _placeholder={{
                fontFamily: "Vazir",
                fontSize: "13px",
              }}
              value={confirmPass}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmPass(e.target.value);
                if (e.target.value === pass && pin.length === 6)
                  setConfirmActive(true);
                else setConfirmActive(false);
              }}
              dir="rtl"
            />
            <Button
              w="100%"
              mt=".5rem"
              mb=".5rem"
              onClick={onConfirmed}
              bgColor="#348541"
              color="white"
              fontFamily="Vazir"
              fontSize="12px"
              border="none"
              disabled={!confirmActive}
              _hover={{ bgColor: "#3a9448" }}
              transition="400ms ease-in-out"
              h="2.5rem">
              تایید
            </Button>
          </Flex>
          <Divider m="1rem 0" bgColor="white" w="90%" />
          <Flex alignItems="center" dir="rtl">
            <Text
              variant="heading7"
              onClick={() => router.push("/auth/reset-pass")}
              cursor="pointer">
              تصحیح شماره تلفن
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setCurrentUser: (user: IUser) => dispatch(setCurrentUser(user)),
  setAlert: ({ content, type }: ISetAlert) =>
    dispatch(setAlert({ type, content })),
});

const mapStateToProps = createStructuredSelector({
  currentUser: setCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(verify);
