import { S3Event, S3EventRecord, S3Handler } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import * as sharp from 'sharp'
import 'source-map-support/register'

AWS.config.region = 'us-east-1'
const s3 = new AWS.S3()

export const process: S3Handler = async (event: S3Event, _context) => {
  for (let i = 0; i < event.Records.length; i++) {
    const record: S3EventRecord = event.Records[i]
    console.info(`Processing record: ${JSON.stringify(record)}`)

    const bucketName = record.s3.bucket.name
    const objectKey = record.s3.object.key

    const object = await s3.getObject({
      Bucket: bucketName,
      Key: objectKey
    }).promise()

    console.log(`Object size ${object.ContentLength} bytes of type ${object.ContentType}`)

    const fileName = objectKey.split('/').pop()
    const resizedObjectKey = `resized/${fileName}`

    const resized: Buffer = await sharp(object.Body)
      .resize({
        width: 200,
        height: 200,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      })
      .toBuffer()

    await s3.upload({
      ContentType: object.ContentType,
      Body: resized,
      Bucket: bucketName,
      Key: resizedObjectKey
    }).promise()
  }
}
