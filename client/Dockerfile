FROM node:14 AS build


# устанавливаем простой HTTP-сервер для статики
#RUN npm install -g http-server

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
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80