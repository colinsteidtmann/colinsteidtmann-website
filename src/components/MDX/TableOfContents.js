import Link from "next/link";
import useObserver from "@/hooks/useObserver";

export default function TableOfContents({ toc }) {
    const headingIDs = toc.map((tocItem) => tocItem.url);
    const { activeID } = useObserver({ elementIDs: headingIDs });
    return (
        <div className="fixed right-10 top-10">
            <h2>Table of Contents</h2>
            <NestedList toc={toc} activeID={activeID} />
        </div>
    );
    // Title (Table of Contents)
    // bullet list that has a link to each header in the table of contents
}

// Recursive function for nested lists
function NestedList({ toc, activeID }) {
    let map = new Map();
    const depth = toc[0].depth;
    for (let i = 0; i < toc.length; i++) {
        if (toc[i].depth > depth) continue; // don't render what the recursive function takes care of
        else if (toc[i].depth < depth) break; // exit when nested list reached it's max depth
        let newList = false; // conditional flag, if true, make a call to the recursive function
        if (i + 1 < toc.length && toc[i + 1].depth === toc[i].depth + 1) newList = true;
        map.set(
            toc[i].url,
            <li key={toc[i].index + "li"}>
                <Link href={toc[i].url} className={activeID === toc[i].url ? "text-blue-500" : undefined}>{toc[i].textContent}</Link>
                {newList && <NestedList toc={toc.slice(i + 1)} activeID={activeID} />}
            </li>

        );
    }
    return (
        <details className={map.has(activeID) ? "[&:not(details[open])_summary]:text-blue-500" : undefined}>
            <summary>open</summary>
            <ul key={toc[0].index + "ul"}>
                {Array.from(map.values())}
            </ul>
        </details>

    );
}

/*
export default function TableOfContents({ toc }) {
    // Title (Table of Contents)
    // bullet list that has a link to each header in the table of contents
}
*/