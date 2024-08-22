<template>
      <div class="w-full flex flex-col">
            <div class="flex justify-between">
                  <label :for="name" class="forgot-password-label ml-[55%] sm:ml-[60%] md:ml-[61%] lg:ml-[71%] mb-[10px] text-black text-[16px] sm:text-[18px] md:text-[20px] font-[400] text-sky-500 hover:text-sky-700 cursor-pointer" @click="ForgotP">{{ type2 }}</label>
            </div>
            <label :for="name" class="text-black text-start font-[500] text-[18px] ml-[10px] block">{{ label }}</label>
            <div v-if="!type3" class="relative w-full mt-1.5">
                  <vee-field :type="active ? 'text' : 'password'" :name="name" :placeholder="placeholder" class="bg-[#fafafa00] py-[17px] px-[25px] text-[17px] outline-none rounded-[5px] border-gray-400 border-[1px] hover:border-black focus:border-blue-500 w-full pr-[50px]"/>
                  <button type="button" @click="changeType" class="absolute inset-y-0 right-0 pr-[17px] text-[18.5px] rounded-e-lg flex items-center justify-center"><font-awesome-icon :icon="active ? 'eye-slash' : 'eye'" class="text-global4"/></button>
            </div>
            <div v-else class="relative w-full mt-1.5">
                  <vee-field :type="active ? 'text' : 'password'" :name="name" :placeholder="placeholder" class="py-[17px] pl-[25px] pr-[10px] text-[17px] outline-none rounded-[5px] border-gray-400 border-[1px] hover:border-black focus:border-blue-500 w-full"/>
            </div>
            <!-- <p v-if="type3" class="text-[red] mt-2 text-[15px] font-medium">Parolda kamida 1 ta bosh (A...) harf, 1 ta kichik harf (a...), kamida 6 ta son bo'lishi kerak !</p> -->
            <ErrorMessage :name="name" class="text-error_color mt-2 mb-[-5px] text-start ml-4 text-[17px] font-medium"/>
      </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router";
import Notification from "@/plugins/Notification";

const router = useRouter()
const active = ref(false)
const props = defineProps({
      name:{
            type: String
      },
      label:{
            type: String
      },
      placeholder:{
            type: String
      },
      type2:{
            type: String
      },
      type3:{
            type: String
      },
})
const ForgotP = () => {
      // Notification({ text: "You can log in!!!" }, { type: "success" }, { time: "3500" }, { description: "" });
      alert('Therefore, it should not be forgotten : ) ')
}
const changeType = (e) => {
      e.preventDefault();
      
      active.value = !active.value
};
</script>

<style lang="scss" scoped>
@media (max-width: 390px) {
  label {
    margin-left: 45%;
  }
}
</style>