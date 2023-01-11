import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { sortDesc } from "./utils";

const root = process.cwd();
export const notesDir = path.join(root, "src", "content", "notes");

// get slugs/folder names for all files
export function getSlugs() {
    const files = fs.readdirSync(notesDir);
    return files;
}

// sort slugs descending order
export function sortSlugs(slugs) {
    const sortedSlugs = slugs.map((slug) => getFileBySlug(slug))
        .sort((file1, file2) => sortDesc(file1, file2));
    return sortSlugs;
}

// make frontmatter uniform for all files
export function getFrontmatterPro(slug, frontmatter) {
    const sortedSlugs = sortSlugs(getSlugs());
    const myIdx = sortedSlugs.indexOf(slug);
    const nextSlug = sortSlugs[myIdx - 1];
    const previousSlug = sortSlugs[myIdx + 1];
    const nextFile = nextSlug ? getFileBySlug(nextSlug) : null;
    const prevFile = previousSlug ? getFileBySlug(previousSlug) : null;
    const today = new Date().toISOString();
    frontmatter.date &&
        (frontmatter.date = new Date(frontmatter.date).toISOString());
    frontmatter.lastmod &&
        (frontmatter.lastmod = new Date(frontmatter.date).toISOString());
    const defaultReturn = {
        slug: slug,
        title: "Default title",
        description: "Default Description",
        date: today,
        lastmod: today,
        tags: [],
        keywords: [],
        draft: false,
        nextFile: nextFile,
        prevFile: prevFile
    };
    return {
        ...defaultReturn,
        ...frontmatter,
    };
}

// get frontmatter and file contents for a mdx file
export function getFileBySlug(slug) {
    const filePath = path.join(notesDir, slug, "index.mdx");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);
    return { frontmatterPro: getFrontmatterPro(slug, frontmatter), content };
}

// get files, including their frontmatter and more
export function getAllFiles() {
    const files = sortSlugs(getSlugs());
    return files;
}
