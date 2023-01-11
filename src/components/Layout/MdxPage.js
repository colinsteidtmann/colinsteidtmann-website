import TableOfContents from "../MDX/TableOfContents";
import NextAndPrevious from "./NextAndPrevious";

export default function MdxPage({ children, frontmatter }) {
    const { title, date, toc } = frontmatter;
    return (
        <article>
            <h1>{title}</h1>
            <p><time dateTime={date.getDate()}>{date.getMonth()}, {date.getMonth()}</time></p>
            <TableOfContents toc={toc} />
            <section>
                {children}
            </section>
            <NextAndPrevious frontmatter={frontmatter} />
        </article>
    );
    // Title
    // Month Year
    // Table of contents
    // Article
    // next and previous
}

/*
export default function MdxPage({children, frontmatter, toc}) {
    // Title
    // Month Year
    // Table of contents
    // Article
    // next and previous
}
*/