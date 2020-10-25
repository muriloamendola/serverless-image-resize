import { S3Event, S3Handler } from 'aws-lambda'
import 'source-map-support/register'

export const process: S3Handler = async (event: S3Event, _context) => {
  console.log(JSON.stringify(event))
}
