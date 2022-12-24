import { Fragment, useEffect, useState } from "react";
// Client side rendering of the mdx file. TODO: Find a way to do this with pre-render
export default function MdxRenderer({ type, slug }) {
    const [mdxModule, setMdxModule] = useState();
    useEffect(() => {
        (async () => {
            const module = await import(`../content/${type}/${slug}/index.mdx`);
            setMdxModule(module);
        })();
    }, []);
    const Content = mdxModule ? mdxModule.default : Fragment;
    return <Content />;
}