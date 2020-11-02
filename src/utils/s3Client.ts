import * as AWS from 'aws-sdk'
const S3 = new AWS.S3()

export function getObject (params: {Bucket: string, Key: string}) {
  return S3.getObject(params).promise()
}

export function upload (params: {Bucket: string, Key: string, Body: Buffer, ContentType?: string}) {
  return S3.upload(params).promise()
}
