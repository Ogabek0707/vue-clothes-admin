<template>
      <div class="w-full flex h-screen">
            <div class="media bg-[#F9F9F9]">
                  <TheSidebarVue/>
            </div>
            <div class="media2 w-full flex flex-col">
              <div>
                  <TheHeaderVue/>
              </div>
              <div class="overflow-y-scroll">
                  <router-view></router-view>
              </div>
            </div>
      </div>
</template>

<script setup>
import TheHeaderVue from "../components/header/TheHeader.vue";
import TheSidebarVue from "../components/header/TheSidebar.vue";

</script>

<style scoped>

</style>