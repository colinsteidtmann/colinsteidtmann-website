import fs from "fs";
import path from "path";
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'content');

export function getFileBySlug(type, slug, fields = { content: false, metadata: true }) {
    const fullPath = path.join(contentDir, type, slug, "index.mdx");
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data: metadata, content } = matter(fileContents);

    let returnObj =
    {
        content: fields.content ? content : null,
        metadata: fields.metadata ? { ...metadata, slug: slug } : null
    };
    return returnObj;
}

export function getSlugs(type) {
    const files = fs.readdirSync(path.join(contentDir, type));
    return files;
}

export function getFilesByType(type, fields = { content: false, metadata: true }) {
    const slugs = getSlugs(type);
    const notes = slugs
        .map((slug) => getFileBySlug(type, slug, fields))
        .sort((file1, file2) => (file1.metadata?.date > file2.metadata?.date ? -1 : 1));
    return notes;
}