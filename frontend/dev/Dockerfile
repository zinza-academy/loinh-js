# 1) Build stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY ../package.json ./

RUN npm i

# copy toàn bộ source + build
COPY ../ ./

RUN npm run build

EXPOSE 3000

# chạy Next.js production server
CMD ["npm", "start"]