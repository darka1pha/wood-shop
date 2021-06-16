import { Box, Flex, HStack, Stack } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/skeleton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ProfileNavbar } from "../../components";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import { selectCurrentUser } from "../../redux";

const index = ({ currentUser }) => {
  const [currentPage, setCurrentPage] = useState({
    Component: <ProfileInfo />,
    title: "ProfileInfo",
  });

  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.push("/auth/signin");
  }, []);

  if (!currentUser) {
    return (
      <Flex
        w="100%"
        minH="100vh"
        p={{ base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem" }}
        padding="6"
        boxShadow="lg"
        bg="white"
        justifyContent="center"
        alignItems="center">
        <Flex
          w="100%"
          maxW="1920px"
          flexDir={{ base: "column", md: "row-reverse" }}
          justifyContent="space-between"
          mb="2rem"
          h="100%">
          <Skeleton width="20%" m="0 1rem" height="340px" />
          <Skeleton width="75%" height="480px" />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex
      as="div"
      lang="fa"
      minH="100vh"
      overflowX="hidden"
      p={{ base: "80px .5rem 2rem .5rem", md: "180px 2rem 2rem 2rem" }}
      bgColor="bgColor"
      flexDir="column"
      justifyContent="center"
      alignItems="center">
      <Flex
        w="100%"
        maxW="1920px"
        flexDir={{ base: "column", md: "row-reverse" }}
        mb="2rem"
        minH="70vh">
        <ProfileNavbar
          currentUser={currentUser}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <Flex h="100%" w="100%">
          {currentPage.Component}
        </Flex>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(index);
