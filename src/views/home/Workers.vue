<template>
    <div>
        <AddWorkerM ref="addWorker"/>
        <div class="flex justify-end mt-[35px] mb-[5px] mr-[10px]">
            <VButton type="submit" btn_type="primary" class="bg-global1 px-6 py-2" @click="AddWorker">Add a Worker</VButton>
        </div>
        <AppTable :headers="headers" :body="store?.worker">
            <template #body_check>
                <input id="checkbox" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
            </template>
            <template #body_action="{item}">
                    <VActions :item="item" :modal_value="addWorker"/>
            </template>
            <template #body_index="{index}">
                <span>{{ (params.page - 1) * params.limit + index + 1 }}</span>
            </template>
        </AppTable>
        <div class="flex justify-center my-[10px]">
            <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getWorker"/>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import AppTable from '../../components/ui/app-table.vue';
import VPagination from '@hennge/vue3-pagination'
import { useWorkerStore } from '../../stores/Worker'
import VButton from '@/components/form/VButton.vue';
import VActions from '@/components/form/VActions.vue';
import AddWorkerM from '../Modals/AddWorker.vue';

const store = useWorkerStore()
const addWorker = ref('')
const params = {
    page: 1,
    limit: 8,
    last_page: null
}
const headers = ref([
    {title: '', value: 'check'},
    {title: 'S/N', value: 'index'},
    {title: 'First Name', value: 'first_name'},
    {title: 'Last Name', value: 'last_name'},
    {title: 'Gender', value: 'gender'},
    {title: 'Age', value: 'age'},
    {title: 'Action', value: 'action'}
])
const AddWorker = () => {
    addWorker.value.openModal()
}
onMounted( () => {
    store.getWorker(params)
})
const getWorker = () => {
    store.getWorker(params)
};
</script>

<style lang="scss" scoped>

</style>