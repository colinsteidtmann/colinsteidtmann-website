import path from "path";
import fs from "fs";
import matter from "gray-matter";

const root = process.cwd();
export const notesDir = path.join(root, "content", "notes");

export function getSlugs() {
  const files = fs.readdirSync(notesDir);
  return files;
}

export function getMetadata(slug, frontmatter) {
  const today = new Date().toISOString();
  frontmatter.date && (frontmatter.date = new Date(frontmatter.date).toISOString());
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
  };
  return {
    ...defaultReturn,
    ...frontmatter,
  };
}


export function getFileBySlug(slug) {
  const filePath = path.join(notesDir, slug, "index.mdx");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: frontmatter, content } = matter(fileContents);
  return { metadata: getMetadata(slug, frontmatter), content };
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
