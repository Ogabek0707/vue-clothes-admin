<template>
      <div class="flex relative w-[400px]">
          <vee-field 
              :type="type" 
              :name="name" 
              :placeholder="placeholder" 
              class="w-full bg-[#fafafa00] py-[10px] pl-[15px] text-[17px] outline-none rounded-[5px] border focus:border-blue-500 shadow-[0_4px_10px_rgba(0,0,0,0.12),0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0px_rgba(0,0,0,0.14)]"
              v-model="modelValue"
          />
          <button 
              type="button" 
              class="absolute inset-y-0 right-0 pr-[15px] pt-[5px] text-[18.5px] rounded-e-lg flex items-center justify-center"
          >
              <svg-icon type="mdi" :path="mdiMagnify" class="text-global4"></svg-icon>
          </button>
      </div>
  </template>
  
  <script setup>
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiMagnify } from '@mdi/js';
  import { ref, defineEmits, defineProps, watch } from 'vue';
  
  const props = defineProps({
      type: String,
      name: String,
      placeholder: String
  });
  
  const emit = defineEmits(['update:modelValue']);
  const modelValue = ref('');
  
  const updateValue = (value) => {
      emit('update:modelValue', value);
  };
  
  watch(modelValue, updateValue);
  </script>
  
  <style lang="scss" scoped>
  /* Your styles here */
  </style>
  