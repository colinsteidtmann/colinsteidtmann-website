import '../styles/globals.css';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { MDXProvider } from '@mdx-js/react';


const components = {
  img: props => <Image src={require(`../content/${props.src}`)} alt={props.alt} />,
  a: props => <Link {...props} />
};

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <MDXProvider components={components}>
      <div className="px-3 sm:px-0">
        {getLayout(<Component {...pageProps} />)}
      </div>

    </MDXProvider>
  );

}

export default MyApp;