import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="fa">
				<Head>
					<link
						rel="preload"
						as="font"
						href="/fonts/Vazir-Bold-FD.ttf"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						as="font"
						href="/fonts/Vazir-Bold-FD.woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						as="font"
						href="/fonts/Vazir-Light-FD.ttf"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						as="font"
						href="/fonts/Vazir-Light-FD.woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						as="font"
						href="/fonts/Vazir-Medium-FD.ttf"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						as="font"
						href="/fonts/Vazir-Medium-FD.woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						as="font"
						href="/fonts/Vazir-Regular-FD.ttf"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						as="font"
						href="/fonts/Vazir-Regular-FD.woff2"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						as="font"
						href="fonts/Vazir-Thin-FD.ttf"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						as="font"
						href="/fonts/Vazir-Thin-FD.woff2"
						crossOrigin="anonymous"
					/>

					<link
						rel="stylesheet"
						type="text/css"
						charSet="UTF-8"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
					/>
					{/* <link
						rel="stylesheet"
						href="https://cdnjs.cloudflare.com/ajax/libs/vazir-font/29.1.0/Farsi-Digits/font-face-FD.min.css"
						integrity="sha512-6nW+UAwlasZKihZecQzbBBL6V0It8xL4eovbWaxp4wpZH0XK0EPnpFKiLJ2zj2PcZt6eBqKPHCJgWYMH811xIA=="
						crossOrigin="anonymous"
						referrerPolicy="no-referrer"
					/> */}
					<link
						rel="stylesheet"
						type="text/css"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument