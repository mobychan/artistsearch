<script lang="ts">
import type { ApiResult } from '@/dataClasses';
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        searchResult: Object as () => ApiResult | null,
        loading: Boolean
    },
    emits: ['startLoading', 'stopLoading'],
    methods: {
        saveCsv() {
            this.$emit('startLoading');
            let objectUrl = window.URL.createObjectURL(this.getCsvBlob());
            this.performTemporaryLinkClick(this.getTemporaryFileLink(objectUrl));
            window.URL.revokeObjectURL(objectUrl);
            this.$emit('stopLoading');
        },
        performTemporaryLinkClick(link: HTMLAnchorElement) {
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
        },
        getTemporaryFileLink(objectUrl: string): HTMLAnchorElement {
            let link = document.createElement('a');

            link.href = objectUrl;
            link.download = 'ArtistSearchResult.csv';

            return link;
        },
        getCsvBlob(): Blob {
            const csvData = this.generateCsvData();

            return new Blob([csvData], { type: 'text/csv' });
        },
        generateCsvData(): string {
            let csvData = 'Name,MBID,Url,Image_Small,Image\n';

            this.searchResult?.results.artistmatches.artist.forEach((artist) => {
                const smallImage = artist.image.find(i => i.size == "small");
                const image = artist.image.find(i => i.size == "medium");

                csvData += `"${artist.name}",${artist.mbid},"${artist.url}",${smallImage == null ? '' : smallImage['#text']},${image == null ? '' : image['#text']}\n`;
            });

            return csvData;
        }
    }
});
</script>

<template>
    <button id="saveCsv" @click="saveCsv" v-if="searchResult != null">Save data as CSV</button>
</template>

<style scope>
#saveCsv {
    margin: 10px;
}
</style>