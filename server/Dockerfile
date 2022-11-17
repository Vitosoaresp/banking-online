FROM node:16.14-alpine

WORKDIR /app-backend

COPY package*.json ./

COPY . .

RUN npm install

COPY /prisma ./prisma

RUN npx prisma generate

CMD ["npm", "run", "dev"]