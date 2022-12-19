import { bundleMDX } from "mdx-bundler";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import getAllFilesRecursively from "./utils/files";
// Remark packages
// Rehype packages

const root = process.cwd();
const contentDir = "content";
const componentsDir = "components";

// type is a subfolder in content, like 'blogs'
export function getFiles(type) {
    const prefixPaths = path.join(root, contentDir, type);
    const files = getAllFilesRecursively(prefixPaths);
    // Only want to return blog/path and ignore root, replace is needed to work on Windows
    return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'));
}

export function formatSlug(slug) {
    return slug.replace(/\.(mdx|md)/, '');
}

// type is a subfolder in contentDir, like 'blogs'
export async function getFileBySlug(type, slug) {
    const mdxPath = path.join(root, contentDir, type, `${slug}.mdx`);
    const mdPath = path.join(root, contentDir, type, `${slug}.md`);
    const source = fs.existsSync(mdxPath)
        ? fs.readFileSync(mdxPath, 'utf8')
        : fs.readFileSync(mdPath, 'utf8');

    // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
    if (process.platform === 'win32') {
        process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'esbuild.exe');
    } else {
        process.env.ESBUILD_BINARY_PATH = path.join(root, 'node_modules', 'esbuild', 'bin', 'esbuild');
    }

    const { code, frontmatter } = await bundleMDX({
        source: source,
        cwd: path.join(root, componentsDir),
        esbuildOptions: (options) => {
            options.loader = {
                ...options.loader,
                '.js': 'jsx',
            };
            return options;
        },
    });

    return {
        code,
        frontMatter: {
            slug: slug || null,
            fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
            ...frontmatter,
            date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
        }
    };
}

// type is a subfolder in content, like 'blogs'
export async function getAllFilesFrontMatter(type) {
    const prefixPaths = path.join(root, contentDir, type);

    const files = getAllFilesRecursively(prefixPaths);

    const allFrontMatter = [];

    files.forEach((file) => {
        // Replace is needed to work on Windows
        const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/');
        // Remove Unexpected File
        if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
            return;
        }
        const source = fs.readFileSync(file, 'utf8');
        const { data: frontmatter } = matter(source);
        if (frontmatter.draft !== true) {
            allFrontMatter.push({
                ...frontmatter,
                slug: formatSlug(fileName),
                date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
            });
        }
    });

    return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date));
}