FROM node:18 AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npx nx build auth_app --prod

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=build /app/dist/apps/auth_app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
