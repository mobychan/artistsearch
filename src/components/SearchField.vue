<script  lang="ts">
import { defineComponent } from 'vue';
import MessageDisplay from '@/components/MessageDisplay.vue';
import SearchResultList from '@/components/SearchResultList.vue';
import type { ApiResult } from '../dataClasses';
import axios from 'axios';

export default defineComponent({
    components: {
        MessageDisplay: MessageDisplay,
        SearchResultList: SearchResultList
    },
    data() {
        return {
            searchTerm: '',
            message: '',
            error: false,
            searchResult: {} as ApiResult
        }
    },
    methods: {
        clearInput() {
            this.searchTerm = '';
        },
        lookup() {
            this.error = false;
            this.message = '';
            let parameter = import.meta.env.VITE_API_ARTIST_SEARCH as string;
            parameter = parameter?.replace('{artist}', this.searchTerm);
            parameter = parameter?.replace('{apiKey}', import.meta.env.VITE_API_KEY as string);
            axios.get(`${import.meta.env.VITE_API_URL}${parameter}`)
                .then(result => {
                    if (result.data.error) {
                        this.error = true;
                        this.message = `${result.data.error}: ${result.data.message}`;
                        return;
                    } else if (Object.keys(result.data).length == 0) {
                        this.message = 'No results could be found. Try again or check out these random artists:';
                    } else {
                        this.searchResult = result.data;
                    }
                });
        }
    }
});
</script>

<template>
    <div>
        <input type="text" v-model="searchTerm" placeholder="Enter artist..." />
        <button id="clearInput" @click="clearInput">X</button>
    </div>
    <div>
        <button id="lookup" @click="lookup">Look up artist</button>
        <MessageDisplay :error="error" :message="message" />
        <SearchResultList :searchResult="searchResult" />
    </div>
</template>

<style scoped>
#clearInput {
    margin-left: 10px;
}

#lookup {
    margin-top: 10px;
}
</style>
