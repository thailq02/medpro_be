# Stage 0
FROM node:20-slim as base
LABEL maintainer="YourName <yourname@domain.com>"

WORKDIR /app
COPY package.json package-lock.json ./


# Stage 1
FROM base as deps
RUN  --mount=type=cache,id=npm,target=/root/.npm npm install --production


# Stage 2
FROM base as builder
RUN --mount=type=cache,id=npm,target=/root/.npm npm install
COPY . .
RUN npm run build


# Stage 3
FROM base AS runner
ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 4000
ARG APP_VERSION
ENV APP_VERSION $APP_VERSION
COPY --from=builder /app/.env ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/tsconfig.json ./
COPY --from=deps /app/node_modules ./node_modules
EXPOSE $PORT
CMD ["npm", "start"]
