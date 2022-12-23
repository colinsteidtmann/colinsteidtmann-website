import Link from "next/link";
import { getFilesByType } from "../../lib/mdx";

export async function getStaticProps() {
    const notes = getFilesByType("notes");
    return { props: { notes } };
};

export default function Notes({ notes }) {
    return (
        <>
            <h1>All Notes</h1>
            <ul>
                {
                    notes.map((n) => {
                        const { title, slug } = n.metadata;
                        return (
                            <li key={slug}>
                                <Link href={`/notes/${slug}`}>
                                    <p>{title}</p>
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </>
    );
}

