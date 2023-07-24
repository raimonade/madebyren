import Layout from '@/components/layout';
import Logo from '@/components/logo';
import { InteractiveMarquee } from '@/components/interactive-marquee';
import { NextSeo } from 'next-seo';

export default function Home() {
	return (
		<Layout>
			<NextSeo title="Home" />
			<div className="place-self-center">
				<Logo />
				<InteractiveMarquee />
			</div>
		</Layout>
	);
}
