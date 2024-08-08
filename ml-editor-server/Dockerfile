FROM dockerproxy.cn/node:18-alpine AS base
ENV APP_HOME=/usr/src/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

###################
# BUILD FOR LOCAL DEVELOPMENT
###################
FROM base AS development
ENV NODE_ENV development
COPY package*.json ./
RUN npm install --registry=https://registry.npmmirror.com/
COPY . .
RUN npm run build
CMD ["npm", "start"]
