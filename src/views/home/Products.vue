<template>
    <div>
        <div>
            <div class="flex justify-between mt-[35px] mb-[5px] mx-[10px]">
                    <VSearch type="text" name="search_product" placeholder="Qidiruv" v-model="searchQuery"/>
                <div>
                    <VButton type="submit" btn_type="primary" class="bg-global1 py-2 px-6 " @click="AddProduct">Add a products</VButton>
                </div>
            </div>
            <ProductModals ref="addProduct"/>
            <AppTable :headers="headers" :body="displayedProducts">
                <template #body_action="{item}">
                        <VActions :item="item" :modal_value="addProduct" type="type"/>
                </template>
                <template #body_color="{item}">
                    <span>{{ item.color.join(', ') }}</span>
                </template>
                <template #body_size="{item}">
                    <span>{{ item.size.join(', ') }}</span>
                </template>
                <template #body_index="{index}">
                    <span>{{ (params.page - 1) * params.limit + index + 1 }}</span>
                </template>
            </AppTable>
            <div class="flex justify-center my-[10px]">
                <VPagination v-model="params.page" :pages="params.last_page" :range-size="1" active-color="#EAF5FF" @update:modelValue="getProductDiscount"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import VSearch from '@/components/form/VSearch.vue';
import { onMounted, ref, computed, watch } from 'vue';
import { useProductStore } from '@/stores/Product';
import AppTable from '../../components/ui/app-table.vue';
import VPagination from '@hennge/vue3-pagination'
import VButton from '@/components/form/VButton.vue';
import VActions from '@/components/form/VActions.vue';
import ProductModals from '../Modals/ProductModals.vue';

const store = useProductStore()
const searchQuery = ref('');
const addProduct = ref('')
const params = {
    page: 1,
    limit: 8,
    last_page: null
}
const headers = ref([
    {title: 'S/N', value: 'index'},
    {title: 'Product Name', value: 'product_name'},
    {title: 'Color', value: 'color'},
    {title: 'Size', value: 'size'},
    {title: 'Count', value: 'count'},
    {title: 'Cost', value: 'cost'},
    {title: 'Action', value: 'action'}
])

const updateSearchQuery = (value) => {
    searchQuery.value = value;
};

const filteredProducts = computed(() => {
    const query = searchQuery.value.toLowerCase();
    return store.product.filter(product => {
        return product.product_name.toLowerCase().includes(query) ||
               product.color.some(color => color.toLowerCase().includes(query)) ||
               product.size.some(size => size.toLowerCase().includes(query));
    });
});

const displayedProducts = computed(() => {
    return searchQuery.value ? filteredProducts.value : store.product;
});

const AddProduct = () => {
    addProduct.value.openModal()
}
onMounted( () => {
    store.getProductDiscount(params)
})
const getProductDiscount = () => {
    store.getProductDiscount(params)
};
// watch(searchQuery, (newValue) => {
//     // We can also implement additional logic if needed
// });
</script>

<style lang="scss" scoped>

</style>