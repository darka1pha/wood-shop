import "../styles/globals.css"
import {useStore} from "../redux/store"
import {ChakraProvider} from "@chakra-ui/react"
import Head from "next/head"
import {Hydrate} from "react-query/hydration"
import {theme} from "../theme/index"
import {Navbar, Menu, AlertBox} from "../components"
import {QueryClient, QueryClientProvider} from "react-query"
import {Provider} from "react-redux"
import {useRef} from "react"
import {PersistGate} from "redux-persist/integration/react"
import {persistStore} from "redux-persist"
import dynamic from "next/dynamic"

import "nprogress/nprogress.css"
import Loading from "../components/Loading"

const TopProgressBar = dynamic(
	() => {
		return import("../components/TopProgressBar")
	},
	{ssr: false},
)

function MyApp({Component, pageProps}) {
	const queryClientRef: any = useRef()
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient()
	}
	const store = useStore(pageProps.initialReduxState)
	const persistor = persistStore(store, {}, function () {
		persistor.persist()
	})

	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Provider store={store}>
				<PersistGate persistor={persistor}>
					<QueryClientProvider client={queryClientRef.current}>
						<Hydrate state={pageProps.dehydratedState}>
							<ChakraProvider theme={theme}>
								<Navbar />
								<Menu />
								<AlertBox />
								<TopProgressBar />
								<Loading />
								<Component {...pageProps} />
							</ChakraProvider>
						</Hydrate>
					</QueryClientProvider>
				</PersistGate>
			</Provider>
		</>
	)
}

export default MyApp
