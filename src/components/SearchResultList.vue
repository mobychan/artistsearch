<script lang="ts">
import { defineComponent } from "vue";
import type { ApiResult } from '../dataClasses';

export default defineComponent({
    props: {
        searchResult: Object as () => ApiResult | null
    }
});
</script>

<template>
    <div v-if="searchResult != null">
        <div class="grid">
            <div class="header cell">#</div>
            <div class="header cell">Name</div>
            <div class="header cell">Id</div>
            <div class="header cell">Url</div>
            <div class="header cell">Image</div>
            <template v-for="(artist, index) in searchResult.results.artistmatches.artist">
                <div class="cell">{{ index + 1 }}</div>
                <div class="cell">{{ artist.name }}</div>
                <div class="cell">{{ artist.mbid }}</div>
                <div class="cell">
                    <a target="_blank" :href="artist.url">{{ artist.url }}</a>
                </div>
                <div class="cell">
                    <img :src="(artist.image[0]['#text'] as string)" height="50" />
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped>
@import "@/assets/base.css";

.grid {
    display: grid;
    grid-template-columns: minmax(35px, 1fr) repeat(4, minmax(300px, 1fr));
    grid-gap: 0px;
    border-bottom: 1px solid var(--color-text);
    border-right: 1px solid var(--color-text);
    margin-top: 10px;
}

.header {
    font-weight: 700;
}

.cell {
    border-top: 1px solid var(--color-text);
    border-left: 1px solid var(--color-text);
    padding: 2px 2px;
    word-break: break-all;
}
</style>