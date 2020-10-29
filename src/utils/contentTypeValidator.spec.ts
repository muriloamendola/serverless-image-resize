import { isContentTypeAllowed } from './contentTypeValidator'

it('Should allow files to be resized when its content type is one of the allowed types', () => {
  process.env.ALLOWED_CONTENT_TYPES = 'image/png|image/jpg|image/jpeg'
  expect(isContentTypeAllowed('image/png')).toBeTruthy()
})

it('Should deny files to be resized when ALLOWED_CONTENT_TYPES environment variable is undefined', () => {
  process.env.ALLOWED_CONTENT_TYPES = undefined
  expect(isContentTypeAllowed('image/png')).toBeFalsy()
})
