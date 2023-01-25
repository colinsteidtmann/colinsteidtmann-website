import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { MDXProvider } from "@mdx-js/react";
import { MDXComponents } from "@/components/MDX/MDXComponents";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <MDXProvider components={MDXComponents}>
        <Component {...pageProps} />
      </MDXProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
