import fs from "fs";
import path from "path";
import matter from "gray-matter";

const root = process.cwd();
export const notesDir = path.join(root, "content", "notes");

export function getSlugs() {
  const files = fs.readdirSync(notesDir);
  return files;
}

export function getFileBySlug(slug) {
  const filePath = path.join(notesDir, slug, "index.mdx");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: metadata, content } = matter(fileContents);
  const today = new Date().toISOString();
  metadata.date && (metadata.date = new Date(metadata.date).toISOString());
  metadata.lastmod &&
    (metadata.lastmod = new Date(metadata.date).toISOString());
  const defaultReturn = {
    content: null,
    metadata: {
      slug: slug,
      title: "Default title",
      description: "Default Description",
      date: today,
      lastmod: today,
      tags: [],
      keywords: [],
      draft: false,
    },
  };
  return {
    content,
    metadata: {
      ...defaultReturn.metadata,
      ...metadata,
    },
  };
}

function sortDesc(file1, file2) {
  return file1.metadata.date < file2.metadata.date ? 1 : -1;
}

export function getAllFiles() {
  const files = getSlugs()
    .map((slug) => getFileBySlug(slug))
    .sort((file1, file2) => sortDesc(file1, file2));
  return files;
}
