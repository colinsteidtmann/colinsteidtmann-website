import { useEffect, useState } from "react";
import { getFileBySlug, getFilesByType } from "../../lib/mdx";

export async function getStaticPaths() {
    const notes = getFilesByType("notes");

    return {
        paths: notes.map((note) => {
            return {
                params: {
                    slug: note.metadata.slug,
                },
            };
        }),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const slug = params.slug;
    const { metadata, content } = getFileBySlug("notes", slug, { content: true, metadata: true });
    console.log(metadata);
    const module = await import(`../../content/notes/${slug}/index.mdx`);
    console.log(module.default());
    return { props: { metadata, content: module.default() } };
}

export default function SpecificNote({ metadata, content }) {
    const { title, date, tags, lastmod } = metadata;
    return (
        <>
            <h1>Specific Notes</h1>
            <div className="prose mx-auto mt-8">
                <h1>{title}</h1>
                <p><time dateTime={date} className="italic">Last updated {lastmod}</time></p>
            </div>
            {content}
        </>
    );
}