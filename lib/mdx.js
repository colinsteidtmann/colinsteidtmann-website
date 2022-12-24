import fs from "fs";
import path from "path";
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'content');

export function getFileBySlug(type, slug, fields = { content: false, metadata: true }) {
    const filePath = path.join(contentDir, type, slug, "index.mdx");
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: metadata, content } = matter(fileContents);

    let returnObj =
    {
        content: fields.content ? content : null,
        metadata: fields.metadata ? {
            type: type ||= "empty type?",
            slug: slug ||= "empty slug?",
            title: metadata.title ||= "empty title",
            date: metadata.date ||= "empty data",
            lastmod: metadata.lastmod || (metadata.date ||= "empty lastmod"),
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
        .sort((file1, file2) => (file1.metadata?.date > file2.metadata?.date ? 1 : -1));
    return notes;
}