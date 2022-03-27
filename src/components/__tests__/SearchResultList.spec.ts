import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import SearchResultList from '../SearchResultList.vue';

describe('SearchResultList', () => {
    let wrapper: VueWrapper<InstanceType<typeof SearchResultList>>;
    const artist = {
        name: 'Test Artist',
        mbid: '',
        url: 'https://www.last.fm',
        image: [
            { '#text': 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png', size: 'medium' },
            { '#text': 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png', size: 'small' }
        ]
    };
    const data = {
        results: {
            artistmatches: {
                artist: [artist]
            }
        }
    };
    const artistWithoutSmallImage = {
        name: 'Test Artist',
        mbid: '',
        url: 'https://www.last.fm',
        image: [
            { '#text': 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png', size: 'medium' }
        ]
    };

    beforeEach(() => {
        wrapper = mount(SearchResultList);
    });

    it('displays nothing when props.searchResult == null', () => {
        expect(wrapper.html()).toBe('<!--v-if-->');
    });

    it('displays data from props.searchResult', async () => {
        wrapper.setProps({ searchResult: data });
        await wrapper.vm.$forceUpdate();
        const text = wrapper.text();
        expect(text).toContain(artist.name);
        expect(text).toContain(artist.mbid);
        expect(text).toContain(artist.url);
        expect(wrapper.html()).toContain(artist.image[0]["#text"]);
    });

    it('methods.getImage returns small image url', () => {
        expect(wrapper.vm.getImage(artist.image)).toBe(artist.image[1]["#text"]);
    });

    it('methods.getImage returns empty string if no small image exists', () => {
        expect(wrapper.vm.getImage(artistWithoutSmallImage.image)).toBe('');
    });
});