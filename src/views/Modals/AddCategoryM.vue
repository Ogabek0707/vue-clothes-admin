<template>
    <AppModal v-model="dialog">
        <h1 v-if="forms.category_name" class="text-[27px] font-bold text-center mt-[15px]">Edit a category</h1>
        <h1 v-else class="text-[27px] font-bold text-center mt-[15px]">Add a category</h1>
            <vee-form :validation-schema="schema" :initial-values="forms" @submit="send" class="w-[75%] text-center m-auto">
                <VInput type="text" color="color" label="" name="Name" placeholder="Category name" class="mt-[20px]"></VInput>
                <VButton type="submit" btn_type="primary" class="bg-global1 text-[17px] w-[100%] text-center mt-[25px] mb-[20px] py-[15px]" :isLoading="loading">{{ btn_title }}</VButton>
            </vee-form>
    </AppModal>
    <AppModal v-model="dialog2">
        <VDelete v-model="dialog2" :deleteUser="DeleteC"/>
    </AppModal>
</template>

<script setup>
import AppModal from '@/components/ui/app-modal.vue';
import { ref, computed, watch } from 'vue';
import { useCategoryStore } from '@/stores/Category';
import VInput from '@/components/form/VInput.vue';
import VButton from '@/components/form/VButton.vue';
import VDelete from '@/components/form/VDelete.vue';

const dialog = ref(false)
const dialog2 = ref(false)
const loading = ref(false)
const store = useCategoryStore()
const category = ref('')

let forms = ref({
    Name: '',
    category_id: ''
})
const schema = computed(()=>{
  return {
    Name: 'required|min:0|max:15',
  }
})
const send = async (value) => {
    loading.value = true
    if(!forms.value.Name) {
        let payload = {
            category_name: value.Name,
        }
        await store.addCategory(payload)
    }else {
        let payload = {
            category_name: value.Name,
            category_id: value.category_id,
        }
        await store.editCategory(payload)
    }
    loading.value = false
}

const btn_title = computed(()=>{
      if(loading.value) {
            if(forms.value.category_name){
                return "Changing"
            }else {
                return "Adding"
            }
      }else {
            if(forms.value.category_name){
                return "Change"
            }else {
                return "To Add"
            }
      }
})
watch(dialog, (value) => {
    if(!value) {
        forms.value = {}
    }
})
const DeleteC = async () => {
    await store.deleteCategory(category.value)
}
const openModalDelete = (item) => {
    category.value = item.category_id
    console.log(item);
    dialog2.value = true
}
const openModal = (item) => {
    console.log(item);
    if(item){
        forms.value = {...item},
        forms.value.Name = item.category_name
    }
    dialog.value = true
}
defineExpose({openModal,openModalDelete})
</script>

<style lang="scss" scoped>

</style>