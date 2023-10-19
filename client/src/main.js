import {createRouter, createWebHistory} from 'vue-router'
import {createApp} from 'vue'
import App from './App.vue'

import Write from "@/components/WriteView.vue";
import Read from "@/components/ReadView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {name: 'Write', path: '/', component: Write},
        {name: 'Read', path: '/:uuid([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', component: Read},
        {path: '/:pathMatch(.*)', redirect: '/'} // Перенаправление на главную страницу для всех остальных путей
    ]
})

const app = createApp(App)
app.use(router).mount('#app')