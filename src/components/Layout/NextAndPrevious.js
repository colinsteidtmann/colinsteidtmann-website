import Link from "next/link";

export default function NextAndPrevious({ frontmatter }) {
    const { nextFile, prevFile } = frontmatter;

    return (
        <div>
            <Link href={`/notes/${prevFile.slug}`}>{'< '} {prevFile.title}</Link>
            <Link href={`/notes/${nextFile.slug}`}>{'< '} {nextFile.title}</Link>
        </div>
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