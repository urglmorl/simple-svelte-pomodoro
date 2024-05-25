FROM node:lts-alpine

COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.json .
COPY --chown=node:node svelte.config.js .
COPY --chown=node:node vite.config.ts .

COPY --chown=node:node . .

RUN npm ci

RUN npm run build

EXPOSE 8080

USER node

CMD ["node", "build/index.js"]