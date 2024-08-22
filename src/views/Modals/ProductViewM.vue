<template>
    <AppModal2 v-model="dialog">
        <h1 class="text-[27px] font-bold text-center mt-[15px]">Edit a Product</h1>
            <vee-form :validation-schema="schema" :initial-values="forms" @submit="send" class="w-[70%] text-center m-auto">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <VInput type="number" label="" name="MaxAge" placeholder="Age maximum" class="mt-[10px]"></VInput>
                        <VInput type="number" label="" name="MinAge" placeholder="Age minimum" class="mt-[10px]"></VInput>
                        <VSelect type="text" label="" name="SelectCategory" :item2="store3?.category"/>
                        <VInput type="text" label="" name="Color" placeholder="Color" class="mt-[10px]"></VInput>
                        <VInput type="number" label="" name="Cost" placeholder="Cost" class="mt-[10px]"></VInput>
                    </div>
                    <div>
                        <VInput type="number" label="" name="Count" placeholder="Count" class="mt-[10px]"></VInput>
                        <VInput type="number" label="" name="Discount" placeholder="Discount" class="mt-[10px]"></VInput>
                        <VSelect type="text" label="" name="SelectCountry"/>
                        <div class="mt-[35px] ml-[20px]">
                            <VGender name="Gender"/>
                        </div>
                        <VInput type="text" label="" name="Size" placeholder="Size" class="mt-[28px]"></VInput>
                    </div>
                </div>
                <VInput type="text" label="" name="ProductName" placeholder="Product Name" class="mt-[10px]"></VInput>
                <VInput type="text" label="" name="Description" placeholder="Description" class="mt-[10px]"></VInput>
                <VButton type="submit" btn_type="primary" class="bg-global1 text-[17px] w-[100%] text-center mt-[15px] mb-[20px] py-[15px]" :isLoading="loading" @click="send">{{ btn_title }}</VButton>
            </vee-form>
    </AppModal2>
    <AppModal v-model="dialog2">
        <VDelete v-model="dialog2" :deleteUser="DeleteP"/>
    </AppModal>
    <AppModal v-model="dialog4">
        <h1 class="text-[27px] font-bold text-center my-[15px]">Media Upload</h1>
        <vee-form :validation-schema="schema3" @submit="send2" class="w-[87%] text-center m-auto">
            <VFile type="file" label="" name="Media" placeholder="File"></VFile>
            <VButton type="submit" btn_type="primary" class="bg-global1 text-[17px] w-[100%] text-center mt-[15px] mb-[20px] py-[15px]" :isLoading="loading">{{ btn_title2 }}</VButton>
        </vee-form>

    </AppModal>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useProductViewStore } from '@/stores/ProductView';
import { useProductStore } from '@/stores/Product';
import { useCategoryStore } from '@/stores/Category';
import AppModal2 from '@/components/ui/app-modal2.vue';
import AppModal from '@/components/ui/app-modal.vue';
import VInput from '@/components/form/VInput.vue';
import VSelect from '@/components/form/VSelect.vue';
import VGender from '@/components/form/VGender.vue';
import VButton from '@/components/form/VButton.vue';
import VDelete from '@/components/form/VDelete.vue';
import VFile from '@/components/form/VFile.vue';

const dialog = ref(false)
const dialog2 = ref(false)
const dialog3 = ref(false)
const dialog4 = ref(false)
const loading = ref(false)
const store = useProductViewStore()
const store2 = useProductStore()
const store3 = useCategoryStore()
const product_id = ref('')

const params = {
    page: 1,
    limit: 99999,
}
let forms = ref({
    MaxAge: '',
    MinAge: '',
    SelectCategory: '',
    Cost: '',
    Count: '',
    Discount: '',
    SelectCountry: '',
    Gender: '',
    ProductName: '',
    Description: '',
})

const schema = computed(()=>{
  return {
    MaxAge: 'required|min:0|max:2',
    MinAge: 'required|min:0|max:2',
    Color: 'required|min:0',
    Cost: 'required|min:0|max:15',
    Count: 'required|min:0|max:15',
    Discount: 'required|min:0|max:2',
    Size: 'required|min:0|validSize',
    ProductName: 'required|min:0|max:15',
    Description: 'required|min:0',
    SelectCategory: 'required|min:0|max:100',
    SelectCountry: 'required|min:0|max:100',
  }
})
const schema3 = computed(()=>{
  return {
    Media: 'required'
  }
})
const send = async (value) => {
    let payload = {
        age_max: value.MaxAge,
        age_min: value.MinAge,
        cost: value.Cost,
        count: value.Count,
        description: value.Description,
        discount: value.Discount,
        for_gender: value.Gender,
        product_name: value.ProductName,
        size: value.Size.split(',').map(size => size.trim()),
        color: value.Color.split(',').map(color => color.trim()), 
        category_id: value.SelectCategory,
        made_in: value.SelectCountry,
        product_id: product_id.value,
    };
    console.log(payload);
    await store.editProduct(payload);
};


const send2 = async (value) => {
    loading.value = true
    const formData = new FormData();
    formData.append('file', value.Media);
    await store2.uploadMedia(formData,product_id.value)
    loading.value = false
}

const btn_title = computed(()=>{
      if(loading.value) {
        return "Editing"
      }else {
        return "Edit"
      }
})

const btn_title2 = computed(()=>{
      if(loading.value) {
        return "Media Uploading"
      }else {
        return "Media Upload"
      }
})

watch(dialog, (value) => {
    if(!value) {
        forms.value = {}
    }
})
const DeleteP = async () => {
    await store.deleteProduct(product_id.value)
}
const openModalMedia = (id) => {
    product_id.value = id
    dialog4.value = true
}
const openModalDelete = (item) => {
    product_id.value = item.product_id
    dialog2.value = true
}
const openModal = (item) => {
    console.log(item);
    if(item){
        forms.value.MaxAge = item.age_max,
        forms.value.MinAge = item.age_min,
        forms.value.SelectCategory = item.category,
        forms.value.Cost = item.cost,
        forms.value.Count = item.count,
        forms.value.Discount = item.discount,
        forms.value.SelectCountry = item.made_in,
        forms.value.Gender = item.for_gender,
        forms.value.ProductName = item.product_name,
        forms.value.Description = item.description,
        product_id.value = item.product_id
        dialog.value = true
    }
}
onMounted( () => {
    store3.getCategory(params)
});
defineExpose({openModal,openModalDelete,openModalMedia});
</script>

<style lang="scss" scoped>

</style>