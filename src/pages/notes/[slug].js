import { extendFrontMatter, getAllFiles, getNextAndPrev, getSlugs } from "@/lib/files";
import { NoteSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import MdxLayout from "@/components/MdxLayout";
import { formatDate } from "@/lib/utils";
import { mdxBundle } from "@/lib/mdx";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMDXComponents } from "@mdx-js/react";
import TableOfContents from "@/components/MDX/TableOfContents";
import MdxPage from "@/components/Layout/MdxPage";
// At build time, generate a map of all possible paths
export async function getStaticPaths() {
  const slugs = getSlugs();
  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      };
    }),
    fallback: false,
  };
}

// Compiles mdx document based on the slug during build time.
export async function getStaticProps({ params }) {
  const slug = params.slug;
  let { code, frontmatter } = await mdxBundle(slug);
  const sortedFiles = getAllFiles();
  const { nextFile, prevFile } = getNextAndPrev(frontmatter.slug, sortedFiles);
  frontmatter = { ...frontmatter, nextFile, prevFile };
  return { props: { code, frontmatter } };
}

// Renders page for a specific note
export default function SpecificNote({ code, frontmatter }) {
  const { title, date, lastmod, slug, description, keywords, toc } = frontmatter;
  const Component = useMemo(
    () => getMDXComponent(code, { mdxComponents: { useMDXComponents } }),
    [code]
  );
  return (
    <>
      <NoteSEO
        title={title}
        description={description}
        date={date}
        lastmod={lastmod}
        keywords={keywords}
        url={`${siteMetadata.siteUrl}/notes/${slug}/`}
      />
      <MdxPage frontmatter={frontmatter}>
        <Component toc={toc} />
      </MdxPage>
    </>
  );
}
