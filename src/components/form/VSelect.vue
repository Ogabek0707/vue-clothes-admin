<template>
    <div v-if="item2" class="flex flex-col">
      <label :for="name" class="text-black text-start font-[500] text-[18px] ml-[10px] block">{{ label }}</label>
      <vee-field :name="name" v-slot="{ field }">
        <select v-bind="field" class="text-gray-700 mt-[10px] w-full bg-[#fafafa00] py-[17px] px-[10px] pl-[25px] text-[17px] outline-none border-gray-400 border-[1px] rounded-[5px] hover:border-black focus:border-blue-500" @change="SendId(field.value)">
          <option value="" disabled hidden class="text-gray-700">Select Category</option>
          <option v-for="(item, index) in store.category" :key="index" :value="item.category_id">
            {{ item.category_name }}
          </option>
        </select>
      </vee-field>
      <ErrorMessage :name="name" class="text-error_color mt-2 mb-[-5px] ml-4 text-[17px] font-medium text-start"/>
    </div>
    <div v-else class="flex flex-col">
      <label :for="name" class="text-black text-start font-[500] text-[18px] ml-[10px] block">{{ label }}</label>
      <vee-field :name="name" v-slot="{ field }">
        <select v-bind="field" class="text-gray-700 mt-[10px] w-full bg-[#fafafa00] py-[17px] px-[14px] pl-[25px] text-[17px] outline-none border-gray-400 border-[1px] rounded-[5px] hover:border-black focus:border-blue-500" @change="SendId(field.value)">
            <option value="" disabled hidden class="text-gray-700">Select Country</option>
            <option value="Uzbekistan">Uzbekistan</option>
            <option value="China">China</option>
            <option value="Turkey">Turkey</option>
        </select>
      </vee-field>
      <ErrorMessage :name="name" class="text-error_color mt-2 mb-[-5px] ml-4 text-[17px] font-medium text-start"/>
    </div>
  </template>
  
  <script setup>
  import { useCategoryStore } from '@/stores/Category';
  import { ref } from 'vue';

  const store = useCategoryStore()

  const props = defineProps({
    type: {
      type: String,
    },
    name: {
      type: String
    },
    label: {
      type: String
    },
    placeholder: {
      type: String
    },
    item2: {
        type: Array
    }
  })
  
  const selectedCategoryId = ref("");
  const SendId = (value) => {
    selectedCategoryId.value = value;
    // Here you can send selectedCategoryId to your backend or other logic
  }
  </script>
  
  <style lang="scss" scoped>
  /* Add your custom styles here */
  </style>
  