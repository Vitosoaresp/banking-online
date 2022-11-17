FROM node:16.14-alpine

WORKDIR /app-backend

COPY package*.json ./

COPY . .

RUN npm install

RUN npx prisma generate

COPY /prisma ./prisma

CMD ["npm", "run", "dev"]