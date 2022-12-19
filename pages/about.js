import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getFileBySlug } from "../lib/mdx";

export async function getStaticProps() {
    const { code, frontMatter } = await getFileBySlug('author', "about");
    return { props: { code } };
}

export default function About({ code }) {
    const Content = useMemo(() => getMDXComponent(code), [code]);
    return <Content />;
}