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
						href="fonts/ir_sans.ttf"
						type="font/tff"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						as="font"
						href="fonts/ir_sans.woff"
						type="font/tff"
						crossOrigin="anonymous"
					/>
					<link
						rel="preload"
						as="font"
						href="fonts/ir_sans.woff2"
						type="font/tff"
						crossOrigin="anonymous"
					/>
					<link
						rel="stylesheet"
						type="text/css"
						charSet="UTF-8"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
					/>
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