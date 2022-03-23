<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            searchTerm: ''
        }
    }
});
</script>

<template>
    <div>
        <h1 class="green">Artist Search</h1>
        <input type="text" v-model="searchTerm" />
    </div>
</template>

<style scoped>
</style>
