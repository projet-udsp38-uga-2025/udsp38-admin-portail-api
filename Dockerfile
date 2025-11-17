FROM node:20-alpine AS builder

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG DATABASE_URL
ARG NEXT_PUBLIC_UPLOAD_IMAGE_URL
ARG NEXT_UPLOAD_IMAGE_DIR

ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_UPLOAD_IMAGE_URL=$NEXT_PUBLIC_UPLOAD_IMAGE_URL
ENV NEXT_UPLOAD_IMAGE_DIR=$NEXT_UPLOAD_IMAGE_DIR

# Génère Prisma client dans /app/src/infrastructure/database/prisma/core
RUN pnpm prisma generate

# Build Next.js
RUN pnpm run build

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

ARG DATABASE_URL
ARG NEXT_PUBLIC_UPLOAD_IMAGE_URL
ARG NEXT_UPLOAD_IMAGE_DIR

ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_PUBLIC_UPLOAD_IMAGE_URL=$NEXT_PUBLIC_UPLOAD_IMAGE_URL
ENV NEXT_UPLOAD_IMAGE_DIR=$NEXT_UPLOAD_IMAGE_DIR


RUN corepack enable

COPY package.json pnpm-lock.yaml .npmrc ./

# Autorise les scripts (Prisma, Sharp, etc.) en prod
ENV PNPM_ALLOW_BUILD=true
ENV HUSKY=0
RUN pnpm install --frozen-lockfile --prod

# Copie le build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Copie le client Prisma généré dans le chemin custom
COPY --from=builder /app/src/infrastructure/database/prisma/core ./src/infrastructure/database/prisma/core

# Copie le schéma (utile pour migrations ou debug)
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["pnpm", "start"]
