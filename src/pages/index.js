import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import Link from "next/link";

export default function Home() {
  let pages = [
    { title: "about", url: "/notes/about", id: 0 },
    { title: "notes", url: "/notes", id: 1 },
  ];
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
        ogType="website"
      />
      {/* A centered display block with my name, about, notes */}
      <div className="grid h-screen place-items-center text-center prose mx-auto">
        <div>
          <h1 className="mb-5">colin steidtmann</h1>
          <nav className="not-prose text-xl">
            <ul className="flex flex-col">
              {pages.map((page) => {
                return (
                  <li key={page.id}>
                    <Link href={page.url}>{page.title}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return page;
};
