import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import Image from "next/image";
import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";

const components = {
  img: (props) => (
    <Image
      src={require(`../content/${props.src}`)}
      alt={props.alt}
    />
  ),
  a: (props) => <Link {...props} />,
};

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);
  return (
    <>
      <Head>
        <meta
          content="width=device-width, initial-scale=1"
          name="viewport"
        />
      </Head>
      <MDXProvider components={components}>
        {getLayout(<Component {...pageProps} />)}
      </MDXProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
