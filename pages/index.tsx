import { Flex } from '@chakra-ui/layout'
import Head from 'next/head'

export default function Home() {
  return (
    <div lang="fa">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex
          h="100vh"
          w="100%"
          fontFamily="iranSans"
        >
          این یک تست است
        </Flex>
      </main>
    </div>
  )
}
