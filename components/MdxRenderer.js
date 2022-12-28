import { Fragment, useEffect, useState } from "react";
// Client side rendering of the mdx file. TODO: Find a way to do this with pre-render
export default function MdxRenderer({ metadata }) {
  const [mdxModule, setMdxModule] = useState();
  const { type, slug, draft } = metadata;
  useEffect(() => {
    (async () => {
      const mdxModule = await import(`../content/${type}/${slug}/index.mdx`);
      setMdxModule(mdxModule);
    })();
  }, [type, slug]);
  const Content = mdxModule ? mdxModule.default : Fragment;
  if (draft) return <p>🚧 Under Construction</p>;
  return <Content />;
}
