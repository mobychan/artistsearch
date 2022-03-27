import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import SearchResultList from '../SearchResultList.vue';

describe('SearchField', async () => {
    let wrapper: VueWrapper<InstanceType<typeof SearchResultList>>;

    beforeEach(() => {
        wrapper = mount(SearchResultList);
    });

    it('displays nothing when props.searchResult == null', () => {
        expect(wrapper.html()).toBe('<!--v-if-->');
    });

    it('displays data from props.searchResult', async () => {
        var artist = {
            name: 'Test Artist',
            mbid: '',
            url: 'https://www.last.fm',
            image: [{ '#text': 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png' }]
        };
        var data = {
            results: {
                artistmatches: {
                    artist: [artist]
                }
            }
        };

        wrapper.setProps({ searchResult: data });
        await wrapper.vm.$forceUpdate();
        const text = wrapper.text();
        expect(text).toContain(artist.name);
        expect(text).toContain(artist.mbid);
        expect(text).toContain(artist.url);
        expect(wrapper.html()).toContain(artist.image[0]["#text"]);
    });
});