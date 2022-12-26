import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import Link from "next/link";

export default function Home() {
  let pages = [{ title: "about", url: "/about", id: 0 }, { title: "notes", url: "/notes", id: 1 }];
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} ogType="website" />
      <div className="grid h-screen place-items-center">
        <div className="prose font-mono text-center">
          <h1 className="text-2xl tracking-[0.1em]">
            colin steidtmann
          </h1>
          <div className="flex flex-col mt-5">
            {pages.map((page) => {
              return <Link className="text-lg no-underline" href={page.url} key={page.id}>{page.title}</Link>;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return (
    page
  );
};