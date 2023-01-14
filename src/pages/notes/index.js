import Link from "next/link";
import { getAllFiles } from "@/lib/files";
import { PageSEO } from "@/components/SEO";
import CommonLayout from "@/components/Layout/CommonLayout";
import { format, formatISO, getUnixTime } from "date-fns";

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
      <CommonLayout noBack>
        <h1>Notes</h1>
        <p>
          Notes mainly to remind my future self how to do something or what I
          was doing over the years. Written sporadically of course.
        </p>
        <ul>
          {notes.map((n) => {
            const { title, date, slug } = n.frontmatter;
            return (
              <li key={slug}>
                <Link href={`/notes/${slug}`}>
                  {title}
                </Link>
                <time className="mx-3 no-underline" dateTime={formatISO(date)}>{format(date, "MMM yyyy")}</time>
              </li>
            );
          })}
        </ul>
      </CommonLayout>
    </>
  );
}
