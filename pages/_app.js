import { useRouter } from 'next/router'
import '../styles/globals.scss'
import { Header } from '../components/Header';
import { MainLayout } from '../components/MainLayout';
import { wrapper } from '../redux/store';
import { setUserData } from '../redux/slices/user';
import { Api } from '../utils/api';
import NextNProgress from "nextjs-progressbar";
import { SSRProvider } from 'react-bootstrap';


function App({ Component, pageProps }) {
	const router = useRouter()

  	return (
	  	<SSRProvider>
			<NextNProgress
				color="#1e2d43"
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
				showOnShallow={true}
			/>

			{router.asPath !== '/login' &&
				<Header />
			}

			{router.asPath !== '/login'
				? 
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
				: <Component {...pageProps} />
			}
	  	</SSRProvider>
  	);
}

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ctx, Component}) => {
	try {
		const user = await Api(ctx).auth.getMe();
		store.dispatch(setUserData(user.data));

		if (ctx.asPath === '/login') {
			ctx.res.writeHead(302, {
				Location: '/404'
			});
			ctx.res.end();
		}
	} catch (e) {
		if (ctx.asPath !== '/login') {
			ctx.res.writeHead(302, {
				Location: '/login'
			});
			ctx.res.end();
		}
	}

	return {
		pageProps: Component.getInitialProps ? await Component.getInitialProps({... ctx, store}) : {},
	};
})

export default wrapper.withRedux(App);