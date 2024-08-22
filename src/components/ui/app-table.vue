<template>
    <table>
        <thead>
            <tr>
                <th v-for="(header, i) in headers" :key="`header${i}`">
                {{ header.title }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in body" :key="item.id">
            <td v-for="(bodyInHeader, bodyHeaderIndex) in headers" :key="`bodyHeader${bodyHeaderIndex}`">
                <slot :name="`body_${bodyInHeader.value}`" :item="item" :index="index">
                    {{ item[bodyInHeader.value] }}
                </slot>
            </td>
            </tr>
        </tbody>
    </table>
        <div class="nothing" v-if="!body.length">
            <span>No Data</span>
        </div>
</template>

<script setup>
const props = defineProps({
    headers: {
        type: Array,
        default: () => [],
    },
    body: {
        type: Array,
        default: () => [],
    }
});
</script>

<style lang="scss" scoped>
@media (max-width: 800px) {
    table {
        overflow-x: scroll;
    }
}
table {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    border-collapse: separate;
    border-spacing: 0;
    overflow-x: scroll;
    thead {
        background-color: #eaf5fb;
        th {
            border-top: 0.5px solid #bcbcbc;
            border-left: 0.5px solid #bcbcbc;
            border-right: 0.5px solid #bcbcbc;
            padding: 20px 36px;
            font-size: 14px;
        }
    }
    tbody {
        tr {
            font-size:  13px;
        }
        /* tr:nth-child(even) {
            background-color: #f7fcff;
        } */
    }
}
.nothing {
    width: 97%;
    margin-left: 1.5%;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #bcbcbc;
    border-left: 1px solid #bcbcbc;
    border-right: 1px solid #bcbcbc;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    span {
        font-size: 16px;
    }
}
td {
    padding: 15px 30px;
    border: 0.5px solid #bcbcbc;
    text-align: center;
    font-size: 16px;
}
tr:last-child td:first-child {
    /* border-bottom-left-radius: 10px; */
}
tr:last-child td:first-child {
    /* border-bottom-right-radius: 10px; */
}
tr:last-child td:first-child {
    /* border-top-left-radius: 10px; */
    border-left: 0.5px solid #bcbcbc;
}
tr:last-child td:first-child {
    /* border-top-right-radius: 10px; */
    border-right: 0.5px solid #bcbcbc;
}
</style>