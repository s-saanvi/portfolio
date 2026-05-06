/**
 * Formats a date string or Date object into a localized string.
 * @param date - The date to format.
 * @param monthFormat - The format for the month ('numeric', '2-digit', 'long', 'short', 'narrow').
 * @returns A formatted date string.
 */
export function formatDate(
  date: Date | string,
  monthFormat: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow' = 'short'
): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: monthFormat,
    day: 'numeric',
  });
}
