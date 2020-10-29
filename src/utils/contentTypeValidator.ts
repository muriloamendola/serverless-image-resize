export function isContentTypeAllowed (contentType?: string): boolean {
  if (contentType === undefined) return false

  const allowedContentTypes = process.env.ALLOWED_CONTENT_TYPES || ''
  return allowedContentTypes.split('|').includes(contentType)
}
