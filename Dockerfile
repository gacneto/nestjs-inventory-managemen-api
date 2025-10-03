# Stage 1: Build a imagem de build
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copia os arquivos de dependências e instala
COPY package*.json ./
RUN npm install

# Copia todo o código fonte
COPY . .

# Compila o projeto TypeScript para JavaScript
RUN npm run build

# Stage 2: Production - Cria a imagem final e otimizada
FROM node:18-alpine

# Define o WORKDIR novamente
WORKDIR /usr/src/app

# Copia apenas os artefatos necessários da imagem de build
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]