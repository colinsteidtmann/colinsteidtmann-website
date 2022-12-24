import { useEffect, useState } from "react";
import MdxRenderer from "../../components/MdxRenderer";
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

const type = "notes";
export async function getStaticProps({ params }) {
    const slug = params.slug;
    const { metadata } = getFileBySlug(type, slug);
    return { props: { metadata } };
}

export default function SpecificNote({ metadata }) {
    const { title, date, tags, lastmod, slug } = metadata;
    return (
        <>
            <h1>Specific Notes</h1>
            <div className="prose mx-auto mt-8">
                <h1>{title}</h1>
                <p><time dateTime={date} className="italic">Last updated {lastmod}</time></p>
            </div>
            <MdxRenderer type={type} slug={slug} />
        </>
    );
}