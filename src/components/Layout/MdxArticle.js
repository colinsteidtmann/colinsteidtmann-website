import { format } from "date-fns";
import TableOfContents from "../MDX/TableOfContents";
import NextAndPrevious from "./NextAndPrevious";

export default function MdxArticle({ children, frontmatter }) {
    let { title, date, toc } = frontmatter;
    return (
        <article className="prose mx-auto">
            <h1>{title}</h1>
            <p><time dateTime={date}>{format(date, "MMM, yyyy")}</time></p>
            {/* <TableOfContents toc={toc} /> */}
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