<template>
    <AppModal2 v-model="dialog">
        <h1 class="text-[27px] font-bold text-center mt-[15px]">Add a Product</h1>
            <vee-form :validation-schema="schema" @submit="send" class="w-[70%] text-center m-auto">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <VInput type="number" label="" name="MaxAge" placeholder="Age maximum" class="mt-[10px]"></VInput>
                        <VInput type="number" label="" name="MinAge" placeholder="Age minimum" class="mt-[10px]"></VInput>
                        <VSelect type="text" label="" name="SelectCategory" :item2="store2?.category"/>
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
    <AppModal2 v-model="dialog3">
        <h1 class="text-[27px] font-bold text-center mt-[15px]">Employee Replacement</h1>
        <vee-form :validation-schema="schema2" :initial-values="forms" @submit="send2" class="w-[87%] text-center m-auto">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <VInput type="email" label="Email" name="Email" placeholder="Email" class="mt-[15px]"></VInput>
                <VInput type="text" label="First Name" name="FirstName" placeholder="First Name" class="mt-[10px]"></VInput>
                <VInput type="text" label="Last Name" name="LastName" placeholder="Last Name" class="mt-[10px]"></VInput>
                <VGender name="Gender" label="Gender" />
              </div>
              <div>
                <VPassword type="password" label="Password" name="Password" placeholder="Parol kiriting" class="mt-[5px]" type3="pass"></VPassword>
                <VInput type="text" label="Phone" name="Phone" placeholder="Phone Number" class="mt-[10px]"></VInput>
                <VInput type="number" label="Age" name="Age" placeholder="Age" class="mt-[10px]"></VInput>
                <VInput type="text" label="Id" name="Id" placeholder="Id" class="mt-[10px]"></VInput>
              </div>
            </div>
            <VButton type="submit" btn_type="primary" class="bg-global1 text-[17px] w-[100%] text-center mt-[15px] mb-[20px] py-[15px]" :isLoading="loading">{{ btn_title2 }}</VButton>
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
import { ref, computed } from 'vue';
import { useCategoryStore } from '../../stores/Category'
import { useProductStore } from '@/stores/Product';
import AppModal2 from '@/components/ui/app-modal2.vue';
import AppModal from '@/components/ui/app-modal.vue';
import VInput from '@/components/form/VInput.vue';
import VPassword from '@/components/form/VPassword.vue';
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
const store = useProductStore()
const store2 = useCategoryStore()
const product_id = ref('')

const params = {
    page: 1,
    limit: 99999,
}
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
    };
    console.log(payload);
    await store.addProduct(payload);
};


const send2 = async (value) => {
    loading.value = true
    const formData = new FormData();
    formData.append('file', value.Media);
    await store.uploadMedia(formData,product_id.value)
    loading.value = false
}
const btn_title = computed(()=>{
      if(loading.value) {
        return "Adding"
      }else {
        return "Add"
      }
})
const btn_title2 = computed(()=>{
      if(loading.value) {
        return "Media Uploading"
      }else {
        return "Media Upload"
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
    store2.getCategory(params)
    dialog.value = true
    console.log(store2.category);
}
defineExpose({openModal,openModalDelete,openModalMedia});
</script>

<style lang="scss" scoped>

</style>