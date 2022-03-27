<script lang="ts">
export default {
    props: {
        loading: Boolean
    }
};
</script>


<template>
    <div v-if="loading" class="loader"></div>
</template>

<style scope>
@import "@/assets/base.css";

.loader {
    position: fixed;
    bottom: 50px;
    right: 50px;
    border: 16px solid var(--color-background-mute);
    border-top: 16px solid var(--vt-c-green);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>