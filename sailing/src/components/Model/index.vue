<template>
  <div>
    <a-modal
      :footer="null"
      v-model:visible="isShowModel"
      title="Basic Modal"
      @ok="handleOk"
      @cancel="handleOk"
    >
      <SailForm></SailForm>
    </a-modal>
  </div>
</template>
<script lang="js">
import Store from '../../common/store'
import { toRefs } from 'vue'
import SailForm from '../Form/index.vue'
export default {
  components: { SailForm },
  setup() {
    const methods = {
      handleOk() {
        Store.isShowModel = false
      },
    }
    return { ...methods, ...toRefs(Store) }
  },
}
</script>

