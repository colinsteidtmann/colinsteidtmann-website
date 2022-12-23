import { Fragment, useEffect, useMemo, useState } from "react";
import { getFileBySlug } from "../lib/mdx";
import { MDXProvider } from "@mdx-js/react";
export async function getStaticProps() {
    const { metadata, content } = getFileBySlug('author', "about", { content: true, metadata: true });
    const module = await import(`../content/author/about/index.mdx`);
    const Component = module.default;
    return { props: { metadata } };
}

export default function About({ metadata }) {
    const { title, date, tags, lastmod } = metadata;
    const [mdxModule, setMdxModule] = useState();

    useEffect(() => {
        console.log("hello");
        (async () => {
            const module = await import(`../content/author/about/index.mdx`);
            console.log(module);
            setMdxModule(module);
        })();
    }, []);
    const Content = mdxModule ? mdxModule.default : Fragment;
    const Cap = require(`../content/author/about/index.mdx`).default;
    return (
        <>
            <div className="prose mx-auto mt-8">
                <h1>{title}</h1>
                <time dateTime={date} className="italic">Last updated {lastmod}</time>
            </div>
            <Content />
            <Cap />
        </>
    );
}