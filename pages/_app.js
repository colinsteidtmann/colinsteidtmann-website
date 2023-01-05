import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import Link from "next/link";
import Image from "next/image";
import { MDXProvider } from "@mdx-js/react";
import Head from "next/head";

const components = {
  img: (props) => (
    <Image
      src={props.src}
      alt={props.alt}
    />
  ),
  a: (props) => <Link {...props} />,
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          content="width=device-width, initial-scale=1"
          name="viewport"
        />
      </Head>
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
