/* eslint-disable no-template-curly-in-string */
import type { Serverless } from 'serverless/aws'

const serverlessConfiguration: Serverless = {
  service: {
    name: 'serverless-image-resize'
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    region: 'us-east-1',
    stage: 'dev',
    memorySize: 512, // Default is 1024
    apiGateway: {
      minimumCompressionSize: 1024
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1'
    },
    deploymentBucket: {
      name: 'serverless-image-resize.${self:provider.stage}.deploys',
      blockPublicAccess: true
    },
    versionFunctions: false
  },
  functions: {
    imagesResize: {
      handler: 'src/handlers/imagesResizeHandler.process',
      events: [
        {
          s3: {
            bucket: 'images-to-resize-bucket',
            event: 's3:ObjectCreated:*',
            rules: [
              {
                prefix: 'uploads/',
                suffix: '.*'
              }
            ]
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration
