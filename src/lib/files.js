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


// make frontmatter uniform for all files
export function getFrontmatterPro(slug, frontmatter, toc) {
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
        toc: toc || [],
        tags: [],
        keywords: [],
        draft: false,
        nextFile: null, // must be added
        prevFile: null, // must be added
    };
    return {
        ...defaultReturn,
        ...frontmatter,
    };
}

// returns prevFile and nextFile for a file's slug
export function getNextAndPrev(slug, sortedFiles) {
    const myIdx = sortedFiles.findIndex((file) => file.frontmatter.slug == slug);
    const nextFile = sortedFiles[myIdx - 1] || null;
    const prevFile = sortedFiles[myIdx + 1] || null;
    return { nextFile, prevFile };
}

// get frontmatter and file contents for a mdx file, contents is raw markup!!
export function getFileBySlug(slug) {
    const filePath = path.join(notesDir, slug, "index.mdx");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);
    return { frontmatter: getFrontmatterPro(slug, frontmatter), content };
}

// get files, including their frontmatter and raw markdown!!
export function getAllFiles() {
    const files = getSlugs().map((slug) => getFileBySlug(slug));
    return sortFiles(files);
}

// sort files descending
export function sortFiles(files) {
    const sortedFiles = files.sort((file1, file2) => sortDesc(file1, file2));
    return sortedFiles;
}
