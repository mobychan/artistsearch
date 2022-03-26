<script lang="ts">
import { defineComponent } from "vue";
import type { ApiResult } from '../dataClasses';

export default defineComponent({
    props: {
        searchResult: Object as () => ApiResult
    }
});
</script>

<template>
    <div v-if="searchResult != null">
        <div>{{ JSON.stringify(searchResult) }}</div>
    </div>
</template>

<style scoped>
</style>