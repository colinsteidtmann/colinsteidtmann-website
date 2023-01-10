import path from "path";
import { bundleMDX } from "mdx-bundler";
import { getFrontmatterPro } from "./files";
import remarkTocHeadings from "plugins/remark-toc-headings";
import remarkMdxImages from "remark-mdx-images";
const root = process.cwd();

/**
 * Runs esbuild for a specific markdown file.
 * @param {String} slug
 * @returns |code, frontmatterPro, toc| where code is Javascript string of the MDX constructor document and frontmatterPro is the standardized frontmatter object
 */
export async function mdxBundle(slug) {
    const slugDir = path.join(root, "src", "content", "notes", slug); // content/notes/about
    const publicDir = path.join(root, "public", "static"); // public/static

    let loaderImages = {}; // {".png":"file", ".jpg":"file"}
    [".png", ".jpg"].forEach((ext) => (loaderImages[ext] = "file"));
    const toc = []; // reference for table of contents
    const { code, frontmatter } = await bundleMDX({
        file: `${slugDir}/index.mdx`, // entry point for esbuild to start resolving imports/exports
        cwd: `${slugDir}/`, // relative path that imports/exports will be using, like "./photo.png"
        bundleDirectory: `${publicDir}/notes/${slug}/`, // bundle images into this public folder
        bundlePath: `/static/notes/${slug}/`, // load all images with the prefix public subfolder prefix
        esbuildOptions: (options) => {
            options.loader = {
                ...options.loader, // custom mdx-bundler and @mdx/esbuild loader
                ...loaderImages, // our images are interpreted as files
                ".js": "jsx", //  .js files should be treated as .jsx files so they can export components
            };
            options.target = [
                // bundle to older js syntax so that older browsers support it
                "es2020",
                "chrome58",
                "firefox57",
                "node12",
                "safari11",
            ];
            options.define = {
                "process.env": JSON.stringify(process.env), // share  environment variables with esbuild
            };
            return options;
        },
        mdxOptions(options) {
            options.providerImportSource = "@mdx-js/react";
            // this is the recommended way to add custom remark/rehype plugins:
            // The syntax might look weird, but it protects you in case we add/remove
            // plugins in the future.
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                remarkMdxImages,
                [remarkTocHeadings, { exportRef: toc }]
            ];
            options.rehypePlugins = [...(options.rehypePlugins ?? []),

            ];

            return options;
        },
        globals: {
            "@mdx-js/react": {
                varName: "mdxComponents",
                namedExports: ["useMDXComponents"],
                defaultExport: false,
            },
        }
    });

    return { code, frontmatterPro: getFrontmatterPro(slug, frontmatter), toc };
}
