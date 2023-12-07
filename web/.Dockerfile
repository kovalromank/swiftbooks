FROM node:18-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . ./

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

ENV NODE_ENV production
ENV PORT 3002

EXPOSE 3002

CMD npm run start
