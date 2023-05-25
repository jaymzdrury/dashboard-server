FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
ENV NODE_ENV production
ENV MONGO_URI=${MONGO_URI}
ENV PORT=${PORT}
CMD ["npm", "start"]