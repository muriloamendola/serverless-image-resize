import { S3Event, S3EventRecord, S3Handler } from 'aws-lambda'
import { isContentTypeAllowed } from '../utils/contentTypeValidator'
import * as imageManipulator from '../utils/imagesManipulator'
import { getObject, upload } from '../utils/s3Client'

const newImageSize = {
  width: +(process.env.RESIZE_TO_WIDTH || 200),
  height: +(process.env.RESIZE_TO_HEIGHT || 200)
}

export const execute: S3Handler = async (event: S3Event, _context) => {
  const recordsResized = event.Records.map(record => resizeS3EventRecord(record))
  await Promise.all(recordsResized)
}

const resizeS3EventRecord = async (record: S3EventRecord) => {
  console.info(`Processing record: ${JSON.stringify(record)}`)

  const Bucket = record.s3.bucket.name
  const Key = record.s3.object.key

  const object = await getObject({ Bucket, Key })
  console.log(`Object of type ${object.ContentType} and size ${object.ContentLength} bytes`)

  if (!isContentTypeAllowed(object.ContentType)) {
    throw new Error(`Content-type ${object.ContentType} not allowed`)
  }

  const resizedImageBytes: Buffer = await imageManipulator.resize(object.Body as Buffer, newImageSize)
  const resizedImageKey = `resized/${Key.split('/').pop()}`

  await upload({
    ContentType: object.ContentType,
    Body: resizedImageBytes,
    Bucket,
    Key: resizedImageKey
  })

  console.info(`Object ${resizedImageKey} uploaded with success!`)
}
