import MdxRenderer from "@/components/MdxRenderer";
import { getFileBySlug, getFilesByType } from "@/lib/mdx";
import { NoteSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import MdxLayout from "@/components/MdxLayout";

export async function getStaticPaths() {
  const notes = getFilesByType("notes");
  return {
    paths: notes.map((note) => {
      return {
        params: {
          slug: note.metadata.slug,
        },
      };
    }),
    fallback: false,
  };
}

const type = "notes";
export async function getStaticProps({ params }) {
  const slug = params.slug;
  const { metadata } = getFileBySlug(type, slug);
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
      <MdxLayout lastmod={lastmod}>
        <h1>{title}</h1>
        <MdxRenderer metadata={metadata} />
      </MdxLayout>


    </>
  );
}
