<script lang="ts">
import { defineComponent } from 'vue';
import MessageDisplay from '@/components/MessageDisplay.vue';
import SearchResultList from '@/components/SearchResultList.vue';
import type { ApiResult } from '../dataClasses';
import axios from 'axios';
import LoadingIndicator from './LoadingIndicator.vue';
import randomArtistsJson from '../randomArtists.json';

export default defineComponent({
    components: {
        MessageDisplay: MessageDisplay,
        SearchResultList: SearchResultList,
        LoadingIndicator: LoadingIndicator
    },
    data() {
        return {
            loading: false,
            searchTerm: '',
            maxResults: 30,
            message: '',
            error: false,
            searchResult: null as ApiResult | null
        }
    },
    methods: {
        clearInput() {
            if (!this.loading) {
                this.searchTerm = '';
                this.error = false;
                this.message = '';
                this.searchResult = null;
            }
        },
        lookup() {
            if (!this.loading) {
                this.loading = true;
                this.searchResult = null;
                this.error = false;
                this.message = '';

                this.callApi(this.getApiUrl(this.searchTerm));
            }
        },
        callApi(apiUrl: string) {
            axios.get(apiUrl)
                .then(result => {
                    if (result.data.error) {
                        this.error = true;
                        this.message = `${result.data.error}: ${result.data.message}`;
                        return;
                    } else if (Object.keys(result.data).length == 0) {
                        this.message = 'No results could be found. Try again or check out these artists:';
                        this.callApi(this.getApiUrl(this.getRandomArtist()));
                    } else {
                        this.searchResult = result.data;
                    }

                    this.loading = false;
                });
        },
        getApiUrl(searchTerm: string) {
            let parameter = import.meta.env.VITE_API_ARTIST_SEARCH as string;
            parameter = parameter?.replace('{maxResults}', this.maxResults.toString());
            parameter = parameter?.replace('{artist}', searchTerm);
            parameter = parameter?.replace('{apiKey}', import.meta.env.VITE_API_KEY as string);
            return `${import.meta.env.VITE_API_URL}${parameter}`;
        },
        getRandomArtist() {
            return randomArtistsJson.randomArtists[Math.floor(Math.random() * randomArtistsJson.randomArtists.length)];
        },
        checkMaxResultsValue() {
            if (this.maxResults <= 0) {
                this.maxResults = 1;
            }
        }
    }
});
</script>

<template>
    <LoadingIndicator :loading="loading" />
    <div class="container">
        <label for="searchTerm">Artist</label>
        <br />
        <input id="searchTerm" type="text" v-model="searchTerm" placeholder="Enter artist..." />
        <button id="clearInput" @click="clearInput">X</button>
    </div>
    <div class="container">
        <label for="searchTerm">Maximum number of results</label>
        <br />
        <input
            id="maxResults"
            type="number"
            min="1"
            v-model="maxResults"
            @change="checkMaxResultsValue"
        />
    </div>
    <div class="container">
        <button id="lookupButton" @click="lookup">Look up artist</button>
    </div>
    <MessageDisplay :error="error" :message="message" />
    <SearchResultList :searchResult="searchResult" />
</template>

<style scoped>
.container {
    margin-top: 10px;
}

#clearInput {
    margin-left: 10px;
}
</style>
