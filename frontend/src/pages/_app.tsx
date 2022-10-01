import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: unknown }>) {
	const client = useRef(new QueryClient());

	return (
		<QueryClientProvider client={client.current}>
			<Hydrate state={pageProps.dehydratedState}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
