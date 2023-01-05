import { getSlugs } from "@/lib/mdx";
import { NoteSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import MdxLayout from "@/components/MdxLayout";
import { formatDate } from "@/lib/utils";
import { mdxBundle } from "@/lib/bundler";
import { useMemo } from "react";
import { getMDXComponent } from "mdx-bundler/client";

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

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const { code, metadata } = await mdxBundle(slug);
  return { props: { code, metadata } };
}

export default function SpecificNote({ code, metadata }) {
  const { title, date, lastmod, slug, description, keywords } = metadata;
  const Component = useMemo(() => getMDXComponent(code), [code]);
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
