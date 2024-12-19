FROM node:20-bullseye-slim

WORKDIR /app

# Install OpenSSL 1.1
RUN apt-get update && apt-get install -y openssl=1.1.1* && rm -rf /var/lib/apt/lists/*

COPY package.json ./
COPY package-lock.json ./
COPY . ./

RUN npm ci && \
    npm run build

ENV PORT 3000
EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["start"]