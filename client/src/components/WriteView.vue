<template>
  <div class="mb-3">
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">Введи контент:</label>
      <textarea class="form-control" id="value" rows="3" placeholder="создать - ctrl+enter" v-model="form.value"
                @keyup.ctrl.enter="createContent"></textarea>
    </div>
    <button class="btn btn-primary" @click="createContent" :disabled="!canCreate">Создать</button>
  </div>
  <Loader v-if="loading"></Loader>
  <div v-else-if="contents.length">
    <div class="card mb-3" v-for="content in contents">
      <div class="card-body">
        <h5 class="card-title" style="cursor: pointer"
            @click="copyText(content.uuid)">{{ content.uuid }}</h5>
        <p class="card-text">{{ content.original }}</p>

        <button class="btn btn-primary mr-2" @click="copyText(content.uuid)">Копировать</button>
        <button class="btn btn-primary mr-2" @click="$router.push({name: 'Read', params:{uuid: content.uuid}})">Открыть
        </button>
        <button class="btn btn-danger mr-2" @click="removeContent(content.uuid)">Удалить</button>
      </div>
    </div>
  </div>
  <p v-else>Контента пока нет</p>
</template>

<script>
import Loader from "@/components/Loader.vue";
import {request} from '../../utils'

export default {
  name: 'Write',
  components: {
    Loader
  },
  data:
      () => {
        return {
          loading: false,
          form: {
            value: '',
          },
          contents: [],
          page: 'NoteView',
          pages: [
            {
              title: 'Read',
              component: 'NoteView',
            },
            {
              title: 'Write',
              component: 'UploadView',
            },
          ],
        }
      },
  computed: {
    canCreate() {
      return this.form.value.trim()
    }
  },
  methods: {
    async createContent() {
      if (!this.form.value.trim()) return
      this.loading = true
      const {...content} = this.form
      this.form.value = ''
      const newContent = await request('/api/content/', 'POST', content)
      console.log(newContent)
      this.contents.push(newContent)
      this.loading = false
    },
    async removeContent(uuid) {
      this.loading = true
      await request(`/api/content/${uuid}`, "DELETE")
      this.contents = this.contents.filter(c => c.uuid !== uuid)
      this.loading = false
    },
    copyText(link) {
      const tempElement = document.createElement("textarea");
      tempElement.value = link;
      document.body.appendChild(tempElement);
      tempElement.select();
      document.execCommand("copy");
      document.body.removeChild(tempElement);
      alert("Скопировано!");
    },

  },
  async mounted() {
    this.loading = true
    // todo Если будут пользователи
    // this.contents = await request('/api/contacts')
    this.loading = false
  }
}
</script>