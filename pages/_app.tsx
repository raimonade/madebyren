import '../styles/globals.css';
import type { AppProps } from 'next/app';
import SEO from '@/helpers/seo.config';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<>
			<DefaultSeo {...SEO} />

			<AnimatePresence mode="wait" initial={true}>
				<Component {...pageProps} key={router.asPath} />
			</AnimatePresence>
		</>
	);
}
