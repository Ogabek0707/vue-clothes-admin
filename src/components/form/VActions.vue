<template>
      <div v-if="!type && !type2" class="w-full flex items-center justify-center">
            <svg-icon type="mdi" class="mr-[10px] cursor-pointer text-[#00aaff]" :path="mdiPencil" @click="openModalEdit"></svg-icon>
            <svg-icon type="mdi" class="ml-[10px] cursor-pointer text-[#f52f2f]" :path="mdiDelete" @click="openModalDelete"></svg-icon>
      </div>
      <div v-else-if="type" class="w-full flex items-center justify-center">
            <svg-icon type="mdi" class="mr-[10px] cursor-pointer text-[#00aaff]" :path="mdiEye" @click="openModalView"></svg-icon>
            <svg class="w-6 h-6 mr-[10px] cursor-pointer fill-green-600" focusable="false" aria-hidden="true" @click="openModalMedia" viewBox="0 0 24 24" data-testid="AddPhotoAlternateIcon"><path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8zM5 19l3-4 2 3 3-4 4 5z"></path></svg>
            <svg-icon type="mdi" class=" cursor-pointer text-[#f52f2f]" :path="mdiDelete" @click="openModalDelete"></svg-icon>
      </div>
      <div v-if="type2" class="flex ml-[370px]">
            <svg-icon type="mdi" class="w-[30px] h-[30px] mr-[10px] cursor-pointer text-[#00aaff]" :path="mdiPencil" @click="openModalEdit"></svg-icon>
            <svg class="w-[30px] h-[30px] mr-[10px] cursor-pointer fill-green-600" focusable="false" aria-hidden="true" @click="openModalMedia" viewBox="0 0 24 24" data-testid="AddPhotoAlternateIcon"><path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8zM5 19l3-4 2 3 3-4 4 5z"></path></svg>
            <svg-icon type="mdi" class="w-[30px] h-[30px] cursor-pointer text-[#f52f2f]" :path="mdiDelete" @click="openModalDelete"></svg-icon>
      </div>
</template>

<script setup>
import { mdiPencil, mdiDelete, mdiEye } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon'
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
      item: {
            type: Object
      },
      modal_value: {
            type: String
      },
      type: {
            type: String
      },
      type2: {
            type: String
      }
})
const openModalMedia = () => {
      props.modal_value.openModalMedia(props.item.product_id)
}
const openModalView = () => {
      router.push({name: "Product-View", params: {'id': props.item.product_id} })
}
const openModalEdit = () => {
      props.modal_value.openModal(props.item)
}
const openModalDelete = () => {
      props.modal_value.openModalDelete(props.item)
}
</script>

<style lang="scss" scoped>

</style>
