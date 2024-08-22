<template>
    <div class="app-modal" :style="{'width': width}" :class="{'app-modal-show': modelValue}">
        <app-transition>
            <div v-if="modelValue" class="app-modal__body">
                <slot></slot>
            </div>
        </app-transition>
    </div>
    <app-transition>
        <span
        @click="$emit('update:modelValue', false)"
        v-if="modelValue"
        class="app-modal-shadow"
        ></span>
    </app-transition>

</template>

<script setup>
    import AppTransition from "./app-transition.vue"
    const props = defineProps({
        modelValue: {
            type: Boolean,
            default: false, 
        },
        width: {
            type: String,
        }
    });
</script>

<style scoped>
.app-modal{
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    width: 60%;
    max-height: 100%;
    top: 50%;
    background-color: #f6f6f6;
    z-index: -1;
    opacity: 0;
    overflow: auto;
    border-radius: 1rem;
}
.app-modal-show{
    opacity: 1;
    z-index: 100;
}
::-webkit-scrollbar{
    display: none;
}
.app-modal__body{
    padding: 10px 0;
}
.app-modal-shadow{
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
@media (max-width: 427px) {
    .app-modal{
        width: 80%;
    }
}
@media (max-width: 590px) {
    .app-modal{
        width: 70%;
    }
}
@media (max-width: 760px) {
    .app-modal{
        width: 60%;
    }
}
</style>