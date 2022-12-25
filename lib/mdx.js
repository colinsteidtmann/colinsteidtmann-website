import fs from "fs";
import path from "path";
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'content');

export function getFileBySlug(type, slug, fields = { content: false, metadata: true }) {
    const filePath = path.join(contentDir, type, slug, "index.mdx");
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: metadata, content } = matter(fileContents);
    let date = metadata.date ? new Date(metadata.date).toLocaleDateString() : "empty date";
    const lastmod = metadata.lastmod ? new Date(metadata.lastmod).toLocaleDateString() : date;
    let returnObj =
    {
        content: fields.content ? content : null,
        metadata: fields.metadata ? {
            type: type ||= "empty type?",
            slug: slug ||= "empty slug?",
            title: metadata.title ||= "empty title",
            description: metadata.description ||= "empty description",
            date: date,
            lastmod: lastmod,
            tags: metadata.tags ||= [],
            draft: metadata.draft ||= false
        } : null
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
        .sort((file1, file2) => (new Date(file1.metadata?.date).toISOString() < new Date(file2.metadata?.date).toISOString() ? 1 : -1));
    return notes;
}