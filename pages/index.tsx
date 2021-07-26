import { Flex } from '@chakra-ui/layout'
import { Skeleton } from '@chakra-ui/react'
import Head from 'next/head'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useGetBanners, useGetFiltredData } from '../API'
import { Carousel, Description, Container, BannerContainer } from '../components'

export default function Home() {
  const queryClient = useQueryClient()
  const [categories, setCategories] = useState(null)
  const { data: newest, isLoading: isNewestLoading, error: error1 } = useGetFiltredData({ filterOption: "score" })
  const { data: popular, isLoading: isPopularLoading, error: error2 } = useGetFiltredData({ filterOption: "ordered_count" })
  const { data: banners, isLoading: isBannersLoading, error: error3 } = useGetBanners()


  useEffect(() => {
    setCategories(queryClient.getQueryData([`categories`]))
  }, [queryClient.getQueryData([`categories`])])

  if (!newest
    || !popular
    || !categories
    || isBannersLoading
    || isPopularLoading
    || isNewestLoading
  ) return (
    <Flex
      flexWrap="wrap" w="100%"
      h="100vh"
      mt="5rem"
      p="85px"
    >
      <Skeleton m="1rem" flex="1 1 360px" height="280px" />
      <Skeleton m="1rem" flex="1 1 360px" height="280px" />
      <Skeleton m="1rem" flex="1 1 360px" height="280px" />
      <Skeleton m="1rem" flex="1 1 360px" height="280px" />
      <Skeleton m="1rem" flex="1 1 360px" height="280px" />
    </Flex>
  )

  if (error1 || error2 || error3) router.push("/500")

  return (
    <Flex
      flexDir="column"
      as="div"
      lang="fa"
      bgColor="bgColor"
      minH="100vh"
      overflowX="hidden"
      pt={{ base: 0, md: "85px" }}
    >
      <Head>
        <title>Wood Shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container data={categories.slice(0, 4)} />
      <Carousel data={newest} title="جدیدترین ها" />
      <BannerContainer data={banners} />
      <Carousel data={popular} title="پرطرفدار ترین ها" />
      <Description />
    </Flex>
  )
}
