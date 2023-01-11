// format date
export function formatDate(date) {
  return date
    ? new Date(date).toLocaleDateString()
    : new Date().toLocaleDateString();
}

// sort in descending order
export function sortDesc(file1, file2) {
  return file1.frontmatterPro.date < file2.frontmatterPro.date ? 1 : -1;
}
