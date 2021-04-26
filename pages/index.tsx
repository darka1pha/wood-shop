import { Box, Flex } from '@chakra-ui/layout'
import Head from 'next/head'
import GridTest from '../components/gridTest'
export default function Home() {
  return (
    <div lang="fa">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box
          justifyContent="center"
          alignItems="center"
          p="2rem"
          minH="100vh"
          w="100%"
        >
          <GridTest/>
        </Box>
      </main>
    </div>
  )
}
