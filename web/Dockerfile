FROM node:16-alpine

WORKDIR /app-frontend

COPY package.* ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]