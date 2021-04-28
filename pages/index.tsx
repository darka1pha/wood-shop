import { Flex } from '@chakra-ui/layout'
import Head from 'next/head'
import { Carousel } from '../components'
export default function Home() {
  return (
    <Flex
      flexDir="column"
      as="div"
      lang="fa"
      bgColor="bgColor"
      minH="100vh"
    >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Carousel />
    </Flex>
  )
}
