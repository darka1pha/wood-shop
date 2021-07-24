import { Flex } from '@chakra-ui/layout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { useGetBanners, useGetFiltredData } from '../API'
import { Carousel, Description, Container, BannerContainer } from '../components'

export default function Home() {
  const queryClient = useQueryClient()
  const [categories, setCategories] = useState(null)
  const { data: newest } = useGetFiltredData({ filterOption: "score" })
  const { data: popular } = useGetFiltredData({ filterOption: "ordered_count" })
  const { data: banners } = useGetBanners()
  useEffect(() => {
    setCategories(queryClient.getQueryData([`categories`]))
  }, [queryClient.getQueryData([`categories`])])

  if (!newest || !popular || !categories) return <h1>Chizi Ni</h1>

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
