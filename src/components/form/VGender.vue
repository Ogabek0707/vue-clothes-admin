<template>
    <div class="mt-[10px]">
        <label :for="name" class="text-black text-start font-[500] text-[18px] ml-[10px] block">{{ label }}</label>
    </div>
    <div class="flex items-center space-x-4 mt-[12px]">
        <div class="flex items-center">
            <vee-field id="Male" type="radio" :name="name" value="Male" class="form-radio h-5 w-5 text-blue-500" />
            <label for="Male" class="ml-2 text-gray-700">Male</label>
        </div>
        <div class="flex items-center">
            <vee-field id="Female" type="radio" :name="name" value="Female" class="form-radio h-5 w-5 text-pink-500" />
            <label for="Female" class="ml-2 text-gray-700">Female</label>
        </div>
    </div>
    <!-- <ErrorMessage :name="name" class="text-error_color mt-2 mb-[-5px] ml-4 text-[17px] font-medium text-start"/> -->
</template>

<script setup>
const props = defineProps({
    name:{
        type: String
    },
    label: {
        type: String
    }
});
</script>

<style lang="scss" scoped>

</style>