import path from "path";
import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";
import remarkMdxImages from 'remark-mdx-images';
import { getMetadata } from "./mdx";

export async function mdxBundle(slug) {
    const slugDir = path.join(process.cwd(), "content", "notes", slug);
    const publicDir = path.join(process.cwd(), "public", "static");
    let loaderImages = {};
    [".png", ".jpg"].forEach((ext) => loaderImages[ext] = "file");
    const { code, frontmatter } = await bundleMDX({
        file: `${slugDir}/index.mdx`,
        cwd: `${slugDir}/`,
        bundleDirectory: `${publicDir}/notes/${slug}/`,
        bundlePath: `/static/notes/${slug}/`,
        esbuildOptions: (options) => {
            options.loader = {
                ...options.loader,
                ...loaderImages,
                ".js": "jsx"
            };
            options.target = [
                'es2020',
                'chrome58',
                'firefox57',
                'node12',
                'safari11',
            ];
            options.define = {
                "process.env": JSON.stringify(process.env)
            };
            return options;
        },
        mdxOptions(options) {
            // this is the recommended way to add custom remark/rehype plugins:
            // The syntax might look weird, but it protects you in case we add/remove
            // plugins in the future.
            options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm, remarkMdxImages];
            options.rehypePlugins = [...(options.rehypePlugins ?? [])];

            return options;
        },
    });

    return { code, metadata: getMetadata(slug, frontmatter) };
}

// import path from "path";
// import { useMemo } from "react";
// import { getMDXComponent } from "mdx-bundler/client";
// import { bundleMDX } from "mdx-bundler";
// import remarkGfm from "remark-gfm";
// import MdxLayout from "@/components/MdxLayout";
// import { formatDate } from "@/lib/utils";

// export async function getStaticPaths() {
//     const slugs = getSlugs();
//     return {
//         paths: slugs.map((slug) => { return { params: { slug: slug, }, }; }),
//         fallback: false,
//     };
// }
// export async function getStaticProps({params}){
//     const slug = params.slug;
//     const slugDir = path.join(process.cwd(), "content", "notes", slug);
//     const publicDir = path.join(process.cwd(), "public", "static");
//     let loaderImages = {};
//     const imageExts = [".png", ".jpg"].forEach((ext) => loaderImages[ext] = "file");
//     const { code, frontmatter } = await bundleMDX({
//         file: `${slugDir}/index.mdx`,
//         cwd: `${slugDir}/`,
//         bundleDirectory: `${publicDir}/${slug}/`,
//         bundlePath: `/${slug}/`,
//         esbuildOptions: (options) => {
//             options.loader = {
//                 ...options.loader,
//                 ...imageExts,
//             };
//             options.target = [
//                 'es2020',
//                 'chrome58',
//                 'firefox57',
//                 'node12',
//                 'safari11',
//             ];
//             return options;
//         },
//         mdxOptions(options) {
//             // this is the recommended way to add custom remark/rehype plugins:
//             // The syntax might look weird, but it protects you in case we add/remove
//             // plugins in the future.
//             options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkGfm];
//             options.rehypePlugins = [...(options.rehypePlugins ?? [])];

//             return options;
//         },
//     });
//     return {code, frontmatter}
// }

// export default function SpecificNote({code, frontmatter}) {
//     const { title, lastmod} = frontmatter;
//     const Component = useMemo(() => getMDXComponent(code), [code]);
//     return (
//         <>
//             <MdxLayout lastmod={formatDate(lastmod)}>
//                 <h1>{title}</h1>
//                 <Component />
//             </MdxLayout>
//         </>
//     );
// }