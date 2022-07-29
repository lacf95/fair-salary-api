FROM node:18-alpine3.15

RUN apk update; apk upgrade; apk add --no-cache --virtual tools \
      bash \
      less

WORKDIR /apps/fair-salary

COPY . /apps/fair-salary

RUN yarn

EXPOSE 3001

CMD ["yarn", "run", "dev"]
