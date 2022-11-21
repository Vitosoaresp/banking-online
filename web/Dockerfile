FROM node:16-alpine

WORKDIR /web

COPY package.* ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]