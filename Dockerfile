FROM node:10.6

RUN mkdir /app
WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
RUN yarn install --production

COPY src/ /app/src

EXPOSE 3000
CMD ["npm", "start"]
