FROM node:16-alpine AS base

WORKDIR /app

EXPOSE 3000

FROM base AS prod

COPY package*.json ./

# fix permissions for packages
RUN npm config set unsafe-perm true
RUN npm install

COPY . ./

RUN chown -R node ./node_modules
USER node

CMD ["npm", "start"]