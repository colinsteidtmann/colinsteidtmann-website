import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { getFileBySlug } from "../lib/mdx";

export async function getStaticProps() {
    const { code, frontMatter } = await getFileBySlug('author', "about");
    return { props: { code, frontMatter } };
}

export default function About({ code, frontMatter }) {
    const { title, date, tags, lastmod } = frontMatter;
    const Content = useMemo(() => getMDXComponent(code), [code]);
    return (
        <>
            <div className="prose mx-auto mt-8">
                <h1>{title}</h1>
                <time dateTime={date} className="italic">Last updated {lastmod}</time>
                <Content />
            </div>
        </>
    );
}