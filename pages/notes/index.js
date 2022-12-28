import Link from "next/link";
import { getFilesByType } from "@/lib/mdx";
import { PageSEO } from "@/components/SEO";

export async function getStaticProps() {
  const notes = getFilesByType("notes");
  return { props: { notes } };
}

export default function Notes({ notes }) {
  return (
    <>
      <PageSEO
        title="Notes - Colin Steidtmann"
        description="Notes I take as I learn/do different things."
        ogType="website"
      />
      <div className="prose mx-auto">
        <h1>All Notes</h1>
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
                  className="no-underline"
                >
                  <p>
                    {title}{" "}
                    <time
                      className="text-slate-600 text-sm"
                      dateTime={date}
                    >
                      ({date})
                    </time>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
