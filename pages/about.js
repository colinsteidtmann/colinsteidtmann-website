import MdxRenderer from "@/components/MdxRenderer";
import { PageSEO } from "@/components/SEO";
import { getFileBySlug } from "@/lib/mdx";

const type = "author";
const slug = "about";
export async function getStaticProps() {
  const { metadata } = getFileBySlug(type, slug);
  return { props: { metadata } };
}

export default function About({ metadata }) {
  const { title, date, lastmod, description } = metadata;
  return (
    <>
      <PageSEO
        title={title}
        description={description}
        ogType="profile"
      />
      <div className="prose mx-auto mt-8">
        <h1>{title}</h1>
        <time
          dateTime={date}
          className="italic"
        >
          Last updated {lastmod}
        </time>
        <MdxRenderer metadata={metadata} />
      </div>
    </>
  );
}
