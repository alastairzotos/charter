FROM node:16-alpine
RUN apk update

ARG SCOPE
ENV SCOPE $SCOPE

ARG PORT
ENV PORT $PORT

ARG FRONTEND_URL
ENV FRONTEND_URL $FRONTEND_URL
ARG DB_CONNECTION_STRING
ENV DB_CONNECTION_STRING $DB_CONNECTION_STRING
ARG JWT_SIGNING_KEY
ENV JWT_SIGNING_KEY $JWT_SIGNING_KEY
ARG AWS_ACCESSKEY_ID
ENV AWS_ACCESSKEY_ID $AWS_ACCESSKEY_ID
ARG AWS_ACCESS_KEY_SECRET
ENV AWS_ACCESS_KEY_SECRET $AWS_ACCESS_KEY_SECRET
ARG AWS_S3_BUCKET_NAME
ENV AWS_S3_BUCKET_NAME $AWS_S3_BUCKET_NAME
ARG AWS_S3_REGION
ENV AWS_S3_REGION $AWS_S3_REGION
ARG AWS_CLOUDFRONT_DOMAIN
ENV AWS_CLOUDFRONT_DOMAIN $AWS_CLOUDFRONT_DOMAIN
ARG SENDGRID_API_KEY
ENV SENDGRID_API_KEY $SENDGRID_API_KEY

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL $NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_URL $NEXT_PUBLIC_APP_URL

WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
COPY apps/${SCOPE}/package.json apps/${SCOPE}/package.json

# Add libs here
COPY libs/dtos/package.json libs/dtos/package.json
COPY libs/service-schemas/package.json libs/service-schemas/package.json
COPY libs/urls/package.json libs/urls/package.json
COPY libs/utils/package.json libs/utils/package.json

RUN yarn --frozen-lockfile

# Build
RUN yarn global add turbo@1.5.5
COPY turbo.json package.json yarn.lock ./
COPY apps/${SCOPE} apps/${SCOPE}
COPY libs libs
RUN turbo run build --scope=${SCOPE} --include-dependencies

EXPOSE ${PORT}
CMD yarn workspace ${SCOPE} start