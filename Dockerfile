FROM node:18.19.0-alpine AS BASEIMAGE

WORKDIR /src
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build && npm prune --production

FROM node:18.19.0-alpine as amd64

WORKDIR /src
ENV TZ=America/Sao_Paulo
COPY --from=BASEIMAGE /src/dist /src/dist
COPY --from=BASEIMAGE /src/node_modules /src/node_modules
EXPOSE 3000
CMD ["node", "dist/src/main.js"]

FROM node:18.19.0-buster-slim as arm64

WORKDIR /src
ENV TZ=America/Sao_Paulo
COPY --from=BASEIMAGE /src/dist /src/dist
COPY --from=BASEIMAGE /src/node_modules /src/node_modules
EXPOSE 3000
CMD ["node", "dist/src/main.js"]