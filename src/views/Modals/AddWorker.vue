<template>
    <AppModal3 v-model="dialog">
        <h1 class="text-[27px] font-bold text-center mt-[15px]">Add a worker</h1>
            <vee-form :validation-schema="schema" @submit="send" class="w-[70%] text-center m-auto">
                <VInput type="email" label="" name="Email" placeholder="Email" class="mt-[10px]"></VInput>
                <VInput type="number" label="" name="Age" placeholder="Age" class="mt-[10px]"></VInput>
                <VInput type="text" label="" name="FirstName" placeholder="First Name" class="mt-[10px]"></VInput>
                <VInput type="text" label="" name="LastName" placeholder="Last Name" class="mt-[10px]"></VInput>
                <VGender name="Gender" class="mt-[10px] flex justify-center"/>
                <VPassword type="password" label="" name="Password" placeholder="Parol kiriting" type3="pass"></VPassword>
                <VTell type="text" label="" name="Phone" mask="+998 (##) ### ## ##" placeholder="Phone number" class="mt-[10px]"></VTell>
                <VButton type="submit" btn_type="primary" class="bg-global1 text-[17px] w-[100%] text-center mt-[15px] mb-[20px] py-[15px]" :isLoading="loading" @click="send">{{ btn_title }}</VButton>
            </vee-form>
    </AppModal3>
    <AppModal2 v-model="dialog3">
        <h1 class="text-[27px] font-bold text-center mt-[15px]">Employee Replacement</h1>
        <vee-form :validation-schema="schema2" :initial-values="forms" @submit="send2" class="w-[87%] text-center m-auto media2">
            <div class="grid grid-cols-2 gap-4 media">
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
        <VDelete v-model="dialog2" :deleteUser="DeleteW"/>
    </AppModal>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useWorkerStore } from '@/stores/Worker';
import AppModal2 from '@/components/ui/app-modal2.vue';
import AppModal from '@/components/ui/app-modal.vue';
import VInput from '@/components/form/VInput.vue';
import VTell from '@/components/form/VTell.vue';
import VPassword from '@/components/form/VPassword.vue';
import VGender from '@/components/form/VGender.vue';
import VButton from '@/components/form/VButton.vue';
import VDelete from '@/components/form/VDelete.vue';
import AppModal3 from '@/components/ui/app-modal3.vue';

const dialog = ref(false)
const dialog2 = ref(false)
const dialog3 = ref(false)
const loading = ref(false)
const store = useWorkerStore()
const worker = ref('')

let forms = ref({
    Email: '',
    Age: '',
    Phone: '',
    Gender: '',
    Password: '',
    FirstName: '',
    LastName: '',
    Id: '',
})
const schema = computed(()=>{
  return {
    Email: 'required|min:0|max:50',
    Age: 'required|min:0|max:15',
    Phone: 'required|min:0|max:20',
    Gender: 'required|min:0|max:15',
    Password: 'required|min:0|max:15',
    FirstName: 'required|min:0|max:15',
    LastName: 'required|min:0|max:15',
  }
})
const schema2 = computed(()=>{
  return {
    Email: 'required|min:0|max:50',
    Age: 'required|min:0|max:15',
    Phone: 'required|min:0|max:20',
    Gender: 'required|min:0|max:15',
    Password: 'required|min:0|max:15',
    FirstName: 'required|min:0|max:15',
    LastName: 'required|min:0|max:15',
    Id: 'required|min:0|max:1000',
  }
})
const send = async (value) => {
    let phone = value.Phone.replace(/[^\d]/g, '')
    console.log(phone);
    loading.value = true
        let payload = {
            email: value.Email,
            age: value.Age,
            first_name: value.FirstName,
            last_name: value.LastName,
            gender: value.Gender,
            password: value.Password,
            phone_number: phone
        }
        await store.addWorker(payload)
    loading.value = false
}
const send2 = async (value) => {
    loading.value = true
        let payload = {
            email: value.Email,
            age: value.Age,
            first_name: value.FirstName,
            last_name: value.LastName,
            gender: value.Gender,
            password: value.Password,
            phone_number: value.Phone,
            id: value.Id
        }
        await store.editWorker(payload)
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
        return "Changing"
      }else {
        return "Replacement"
      }
})
watch(dialog, (value) => {
    if(!value) {
        forms.value = {}
    }
})
const DeleteW = async () => {
    await store.deleteWorker(worker.value)
}
const openModalDelete = (item) => {
    worker.value = item.id
    console.log(item);
    dialog2.value = true
}
const openModal = (item) => {
    console.log(item);
    if(item){
        forms.value.Email = item.email,
        forms.value.Age = item.age,
        forms.value.Phone = item.phone_number,
        forms.value.Gender = item.gender,
        forms.value.FirstName = item.first_name,
        forms.value.LastName = item.last_name,
        forms.value.Id = item.id
        dialog3.value = true
    }else{
        dialog.value = true
    }
}
defineExpose({openModal,openModalDelete});
</script>

<style lang="scss" scoped>
@media (max-width: 800px) {
  .media {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
    align-items: center;
    div {
      width: 90%;
    }
  }
}
</style>