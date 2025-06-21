  # * build *
  FROM node:23-alpine AS build
  WORKDIR /usr/src/app

  COPY --chown=node:node package.json ./
  RUN npm install

  COPY --chown=node:node src ./src
  COPY --chown=node:node nest-cli.json ./
  COPY --chown=node:node tsconfig.json tsconfig.build.json ./
  COPY --chown=node:node .env ./
  RUN npm run build
  
  # * prod * 
  FROM node:23-alpine AS prod
  WORKDIR /usr/src/app

  COPY --from=build /usr/src/app/dist ./dist
  COPY --from=build /usr/src/app/node_modules ./node_modules
  COPY --from=build /usr/src/app/.env ./

  USER node
  EXPOSE 3000
  CMD ["node", "dist/main.js"]
