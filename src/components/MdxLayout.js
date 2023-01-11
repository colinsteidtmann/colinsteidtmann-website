import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

// Layout for MDX Posts
export default function MdxLayout({ children, lastmod }) {
  const router = useRouter();
  const path = router.asPath;
  const pathParts = path.split("/").slice(1);
  const pathLinks = pathParts.map((part) => {
    part =
      part.indexOf("#") != -1 ? part.substring(0, part.indexOf("#")) : part;
    return {
      href: path.substring(0, path.indexOf(part)) + part,
      part: part,
    };
  });
  return (
    <div className="px-4 sm:px-0">
      <nav className="py-3">
        <ul className="flex flex-row items-center gap-x-2 max-w-prose mx-auto">
          <li>
            <Link href="/">Colin Steidtmann</Link>
          </li>
          {pathLinks.map((obj) => {
            return (
              <li key={obj.part}>
                <ChevronRightIcon className="h-3 w-3 inline-block mr-2" />
                <Link href={obj.href}>{obj.part}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="bg-[#fdfdfd] min-h-screen -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="prose mx-auto">
          <p className="pt-4">
            <time dateTime={lastmod}>Last updated {lastmod}</time>
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
