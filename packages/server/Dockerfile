FROM node:16.13.0-alpine

WORKDIR /projects

COPY ./pnpm-lock.yaml ./

RUN npm install -g pnpm \
    && pnpm fetch

COPY . .

RUN pnpm install -r --offline

CMD cd packages/server && npm run dev
