import { Fragment, useEffect, useState } from "react";
// Client side rendering of the mdx file. TODO: Find a way to do this with pre-render
export default function MdxRenderer({ metadata }) {
  const [mdxModule, setMdxModule] = useState();
  const { slug, draft } = metadata;
  useEffect(() => {
    (async () => {
      const mdxModule = await import(`../content/notes/${slug}/index.mdx`);
      setMdxModule(mdxModule);
    })();
  }, [slug]);
  const Content = mdxModule ? mdxModule.default : Fragment;
  if (draft) return <p>🚧 Under Construction</p>;
  return <Content />;
}
