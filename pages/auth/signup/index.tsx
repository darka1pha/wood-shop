import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { EventHandler, useState } from "react";
import { useMutation } from "react-query";
import { useMainSignup } from "../../../API";
import { IMainSignup } from "../../../API/interfaces";
import { Text } from "../../../components";

const index = () => {
  const router = useRouter()
  const [phonenumber, setPhonenumber] = useState("")

  const mainSignupMutation = useMutation((data: IMainSignup) => useMainSignup(data), {
    onSuccess: (data) => {
      console.log(data)
      localStorage.setItem("phone_number", "+98" + phonenumber)
      router.push("/auth/signup/verify")
    },
    onError: (err) => {
      console.log(err)
    }
  });
  return (
    <Flex
      minH="100vh"
      w="100%"
      alignItems="center"
      justifyContent="center"
      p={{ base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem" }}
      pos="relative"
    >
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
        justifyContent="center"
      >
        <Flex
          bgColor="white"
          borderRadius=".5rem"
          h="310px"
          w="420px"
          alignItems="center"
          flexDir="column"
        >
          <Flex
            p="2rem 4rem 1.5rem 4rem"
            borderBottom="1px solid #BDBDBD"
          >
            <Text variant="heading5">
              ثبت نام
						</Text>
          </Flex>
          <Flex w="240px" alignItems="center" flexDir="column" m="1rem" as="form">
            <Flex w="100%" dir="rtl" flexDir="column" mb=".5rem" mt="1rem">
              <Text mb=".2rem" mr=".5rem" color="black" variant="normal">
                شماره تلفن
							</Text>
              <Input
                type="number"
                h="35px"
                value={phonenumber}
                onChange={(e) => setPhonenumber(e.target.value)}
              />
            </Flex>
            <Flex w="100%" dir="rtl">
              <Text
                color="black"
                variant="normal"
                cursor="pointer"
                onClick={() => router.push("/auth/signin")}
              >
                حساب کاربری دارید؟
							</Text>
              <Text
                color="#348541"
                variant="heading8"
                cursor="pointer"
                onClick={() => router.push("/auth/signin")}
              >
                وارد شوید.
							</Text>
            </Flex>
            <Flex
              w="100%"
              dir="rtl"
              flexDir="column"
              m="1rem 0 0 0"
            >
              <Button
                fontFamily="iranSans"
                fontSize="14px"
                mb=".5rem"
                bgColor="#348541"
                color="white"
                _hover={{
                  bgColor: "#2f783a"
                }}
                _focus={{
                  outline: 0,
                  bgColor: "#348541"
                }}
                _active={{
                  bgColor: "#286632"
                }}
                onClick={() => mainSignupMutation.mutate({ phone_number: "98" + phonenumber })}
              >
                ارسال کد پیامکی
							</Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default index;