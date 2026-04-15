/**
 * Replaces markdown-like bold syntax (**text**) with HTML <strong> tags
 * and replaces newlines with <br /> tags.
 */
export function formatMarkdownText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />');
}
