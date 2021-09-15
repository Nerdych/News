import Head from 'next/head';

import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<>
			<Head>
				<title>Новости - тестовое</title>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<link
					href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
