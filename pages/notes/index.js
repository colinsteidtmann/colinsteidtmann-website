import Link from "next/link";
import { getFilesByType } from "@/lib/mdx";
import { PageSEO } from "@/components/SEO";
import MdxLayout from "@/components/MdxLayout";

export async function getStaticProps() {
  const notes = getFilesByType("notes");
  return { props: { notes } };
}

export default function Notes({ notes }) {
  console.log(notes);
  return (
    <>
      <PageSEO
        title="Notes - Colin Steidtmann"
        description="Notes I take as I learn/do different things."
        ogType="website"
      />
      <MdxLayout lastmod={notes[0]?.metadata.lastmod}>
        <div className="flex flex-row items-center gap-x-2 -mt-5">
          <p>Category:</p>
          <Link href="/notes/author">Author</Link>
        </div>

        <h1>Notes</h1>
        <p>
          Notes mainly to remind my future self how to do something or what I
          was doing over the years.
        </p>
        <ul>
          {notes.map((n) => {
            const { title, date, slug } = n.metadata;
            return (
              <li key={slug}>
                <Link
                  href={`/notes/${slug}`}
                >
                  {title}{" "}
                  <time dateTime={date}>({date})</time>
                </Link>
              </li>
            );
          })}
        </ul>
      </MdxLayout>
    </>
  );
}
