import { Flex } from '@chakra-ui/layout'
import Head from 'next/head'
import { Banner, Carousel, Description, Container } from '../components'
export default function Home() {

  const img1 = "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHRhYmxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  const img2 = "https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRlc2t8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"

  return (
    <Flex
      flexDir="column"
      as="div"
      lang="fa"
      bgColor="bgColor"
      minH="100vh"
      overflowX="hidden"
      mt="85px"
    >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container />
      <Carousel tempUrl={img1} title="میز" />
      <Banner />
      <Carousel tempUrl={img2} title="صندلی" />
      <Description />
    </Flex>
  )
}
