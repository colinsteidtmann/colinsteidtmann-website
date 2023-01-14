// sort in descending order
export function sortDesc(file1, file2) {
  return file1.frontmatter.date < file2.frontmatter.date ? 1 : -1;
}
