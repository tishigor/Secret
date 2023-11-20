<template>
  <Loader v-if="loading"></Loader>
  <div v-else>
    <div v-for="content in contents"
         :key="content.uuid"
         class="card mb-3" >
      <div class="card-body">
        <h5 class="card-title">{{ content.uuid }}</h5>
        <p class="card-text">{{ content.original }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import Loader from './Loader.vue';
import request from '../../utils';

export default {
  name: 'ReadView',
  components: {
    Loader,
  },
  data:
      () => ({
        loading: false,
        contents: [],
      }),
  async mounted() {
    this.loading = true;
    const route = useRoute();
    const { uuid } = route.params;
    this.contents = await request(`/api/content/${uuid}`);
    this.loading = false;
  },
};
</script>
