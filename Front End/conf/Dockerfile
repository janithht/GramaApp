# Build Stage
FROM node:14 as build-stage
WORKDIR /Front End
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /Front End/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
