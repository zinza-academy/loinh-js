FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

# Debug: Check if file exists in builder stage
RUN ls -la lib/data/location/

RUN npm run prisma:generate
 
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm i --omit=dev

# COPY ./prisma ./prisma

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env.prod .env

RUN cp ./dist/data/location/location-data.xlsx ./dist/lib/data/location/location-data.xlsx

EXPOSE 8080

CMD npm run prisma:push && npm run console:location:prod && npm run start:prod
