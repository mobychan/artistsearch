<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        message: String,
        error: Boolean,
    }
});
</script>

<template>
    <div
        id="message"
        v-if="message !== null && message !== ''"
        :class="error ? 'message error' : 'message'"
    >{{ message }}</div>
</template>



<style scoped>
.message {
    margin: 10px;
}

.error {
    color: var(--color-text-error);
}
</style>