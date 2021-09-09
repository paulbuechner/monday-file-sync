#
# Builder stage.
# This state compile our TypeScript to get the JavaScript code
#
FROM node:16 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
RUN npm ci --quiet && npm run build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:16-alpine

# Create app directory
WORKDIR /app
ENV NODE_ENV=production

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install global dependencies
RUN npm install pm2 -g

# Install local dependecies
RUN npm ci
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:retain 14

## Grab the the build to execute the command
COPY --from=builder /usr/src/app/dist ./dist

RUN npm pm2:start:prod
