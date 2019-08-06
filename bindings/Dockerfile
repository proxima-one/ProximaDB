
FROM node:alpine

COPY ./ /app/

WORKDIR /app/

COPY ./package*.json /app/

RUN npm install

COPY . /app/

RUN npm rebuild

EXPOSE 50051

CMD ["npm", "start"]
