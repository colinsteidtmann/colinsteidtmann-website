import Link from "next/link";

export default function NextAndPrevious({ frontmatter }) {
  const { nextFile, prevFile } = frontmatter;
  return (
    <nav className="my-12">
      {prevFile && (
        <Link href={`/notes/${prevFile.frontmatter.slug}`}>
          {"< "} {prevFile.frontmatter.title}
        </Link>
      )}
      {nextFile && (
        <Link href={`/notes/${nextFile.frontmatter.slug}`}>
          {nextFile.frontmatter.title} {"> "}
        </Link>
      )}
    </nav>
  );
  // previous button on left
  // next button on right
}

/*
export default function NextAndPrevious({ frontmatter }) {
    // previous button on left
    // next button on right
}
*/
