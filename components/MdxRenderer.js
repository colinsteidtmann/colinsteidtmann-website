import { Fragment, useEffect, useState } from "react";
// import * as runtime from 'react/jsx-runtime';
// import { run } from '@mdx-js/mdx';
// Client side rendering of the mdx file. TODO: Find a way to do this with pre-render
export default function MdxRenderer({ metadata, content }) {
  const [mdxModule, setMdxModule] = useState();
  const Content = mdxModule ? mdxModule.default : Fragment;
  const { slug, draft } = metadata;
  useEffect(() => {
    (async () => {
      const mdxModule = await import(`../content/notes/${slug}/index.mdx`);
      setMdxModule(mdxModule);
    })();
  }, [slug, content]);

  if (draft) return <p>🚧 Under Construction</p>;
  return <Content />;
}
