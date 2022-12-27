import { useEffect, useState } from "react";
import MdxRenderer from "@/components/MdxRenderer";
import { getFileBySlug, getFilesByType } from "@/lib/mdx";
import Link from "next/link";
import { NoteSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";
import { useRouter } from "next/router";

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
    const router = useRouter();
    const { title, date, tags, lastmod, slug, description, keywords } = metadata;
    return (
        <>
            <NoteSEO
                title={title}
                description={description}
                date={date}
                lastmod={lastmod}
                keywords={keywords}
                url={`${siteMetadata.siteUrl}/notes/${slug}/`}
            />

            <div className="prose mx-auto mt-8 max-w-3xl">

                <h1>{title}</h1>
                <p><time dateTime={lastmod} className="italic">Last updated {lastmod}</time></p>
                <MdxRenderer metadata={metadata} />
            </div>

        </>
    );
}