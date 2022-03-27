import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import ArtistSearch from '../ArtistSearch.vue';
import axios from 'axios';

describe('ArtistSearch', async () => {
    let wrapper: VueWrapper<InstanceType<typeof ArtistSearch>>;
    beforeEach(() => {
        wrapper = mount(ArtistSearch);
    });

    describe('Input', async () => {
        let searchInput: Omit<DOMWrapper<HTMLInputElement>, "exists">;
        const searchTerm = 'Test Term';
        beforeEach(() => {
            searchInput = wrapper.get('#searchTerm');
        });

        it('sets data.searchTerm properly', async () => {
            await searchInput.setValue(searchTerm);

            expect(wrapper.vm.searchTerm).toBe(searchTerm);
        });

        it('is set properly when setting data.searchTerm', async () => {
            wrapper.vm.searchTerm = searchTerm;
            await wrapper.vm.$nextTick();

            expect(searchInput.element.value).toBe(searchTerm);
        });
    });

    describe('Clear Button', async () => {
        let searchInput: Omit<DOMWrapper<HTMLInputElement>, "exists">;
        let deleteButton: Omit<DOMWrapper<HTMLButtonElement>, "exists">;
        const searchTerm = 'Test Term';

        beforeEach(() => {
            searchInput = wrapper.get('#searchTerm');
            deleteButton = wrapper.get('#clearInput');
        });

        it('clears data.searchTerm', async () => {
            wrapper.vm.searchTerm = searchTerm;
            await wrapper.vm.$nextTick();
            await deleteButton.trigger('click');

            expect(wrapper.vm.searchTerm).toBe('');
        });

        it('clears input content', async () => {
            await searchInput.setValue(searchTerm);
            await deleteButton.trigger('click');

            expect(searchInput.element.value).toBe('');
        });

        it('clears data.searchResult', async () => {
            wrapper.vm.searchResult = { results: { artistmatches: { artist: [] } } };
            await deleteButton.trigger('click');

            expect(wrapper.vm.searchResult).toBe(null);
        });

        it('clears data.error', async () => {
            wrapper.vm.error = true;
            await deleteButton.trigger('click');

            expect(wrapper.vm.error).toBe(false);
        });

        it('clears data.message', async () => {
            wrapper.vm.message = 'message';
            await deleteButton.trigger('click');

            expect(wrapper.vm.message).toBe('');
        });
    });

    describe('Lookup Button', async () => {
        let lookupButton: Omit<DOMWrapper<HTMLButtonElement>, "exists">;

        beforeEach(function () {
            lookupButton = wrapper.get('#lookupButton');
        });

        it('clicking calls lookup on mount', async () => {
            const lookup = vi.fn();
            wrapper.vm.lookup = lookup;

            await lookupButton.trigger('click');

            expect(lookup).toHaveBeenCalled();
        });
    });

    describe('Lookup', async () => {
        let mock: MockAdapter;
        let lookupButton: Omit<DOMWrapper<HTMLButtonElement>, "exists">;

        beforeEach(function () {
            lookupButton = wrapper.get('#lookupButton');
        });

        it('sets data.message if data object is empty', async () => {
            mock = new MockAdapter(axios);
            mock.onAny().reply(200, {});

            await lookupButton.trigger('click');

            expect(wrapper.vm.message).toBe('No results could be found. Try again or check out these artists:');
        });

        it('sets data.message and data.error if api returns error', async () => {
            const errorCode = 2;
            const errorMessage = 'error';
            mock = new MockAdapter(axios);
            mock.onAny().reply(200, { message: errorMessage, error: errorCode });

            await lookupButton.trigger('click');

            expect(wrapper.vm.message).toBe(`${errorCode}: ${errorMessage}`);
            expect(wrapper.vm.error).toBe(true);
        });

        it('sets data.searchResult to result', async () => {
            const data = {
                "results": {
                    "artistmatches": {
                        "artist": [
                            {
                                "name": "Test Artist",
                                "mbid": "bfcc6d75-a6a5-4bc6-8282-47aec8531818",
                                "url": "https://www.last.fm/music/Cher",
                                "image": [
                                    {
                                        "#text": "https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png",
                                        "size": "small"
                                    }
                                ]
                            }]
                    }
                }
            };
            mock = new MockAdapter(axios);
            mock.onAny().reply(200, data);

            await lookupButton.trigger('click');

            expect(JSON.stringify(wrapper.vm.searchResult)).toBe(JSON.stringify(data));
        });
    });

    describe('max results input', async () => {
        let maxResultsInput: Omit<DOMWrapper<HTMLInputElement>, "exists">;
        beforeEach(() => {
            maxResultsInput = wrapper.get('#maxResults');
        });

        it('sets data.maxResults on input', async () => {
            const maxResultsValue = 1;
            await maxResultsInput.setValue(maxResultsValue);

            expect(wrapper.vm.maxResults).toBe(maxResultsValue);
        });

        it('inputting negative values sets control to 1', async () => {
            await maxResultsInput.setValue(-1);

            expect(maxResultsInput.element.value).toBe((1).toString());
        });
    });

    it('getRandomArtist does not return an empty string', () => {
        expect(wrapper.vm.getRandomArtist()).not.toBe('');
    });

    it('startLoading sets data.loading to true', async () => {
        wrapper.vm.startLoading();
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.loading).toBe(true);
    });

    it('stopLoading sets data.loading to false', async () => {
        wrapper.vm.stopLoading();
        await wrapper.vm.$nextTick();

        expect(wrapper.vm.loading).toBe(false);
    });
});