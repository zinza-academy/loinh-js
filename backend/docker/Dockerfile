FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY prisma ./prisma
COPY .env .env

RUN npm run prisma:generate

COPY . .

EXPOSE 8080

CMD npm run prisma:push && npm run start:dev

# then in exec run: npm run console:location