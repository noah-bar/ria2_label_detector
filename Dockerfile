FROM node:21-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm i --production
COPY . .
RUN npm run build

FROM node:21-alpine
WORKDIR /app
COPY --from=build ./app/node_modules ./node_modules
COPY --from=build ./app/dist ./
COPY .env ./
COPY config ./config
CMD ["node", "index.js"]
EXPOSE 4000

# BUILD
# docker build . -f Dockerfile -t label_detector:prod

# RUN
# docker run -d -p 4000:4000 --name label_detector_prod label_detector:prod
