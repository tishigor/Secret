<template>
  <Loader v-if="loading"></Loader>
  <div v-else>
    <div class="card mb-3" v-for="content in contents">
      <div class="card-body">
        <h5 class="card-title">{{ content.uuid }}</h5>
        <p class="card-text">{{ content.original }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import {useRoute} from 'vue-router'
import {request} from '../../utils'


export default {
  name: 'Read',
  setup() {
    const route = useRoute()
    console.log(route.params.uuid)
  },
  components: {
    Loader
  },
  data:
      () => {
        return {
          loading: false,
          contents: [],
          page: 'NoteView',
        }
      },
  async mounted() {
    this.loading = true
    const route = useRoute();
    const uuid = route.params.uuid;
    this.contents = await request('/api/content/' + uuid)
    this.loading = false
  }
}
</script>