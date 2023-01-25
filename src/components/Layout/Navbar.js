import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="prose py-8 sm:p-8">
        <Link href="/" className="no-underline">
          <h1 className="text-2xl font-mono">Colin Steidtmann</h1>
        </Link>
      </div>
    </>
  );
}

/*
export default function Navbar() {
    // My name, as Link in the top left
}
*/
