<template>
  <div class="h-[75px] bg-[#F9F9F9] border-[#e5e7eb] border-l-0 border-[1px] w-full shadow-[0_4px_10px_rgba(0,0,0,0.12),0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0px_rgba(0,0,0,0.14)] flex justify-between items-center px-[25px] relative">
    <div class="flex gap-[25px]">
      <button @click="isOpen = true"><svg-icon type="mdi" :path="mdiMenu" class="text-[20px] lg:hidden"></svg-icon></button>
      <div>
        <h1 class="text-slate-600 text-[20px] font-light">{{ receivedValue }}</h1>
      </div>
    </div>
      <div class="w-[35px] h-[35px] rounded-[50%] bg-gray-400">
        <h1 class="text-center text-white text-[20px] mt-[2px] font-light cursor-pointer" @click="Profile">M</h1>
      </div>
      <aside :class="isHide ? 'warehouse__user-show' : 'warehouse__user-hide'" class="fixed z-[1000]">
        <div class="ul">
          <div class="hover w-full mt-[12px] cursor-pointer">
            <div class="flex gap-[10px] ml-[10px] items-center li">
              <div class="w-[35px] h-[35px] rounded-[50%] bg-gray-400">
                <svg-icon type="mdi" :path="mdiAccount" class="text-[20px] mt-[3px] ml-[6px] text-white"></svg-icon>
              </div>
              <p class="font-normal">Profile</p>
            </div>
          </div>
          <div class="hover w-full cursor-pointer">
            <div class="flex gap-[10px] mt-[3px] ml-[10px] items-center li">
              <div class="w-[35px] h-[35px] rounded-[50%] bg-gray-400">
                <svg-icon type="mdi" :path="mdiAccount" class="text-[20px] mt-[3px] ml-[6px] text-white"></svg-icon>
              </div>
              <p class="font-normal">My Account</p>
            </div>
          </div>
          <span class="w-full border-[0.5px] border-gray-300 mt-[8px]"></span>
          <div class="hover w-full cursor-pointer">
            <div class="flex gap-[18px] mt-[8px] ml-[14px] items-center li">
              <svg-icon type="mdi" :path="mdiAccountPlus" class="text-[20px] text-gray-400"></svg-icon>
              <p class="font-normal">Add another Account</p>
            </div>
          </div>
          <div class="hover w-full cursor-pointer">
            <div class="flex gap-[15px] mt-[5px] ml-[16px]  items-center li">
              <svg-icon type="mdi" :path="mdiCog" class="text-[20px] text-gray-400"></svg-icon>
              <p class="font-normal">Settings</p>
            </div>
          </div>
          <div class="hover w-full cursor-pointer" @click="LogOut">
            <div class="flex gap-[14px] mt-[5px] ml-[18px] mb-[10px] items-center li">
              <svg-icon type="mdi" :path="mdiLogout" class="text-[20px] text-gray-400"></svg-icon>
              <p class="font-normal">LogOut</p>
            </div>
          </div>
        </div>
      </aside>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { UseSidebar } from '@/hooks/UseSidebar';
import { emitter } from '@/mitt';
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiAccount, mdiAccountPlus, mdiCog, mdiLogout, mdiMenu} from '@mdi/js';
import { useRouter } from 'vue-router';

const receivedValue = ref('Category');
const isHide = ref(false)
const router = useRouter()
const {isOpen} = UseSidebar()

const Profile = () => {
  isHide.value = !isHide.value
}
const LogOut = () => {
  router.push({name: "auth"})
}

const handleReceiveValue = (value) => {
  receivedValue.value = value;
  localStorage.setItem('headerValue', value);
};

onMounted(() => {
  const savedValue = localStorage.getItem('headerValue');
  if (savedValue) {
    receivedValue.value = savedValue;
  }
  emitter.on('send-value', handleReceiveValue);
});

onUnmounted(() => {
  emitter.off('send-value', handleReceiveValue);
});
console.log(receivedValue);
</script>

<style scoped lang="scss">

$bg-color: #fff;
$blue-color: #435EBE;

.hover:hover {
  /* width: 95%; */
  /* padding-left: -50px; */
  background: #ededed;
  border-radius: 10px;
  color: #12486B;
  font-weight: bold;
}
.warehouse__user-hide{
        display: none;
}
      .warehouse__user-show{
        display: block;
        position: absolute;
        top: 105%;
        right: 20px;
        width: 250px;
        /* height: 120px; */
        background-color: #9a9a9a;
        border-radius: 15px;
        box-shadow: 10px 10px 15px rgba(202, 202, 202, 0.5), 
                   -10px -10px 15px rgba(202, 202, 202, 0.5);
        .ul{
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          /* gap: 10px; */
          background-color: $bg-color;
          .li{
            width: 100%;
            text-align: center;
            padding: 5px;
            font-size: 17px;
            transition: all 0.4s linear;
            letter-spacing: 0.4px;
          }
        }
      }
</style>
