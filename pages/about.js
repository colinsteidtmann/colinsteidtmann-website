import { Fragment, useEffect, useMemo, useState } from "react";
import { getFileBySlug } from "../lib/mdx";
import { MDXProvider } from "@mdx-js/react";
import MdxContent from "../components/MdxContent";
import { compile } from "@mdx-js/mdx";
import fs from 'node:fs/promises';
import { runInContext } from "node:vm";
export async function getStaticProps() {
    const { metadata, content } = getFileBySlug('author', "about", { content: true, metadata: true });
    // const module = await import(`../content/author/about/index.mdx`);
    const dog = await import(`../content/dog.mdx`);

    //const html = dog.default();
    console.log(dog.default);
    const b = "hi";
    // const blank = dog.default();
    // console.log(blank);
    // console.log(metadata);
    return { props: { b } };
}

export default function About({ b }) {
    // const { title, date, tags, lastmod } = metadata;
    // const [mdxModule, setMdxModule] = useState();

    // useEffect(() => {
    //     console.log("hello");
    //     (async () => {
    //         const module = await import(`../content/author/about/index.mdx`);
    //         console.log(module);
    //         setMdxModule(module);
    //     })();
    // }, []);
    // const Content = mdxModule ? mdxModule.default : Fragment;
    return (
        <>
            {/* <div className="prose mx-auto mt-8">
                <h1>{title}</h1>
                <time dateTime={date} className="italic">Last updated {lastmod}</time>
            </div>
            <Content />
            <Cap /> */}
            <h1>Hi</h1>
        </>
    );
}