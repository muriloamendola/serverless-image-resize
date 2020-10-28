import * as AWS from 'aws-sdk'

export function getObject (params: {Bucket: string, Key: string}) {
  return new AWS.S3().getObject(params).promise()
}

export function upload (params: {Bucket: string, Key: string, Body: Buffer, ContentType?: string}) {
  return new AWS.S3().upload(params).promise()
}
