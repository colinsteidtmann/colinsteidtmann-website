import '../styles/globals.css';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { MDXProvider } from '@mdx-js/react';


const components = {
  img: props => <Image src={require(`../content/${props.src}`)} />,
  a: props => <Link {...props} />
};

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  const Main = getLayout(<Component {...pageProps} />);
  return (
    <MDXProvider components={components}>
      {getLayout(<Component {...pageProps} />)}
    </MDXProvider>
  );

}

export default MyApp;