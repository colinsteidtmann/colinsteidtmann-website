import Link from "next/link";
import { getAllFiles } from "@/lib/files";
import { PageSEO } from "@/components/SEO";
import MdxLayout from "@/components/MdxLayout";
import { formatDate } from "@/lib/utils";

// get all frontmatter for files during build time
export async function getStaticProps() {
  const notes = getAllFiles();
  return { props: { notes } };
}

// use array [{frontmatterPro, content}] to show notes nav during runtime
export default function Notes({ notes }) {
  return (
    <>
      <PageSEO
        title="Notes - Colin Steidtmann"
        description="Notes I take as I learn/do different things."
        ogType="website"
      />
      <MdxLayout lastmod={formatDate(notes[0]?.frontmatter.lastmod)}>
        <h1>Notes</h1>
        <p>
          Notes mainly to remind my future self how to do something or what I
          was doing over the years.
        </p>
        <ul>
          {notes.map((n) => {
            const { title, date, slug } = n.frontmatter;
            return (
              <li key={slug}>
                <Link href={`/notes/${slug}`}>
                  {title} <time dateTime={date}>({formatDate(date)})</time>
                </Link>
              </li>
            );
          })}
        </ul>
      </MdxLayout>
    </>
  );
}
