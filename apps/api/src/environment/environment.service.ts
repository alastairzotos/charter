import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvService {
  private readonly env_vars = {
    nodeEnv: process.env.NODE_ENV as string | undefined,
    managerUrl: process.env.MANAGER_URL as string,
    dbConnectionString: process.env.DB_CONNECTION_STRING as string,
    jwtSigningKey: process.env.JWT_SIGNING_KEY as string,
    awsAccessKeyId: process.env.AWS_ACCESSKEY_ID as string,
    awsAccessKeySecret: process.env.AWS_ACCESS_KEY_SECRET as string,
    awsS3BucketName: process.env.AWS_S3_BUCKET_NAME as string,
    awsS3Region: process.env.AWS_S3_REGION as string,
    awsCloudfrontDomain: process.env.AWS_CLOUDFRONT_DOMAIN as string,
    sendGridApiKey: process.env.SENDGRID_API_KEY as string,
    stripeApiVersion: process.env.STRIPE_API_VERSION as string,
    stripeSecretKey: process.env.STRIPE_SECRET_KEY as string,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET as string,
    googleClientId: process.env.GOOGLE_CLIENT_ID as string,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    googleClientIdAndroid: process.env.GOOGLE_CLIENT_ID_ANDROID as string,
    googleClientIdIOS: process.env.GOOGLE_CLIENT_ID_IOS as string,
    fbAppId: process.env.FB_APP_ID as string,
    sentryDsn: process.env.SENTRY_DSN as string,
    fromEmail: process.env.FROM_EMAIL as string,
    timezone: process.env.TIMEZONE as string,
    feedbackEmail: process.env.FEEDBACK_EMAIL as string,
    openAiApiKey: process.env.OPENAI_API_KEY as string,
    pineconeApiKey: process.env.PINECONE_API_KEY as string,
  };

  get() {
    return this.env_vars;
  }
}
