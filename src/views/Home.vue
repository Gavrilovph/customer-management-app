<template>
  <app-loader v-if="loading"></app-loader>
  <app-page v-else title="Список задач">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <request-filter v-model="filter"></request-filter>
    <request-table :requests="requests"></request-table>

    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
        <request-modal @created="modal = false"></request-modal>
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import AppPage from '@/components/ui/AppPage.vue';
import RequestTable from '@/components/request/RequestTable.vue';
import AppModal from '@/components/ui/AppModal.vue';
import RequestModal from '@/components/request/RequestModal.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import RequestFilter from '@/components/request/RequestFilter.vue';

export default {
  setup() {
    const store = useStore()
    const modal = ref(false)
    const loading = ref(false)
    const filter = ref({})

    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })

    // Фильтрация по имени и статусу
    const requests = computed(() => store.getters['request/requests']
      .filter(request => {
        if (filter.value.name) { //если есть данные в name, то выводим массив, включающий записи, совпадающие с введенными данными, иначе весь массив
          return request.fio.includes(filter.value.name)
        }
        return request
      })
      .filter(request => { //если есть данные в status, то выводим массив, включающий записи, совпадающие с выбранным в статусе select, иначе весь массив
        if (filter.value.status) {
          return filter.value.status === request.status
        }
        return request
      })
    )

    return {modal, requests, loading, filter}
  },
  components: {AppPage, RequestTable, AppModal, RequestModal, AppLoader, RequestFilter}
}
</script>
