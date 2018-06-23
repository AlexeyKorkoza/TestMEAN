FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY uploads /usr/src/app/uploads
COPY backend/dist /usr/src/app/backend/dist
COPY public/build /usr/src/app/public/build

RUN npm install

CMD ["npm", "start"]
