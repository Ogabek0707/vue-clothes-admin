<template>
    <div class="w-full h-[77vh] flex justify-center gap-[50px] mt-[110px]">
       <div>
        <div class="relative">
    <!-- Fullscreen Modal -->
    <div
      v-if="isFullscreen"
      class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
    >
      <!-- Fullscreen Container -->
      <div class="relative flex items-center w-full h-full">
        <!-- Fullscreen Thumbnails -->
        <div class="absolute top-0 left-0 h-full flex flex-col items-start space-y-2 p-2 bg-black bg-opacity-70">
          <div
            v-for="(image, index) in images"
            :key="index"
            @click="setFullscreenActiveIndex(index)"
            :class="{'border-4 border-blue-500': index === fullscreenActiveIndex}"
            class="cursor-pointer mb-2"
          >
            <img :src="image.src" :alt="image.alt" class="w-20 h-auto"/>
          </div>
        </div>

        <!-- Fullscreen Image -->
        <div class="flex-1 flex justify-center items-center relative">
          <img
            v-if="images[fullscreenActiveIndex]"
            :src="images[fullscreenActiveIndex].src"
            :alt="images[fullscreenActiveIndex].alt"
            class="object-contain h-[100vh] max-w-full"
          />
          <!-- Navigation Buttons -->
          <button @click="prevImage" class="absolute left-[175px] top-1/2 transform -translate-y-1/2 text-blue-500 p-2 rounded"><svg-icon class="w-[80px] h-[80px]" type="mdi" :path="mdiChevronLeft"></svg-icon></button>
          <button @click="nextImage" class="absolute right-[175px] top-1/2 transform -translate-y-1/2 text-blue-500 p-2 rounded"><svg-icon class="w-[80px] h-[80px]" type="mdi" :path="mdiChevronRight"></svg-icon></button>
          <!-- Close Button -->
          <button @click="closeFullscreen" class="absolute bottom-7 right-[190px] text-blue-500 text-xl"><svg-icon class="w-[40px] h-[40px]" type="mdi" :path="mdiFullscreenExit"></svg-icon></button>
        </div>
      </div>
    </div>

<!-- Main Image and Thumbnail Navigation -->
<div :class="{'hidden': isFullscreen, 'flex': !isFullscreen}" class="w-[600px] relative">
  <!-- Thumbnails -->
  <div class="flex flex-col space-y-2">
    <div
      v-for="(image, index) in images"
      :key="index"
      @click="setActiveIndex(index)"
      :class="{'border-4 border-blue-500': index === activeIndex}"
      class="cursor-pointer"
    >
      <img :src="image.src" :alt="image.alt" class="w-20 h-auto"/>
    </div>
  </div>

  <!-- Main Image -->
  <div class="flex-1 flex items-start left-[10px] h-full relative">
    <img
      v-if="images[activeIndex]"
      :src="images[activeIndex].src"
      :alt="images[activeIndex].alt"
      class="w-[490px] h-auto cursor-pointer"
      @click="openFullscreen"
    />
    <!-- Navigation Buttons -->
    <button @click="prevImage" class="absolute top-1/2 left-[5%] transform -translate-y-1/2">
      <svg-icon class="w-[80px] h-[80px] text-blue-500" type="mdi" :path="mdiChevronLeft"></svg-icon>
    </button>
    <button @click="nextImage" class="absolute top-1/2 right-[5%] transform -translate-y-1/2">
      <svg-icon class="w-[80px] h-[80px] text-blue-500" type="mdi" :path="mdiChevronRight"></svg-icon>
    </button>
    <!-- Fullscreen Button -->
    <button @click="openFullscreen" class="absolute bottom-[5%] right-[5%] p-2 rounded-full">
      <svg-icon class="w-[40px] h-[40px] text-blue-500" type="mdi" :path="mdiFullscreen"></svg-icon>
    </button>
  </div>
</div>

  </div>
</div>
        <div>
            <div class="max-w-[522px]">
                <h1 class="text-black text-center font-semibold text-[24px]">{{ product.product_name }}</h1>
                <h1 class="text-slate-600 text-[20px] mt-[10px]"><span class="font-bold ">Description : </span>{{ product.description }}</h1>
                <h1 class="text-slate-600 text-[20px] mt-[4px]">Made in : <span class="font-bold">{{ product.made_in }}</span></h1>
                <h1 class="text-slate-600 text-[20px] mt-[4px]">Color : <span class="font-bold">{{ product.color ? product.color.join(', ') : '' }}</span></h1>
                <h1 class="text-slate-600 text-[20px] mt-[4px]">Size : <span class="font-bold ">{{ product.size ? product.size.join(', ') : '' }}</span></h1>
                <h1 class="text-slate-600 text-[20px] mt-[4px]">Count : <span class="font-bold ">{{ product.count }}</span></h1>
                <h1 class="text-slate-600 text-[20px] mt-[4px]">Cost : <span class="font-bold ">{{ product.cost }}</span></h1>
                <h1 class="text-slate-600 text-[20px] mt-[4px]">Discount : <span class="font-bold ">{{ product.discount }}%</span></h1>
                <h1 class="text-slate-600 text-[20px] mt-[4px]">Age Range : <span class="font-bold ">{{ product.age_min }} - {{ product.age_max }}</span></h1>
                <h1 class="text-slate-600 text-[20px] mt-[4px]">For Gender : <span class="font-bold ">{{ product.for_gender }}</span></h1>
            </div>
            <!-- :modal_value=""  -->
            <ProductViewM ref="productViewM"/>
            <VActions :item="product" :modal_value="productViewM" type2="type" class="ml-[100px]"/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronLeft, mdiChevronRight, mdiFullscreen, mdiFullscreenExit } from '@mdi/js';
import { useProductViewStore } from '@/stores/ProductView';
import { size } from '@vee-validate/rules';
import VActions from '@/components/form/VActions.vue';
import ProductViewM from '../Modals/ProductViewM.vue';

const route = useRoute()
const store = useProductViewStore()
const product = computed(() => store.product)
const productViewM = ref('')
watch(product, (newVal) => {
  console.log(newVal)
});

const images = computed(() => {
  if (!product.value || !product.value.image_url) return [];
  return product.value.image_url.map(src => ({ src, alt: `Image ${src}` }));
});
const activeIndex = ref(0);
const isFullscreen = ref(false);
const fullscreenActiveIndex = ref(0);



const openFullscreen = () => {
  fullscreenActiveIndex.value = activeIndex.value;
  isFullscreen.value = true;
};

const closeFullscreen = () => {
  isFullscreen.value = false;
};

const nextImage = () => {
  if (isFullscreen.value) {
    fullscreenActiveIndex.value = (fullscreenActiveIndex.value + 1) % images.value.length;
  } else {
    activeIndex.value = (activeIndex.value + 1) % images.value.length;
  }
};

const prevImage = () => {
  if (isFullscreen.value) {
    fullscreenActiveIndex.value = (fullscreenActiveIndex.value - 1 + images.value.length) % images.value.length;
  } else {
    activeIndex.value = (activeIndex.value - 1 + images.value.length) % images.value.length;
  }
};

const setActiveIndex = (index) => {
  activeIndex.value = index;
};

const setFullscreenActiveIndex = (index) => {
  fullscreenActiveIndex.value = index;
};
onMounted( () => {
    store.getProductView(route.params.id)
});
</script>

<style lang="scss" scoped>
.gallery-container {
  max-width: 490px;
  margin: auto;
}
</style>