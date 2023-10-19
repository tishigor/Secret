# Secret

Тестовое задание для [https://github.com/areal-team](https://github.com/areal-team).
Техническое задание в файле [task.md](task.md)

## Введение
Записывайте и читайте зашифрованный контент в браузере. SPA на Vue и API на Express для обмена зашифрованным контентом.

## Установка
- Выполните `npm install` для `client` и `server`.
- Запустите `client` и `server` командой `npm run dev`.


  Перейдите на [http://localhost:5173/](http://localhost:5173/)в вашем браузере, все заработает. 

## MongoDB
В качестве БД использовал mongo. Я оставил строку подключения к моей БД в mongoDB atlas. Если захотите ее изменить, она тут [server/credentials.js](client/config.js).

## Примечания
- Для сервера я явно установил порт 3000, но если вы захотите поменять его, то измените его в двух файликах: [.env](.env) и [client/config.js](client/config.js)
- Ключи шифрования для crypto хранятся на сервере в [server/credentials.js](client/config.js)