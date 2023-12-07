FROM node:18-slim

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . ./

ENV NODE_ENV production
ENV PORT 3001

EXPOSE 3001

CMD ["node", "src/server"]
