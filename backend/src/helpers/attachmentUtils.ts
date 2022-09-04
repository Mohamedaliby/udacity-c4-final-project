import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
const XAWS = AWSXRay.captureAWS(AWS)

const s3 = new AWS.S3({
    signatureVersion: 'v4'
  })
// TODO: Implement the fileStogare logic

export class AttachmentUtils {
    constructor() { }

    async createAttachmentPresignedUrl(todoId: string): Promise<String> {
        const signedUrl = await s3.getSignedUrl('putObject', {
            Bucket: process.env.ATTACHMENT_S3_BUCKET,
            Key: todoId,
            Expires: process.env.SIGNED_URL_EXPIRATION
        })
    
        return signedUrl
    }
}