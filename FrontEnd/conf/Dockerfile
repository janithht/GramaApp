FROM node:18-slim as build-stage
WORKDIR /FrontEnd
COPY package.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:latest

RUN rm /etc/nginx/conf.d/default.conf

COPY conf/nginx.conf /etc/nginx/conf.d/

COPY --from=build-stage /FrontEnd/build /usr/share/nginx/html
USER 10014
EXPOSE 8080 

CMD [ "nginx" , "-g" , "daemon off;" ]