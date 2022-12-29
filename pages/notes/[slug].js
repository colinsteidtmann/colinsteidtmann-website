import MdxRenderer from "@/components/MdxRenderer";
import { getFileBySlug, getSlugs } from "@/lib/mdx";
import { NoteSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import MdxLayout from "@/components/MdxLayout";
import { formatDate } from "@/lib/utils";

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
  const { metadata } = getFileBySlug(slug);
  return { props: { metadata } };
}

export default function SpecificNote({ metadata }) {
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
        <MdxRenderer metadata={metadata} />
      </MdxLayout>
    </>
  );
}
