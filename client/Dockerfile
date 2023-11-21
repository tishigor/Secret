FROM node:14 AS build
# делаем каталог 'app' текущим рабочим каталогом
WORKDIR /app
# копируем оба 'package.json' и 'package-lock.json' (если есть)
COPY package*.json ./
RUN npm i
# копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
COPY . .
RUN npm run build

FROM nginx:1.20
WORKDIR /usr/share/nginx/html/
# копируем скомпилированные файлы из предыдущего этапа в папку nginx
COPY --from=build /app/dist /usr/share/nginx/html
# копируем конфиг файл nginx
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80