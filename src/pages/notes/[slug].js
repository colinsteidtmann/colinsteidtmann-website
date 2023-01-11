import { getSlugs } from "@/lib/files";
import { NoteSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import MdxLayout from "@/components/MdxLayout";
import { formatDate } from "@/lib/utils";
import { mdxBundle } from "@/lib/mdx";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";
import { useMDXComponents } from "@mdx-js/react";
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
  const { code, frontmatterPro } = await mdxBundle(slug);
  return { props: { code, frontmatterPro } };
}

// Renders page for a specific note
export default function SpecificNote({ code, frontmatterPro, toc }) {
  const { title, date, lastmod, slug, description, keywords } = frontmatterPro;
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
      <MdxLayout lastmod={formatDate(lastmod)}>
        <h1>{title}</h1>
        <Component />
      </MdxLayout>
    </>
  );
}
