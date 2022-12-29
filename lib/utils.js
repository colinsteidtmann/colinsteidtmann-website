/**
 *
 * @param {String} date a javascript date or string
 * @returns date to locale date string
 */
export function formatDate(date) {
  return date
    ? new Date(date).toLocaleDateString()
    : new Date().toLocaleDateString();
}
