import { createRouter, createWebHistory } from 'vue-router';
import WriteView from '../components/WriteView.vue';
import ReadView from '../components/ReadView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'Write', path: '/', component: WriteView },
    { name: 'Read', path: '/:uuid([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', component: ReadView },
    { path: '/:pathMatch(.*)', redirect: '/' }, // Перенаправление на главную страницу для всех остальных путей
  ],
});

export default router;
