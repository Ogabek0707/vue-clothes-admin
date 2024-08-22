<template>
  <div class="w-full h-[100vh]">
    <div
      class="w-full h-full bg-cover bg-center bg-fixed"
      style="background-image: url('/src/assets/images/depositphotos_221398246-stock-illustration-interior-background-luxury-men-clothing.jpg');"
    >
      <div class="flex justify-center h-screen items-center">
        <div class="login-container bg-[#fafafad9] rounded-tl-[30px] rounded-br-[30px] px-8 sm:px-16 md:px-20 py-10">
          <h1 class="text-[32px] sm:text-[48px] md:text-[56px] font-bold text-center mt-[5px] mb-1.5">Log in</h1>
          <vee-form :validation-schema="schema" @submit="send" class="mt-[20px]">
            <VInput type="email" color="color" label="" name="email" placeholder="Email kiriting"></VInput>
            <VPassword
              type="password"
              label=""
              name="password"
              placeholder="Parol kiriting"
              type2="Forgot Password?"
              class="mt-[15px]"
            ></VPassword>
            <VButton
              type="submit"
              btn_type="primary"
              class="bg-global1 w-[100%] mt-[25px] py-[15px]"
              :isLoading="loading"
              >{{ btn_title }}</VButton
            >
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import VInput from "../../components/form/VInput.vue";
import VPassword from "../../components/form/VPassword.vue";
import VButton from "../../components/form/VButton.vue";
import { useAuthStore } from "../../stores/auth";

const router = useRouter();
const loading = ref(false);
const store = useAuthStore();
const schema = computed(() => {
  return {
    password: "required|min:6|max:15",
    email: "required|min:3|max:40",
  };
});
const send = async (value) => {
  loading.value = true;
  let payload = {
    email: value.email,
    password: value.password,
  };
  await store.authLogin(payload);
  loading.value = false;
};
const btn_title = computed(() => {
  if (loading.value) {
    return "Loading";
  } else {
    return "SUBMIT";
  }
});
const ForgotP = () => {
  router.push({ name: "Forgot-Password" });
};
</script>

<style lang="scss" scoped>
.login-container {
  width: 90%;
  max-width: 400px;
}

@media (min-width: 640px) {
  .login-container {
    max-width: 500px;
  }
}

@media (min-width: 768px) {
  .login-container {
    max-width: 600px;
  }
}

@media (min-width: 1024px) {
  .login-container {
    max-width: 700px;
  }
}
</style>
