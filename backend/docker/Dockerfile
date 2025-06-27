FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY prisma ./prisma
COPY .env .env

RUN npx prisma generate

COPY . .

EXPOSE 8080

CMD npm run start:dev
