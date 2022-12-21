import Link from "next/link";

export default function Home() {
  let pages = [{ title: "about", url: "/about" }, { title: "resume", url: "/resume" }];
  pages = [];
  return (
    <div className="grid h-screen place-items-center">
      <div className="font-mono text-center">
        <h1 className="text-2xl tracking-[0.1em]">
          colin steidtmann
        </h1>
        <div className="flex flex-col">
          {pages.map((page) => {
            return <Link className="text-lg" href={page.url}>{page.title}</Link>;
          })}
        </div>
      </div>
    </div>
  );
}
