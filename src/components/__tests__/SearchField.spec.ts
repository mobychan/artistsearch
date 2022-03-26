import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import MockAdapter from 'axios-mock-adapter';
import SearchField from '../SearchField.vue';
import axios from 'axios';

describe('SearchField', async () => {
    let wrapper: VueWrapper<InstanceType<typeof SearchField>>;
    beforeEach(() => {
        wrapper = mount(SearchField);
    });

    describe('Input', async () => {
        let searchInput: Omit<DOMWrapper<HTMLInputElement>, "exists">;
        const searchTerm = 'Test Term';
        beforeEach(() => {
            searchInput = wrapper.get('input[type="text"]');
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
            wrapper = mount(SearchField);
            searchInput = wrapper.get('input[type="text"]');
            deleteButton = wrapper.get('#clearInput');
        });

        it('clears data.searchTerm on delete button press', async () => {
            wrapper.vm.searchTerm = searchTerm;
            await wrapper.vm.$nextTick();
            await deleteButton.trigger('click');

            expect(wrapper.vm.searchTerm).toBe('');
        });

        it('clears input content on delete button press', async () => {
            await searchInput.setValue(searchTerm);
            await deleteButton.trigger('click');

            expect(searchInput.element.value).toBe('');
        });
    });

    describe('Lookup Button', async () => {
        let parameter = import.meta.env.VITE_API_ARTIST_SEARCH as string;
        parameter = parameter?.replace('{apiKey}', import.meta.env.VITE_API_KEY as string);
        const parameterEmpty = parameter?.replace('{artist}', '');
        const parameterValue = parameter?.replace('{artist}', 'cher');
        const urlEmpty = `${import.meta.env.VITE_API_URL}${parameterEmpty}`;
        const urlValue = `${import.meta.env.VITE_API_URL}${parameterValue}`;

        let mock: MockAdapter;
        let lookupButton: Omit<DOMWrapper<HTMLButtonElement>, "exists">;

        beforeEach(function () {
            mock = new MockAdapter(axios);
            lookupButton = wrapper.get('#lookup');
        });

        it('clicking calls lookup on mount', async () => {
            const lookup = vi.fn();
            wrapper.vm.lookup = lookup;

            await lookupButton.trigger('click');

            expect(lookup).toHaveBeenCalled();
        });
    });

    describe('Lookup', async () => {
        let parameter = import.meta.env.VITE_API_ARTIST_SEARCH as string;
        parameter = parameter?.replace('{apiKey}', import.meta.env.VITE_API_KEY as string);
        const parameterEmpty = parameter?.replace('{artist}', '');
        const parameterValue = parameter?.replace('{artist}', 'cher');
        const urlEmpty = `${import.meta.env.VITE_API_URL}${parameterEmpty}`;
        const urlValue = `${import.meta.env.VITE_API_URL}${parameterValue}`;

        let mock: MockAdapter;
        let lookupButton: Omit<DOMWrapper<HTMLButtonElement>, "exists">;

        beforeEach(function () {
            mock = new MockAdapter(axios);
            lookupButton = wrapper.get('#lookup');
        });

        it('sets data.message if data object is empty', async () => {
            mock.onGet(urlEmpty).reply(200, {});

            await lookupButton.trigger('click');

            expect(wrapper.vm.message).toBe('No results could be found. Try again or check out these random artists:');
        });

        it('sets data.message and data.error if api returns error', async () => {
            const errorCode = 2;
            const errorMessage = 'error';
            mock.onGet(urlEmpty).reply(200, { message: errorMessage, error: errorCode });

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
            mock.onGet(urlEmpty).reply(200, data);

            await lookupButton.trigger('click');

            expect(JSON.stringify(wrapper.vm.searchResult)).toBe(JSON.stringify(data));
        });
    });
});