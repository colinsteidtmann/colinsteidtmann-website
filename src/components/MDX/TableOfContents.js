import Link from "next/link";

export default function TableOfContents({ toc }) {
    return (
        <div>
            <h1>Table of Contents</h1>
            <IndentedList toc={toc} startIdx={0} />
        </div>
    );
    // Title (Table of Contents)
    // bullet list that has a link to each header in the table of contents
}

// recursive function to handle multi level table of contents
function IndentedList({ toc, startIdx }) {
    const subList = toc.slice(startIdx);
    const depth = subList[0].depth;
    return (
        <ul>
            {subList.map((tocItem, index) => {
                if (tocItem.depth != depth) return <IndentedList toc={toc} startIdx={startIdx + index} />;
                return (
                    <li key={tocItem.index}>
                        <Link href={tocItem.url}>{tocItem.textContent}</Link>
                    </li>
                );
            })}
        </ul>
    );
}

/*
export default function TableOfContents({ toc }) {
    // Title (Table of Contents)
    // bullet list that has a link to each header in the table of contents
}
*/