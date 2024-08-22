<template>
      <div class="app-modal__body">
            <div class="modal">
            <h1>
                  Are your sure you want to delete ?
            </h1>
            <div class="modal_act">
                  <VButton class="btn" type="submit" btn_type="info" @click="$emit('update:modelValue', false)">Cancel</VButton>
                  <VButton class="btn2" type="submit" btn_type="danger" @click="deleteUser">Delete</VButton>
            </div>
            </div>
      </div>
</template>

<script setup>
import VButton from './VButton.vue'

const props = defineProps({
      deleteUser: {
            type: Function
      },
      modalValue: {
            type: Boolean
      }
})
</script>

<style lang="scss" scoped>
.app-modal__body {
      padding: 20px;
      .modal {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      h1 {
            text-align: center;
            margin: 10px 0;
            font-size: 30px;
            font-weight: 500;
      }
      .modal_act{
            margin-top: 30px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            gap: 30px;
            .btn {
                  padding: 15px 50px;
                  border: none;
                  border-radius: 5px;
                  font-size: 18px;
                  color: #12486B;
                  cursor: pointer;
                  font-weight: 500;
            }
            .btn2 {
                  padding: 15px 50px;
                  border: none;
                  border-radius: 5px;
                  font-size: 18px;
                  color: #fff;
                  cursor: pointer;
                  font-weight: 500;
            }
      }
    }
}
</style>