# Estágio de Build
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instala as dependências
RUN npm install

# Copia o código fonte
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

# Compila a aplicação
RUN npm run build

# Estágio de Produção
FROM node:20-alpine AS production

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários do estágio de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

# Expõe a porta da aplicação
EXPOSE 3000

# Define as variáveis de ambiente
ENV NODE_ENV=production

# Comando para executar a aplicação
CMD ["npm", "run", "start"]
