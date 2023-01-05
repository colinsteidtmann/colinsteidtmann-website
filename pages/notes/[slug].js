import MdxRenderer from "@/components/MdxRenderer";
import { getFileBySlug, getSlugs } from "@/lib/mdx";
//import { compile } from '@mdx-js/mdx';
import { NoteSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import MdxLayout from "@/components/MdxLayout";
import { formatDate } from "@/lib/utils";
//import path from "path";

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
  let { content, metadata } = getFileBySlug(slug);
  // const url = path.join(process.cwd(), "content", "notes", slug, "/");
  // content = String(await compile(content, { development: false, outputFormat: 'function-body' }));
  return { props: { content, metadata } };
}

export default function SpecificNote({ content, metadata }) {
  const { title, date, lastmod, slug, description, keywords } = metadata;
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
        <MdxRenderer metadata={metadata} content={content} />
      </MdxLayout>
    </>
  );
}
