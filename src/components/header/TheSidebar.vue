<template>
  <div :class="isOpen ? 'block' : 'hidden'" @click="isOpen = false" class="fixed inset-0 z-0 transition-opacity opacity-50 lg:hidden" style="background: rgba(0, 16.81, 19.13, 0.50)"></div>
    <div :class="isOpen ? 'translate-x-0' : '-translate-x-full'" class="w-[222px] fixed left-0   z-20 overflow-y-auto inset-y-0 transition duration-300 transform media  lg:translate-x-0 lg:static bg-[#F9F9F9]">
      <div class="flex items-center justify-center bg-white">
      <div class="text-[20px] img">
        <img class="w-[130px] h-[75px] object-cover object-center bg-no-repeat bg-center" 
             src="../../assets/images/Clothing.jpg" 
             alt="">
      </div>
    </div>
    <hr>
        <div class="mt-[20px] w-full">
        <router-link
          v-for="(item, index) in AdminMenu"
          :key="index"
          :to="item.path"
          class="media2 flex w-full items-center gap-[10px] text-black font-medium hover"
          active-class="active"
          @click="send(item.name)"
        >
          <SvgIcon type="mdi" :path="item.icon" class="icon"/>
          <span class="disp">{{ item.label }}</span>
        </router-link>
      </div>
      </div>
</template>

<script setup>
import SvgIcon from "@jamescoyle/vue-icon";
import { ref, onMounted } from "vue";
import { AdminMenu } from "../menu/AdminMenu";
import { emitter } from "@/mitt";
import { UseSidebar } from "@/hooks/UseSidebar";

const { isOpen, toggleSidebar } = UseSidebar();
const windowWidth = ref(window.innerWidth);

// Watch for window resize events
window.addEventListener('resize', () => {
  windowWidth.value = window.innerWidth;
});

const send = (value) => {
  localStorage.setItem('sidebarValue', value);
  emitter.emit('send-value', value);
}

onMounted(() => {
  const savedValue = localStorage.getItem('sidebarValue');
  if (savedValue) {
    emitter.emit('send-value', savedValue);
  }
});
</script>

<style lang="scss" scoped>
.sidebar {
  width: 240px;
  height: 100%;
  border-right: 1px solid #e5e5e5;
  overflow-y: auto;
  transform: translateX(0);
  background-color: rgb(239, 239, 239);
}

.hover {
  width: 90%;
  height: 50px;
  margin-top: 10px;
  padding-left: 10px;
  margin-left: 10px;
}

.active {
  background: #2389DA;
  color: white;
  border-radius: 10px;
  height: 50px;
}

.hover:hover {
  background: #ededed;
  border-radius: 10px;
  color: #12486B;
  font-weight: bold;
}

.active:hover {
  background: #2389DA;
  color: white;
}
</style>
