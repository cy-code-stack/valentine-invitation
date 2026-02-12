/**
 * Formats a name from the URL parameter.
 * - Capitalizes the first letter of each word
 * - Decodes URI components
 * - Falls back to "Beautiful" if no name is provided
 */
export function formatName(rawName) {
  if (!rawName || rawName.trim() === '') {
    return 'Beautiful'
  }

  const decoded = decodeURIComponent(rawName.trim())

  return decoded
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

/**
 * Updates the document title and meta description dynamically.
 */
export function updatePageMeta(name) {
  document.title = `Valentine Invitation for ${name} 💖`

  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute(
      'content',
      `A special Valentine's Day invitation for ${name}. You're invited to the most romantic evening of the year!`
    )
  }
}
