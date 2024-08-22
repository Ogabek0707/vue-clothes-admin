<template>
    <div class="flex flex-col">
          <vee-field :type="type" :name="name" :placeholder="placeholder"  class="py-[17px] px-[14px] pl-[25px] text-[17px] outline-none border-gray-400 border-[1px] rounded-[5px] mt-1.5 hover:border-black focus:border-blue-500"/>
          <ErrorMessage :name="name" class="text-error_color mt-2 mb-[-5px] ml-4 text-[17px] font-medium text-start"/>
    </div>
    <!-- @change="handleFileChange($event)" -->
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    type:{
          type: String,
    },
    name:{
          type: String
    },
    placeholder:{
          type: String
    },
})
// const file = ref(null);

// const handleFileChange = (event) => {
// file.value = event.target.files[0];
// };
</script>

<style lang="scss" scoped>

</style>