
import { mount, VueWrapper } from "@vue/test-utils";
import { describe, it, expect, beforeEach, vi } from "vitest";
import SaveCsv from '../SaveCsv.vue';

describe('SaveCsv', async () => {
    let wrapper: VueWrapper<InstanceType<typeof SaveCsv>>;
    const artist = {
        name: 'Test Artist',
        mbid: 'id',
        url: 'https://www.last.fm',
        image: [
            { '#text': 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png', size: 'small' },
            { '#text': 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png', size: 'medium' }
        ]
    };
    const data = {
        results: {
            artistmatches: {
                artist: [artist]
            }
        }
    };

    beforeEach(() => {
        wrapper = mount(SaveCsv);
    });

    it('getCsvBlob returns correctly typed Blob object', async () => {
        wrapper.setProps({ searchResult: data });
        await wrapper.vm.$forceUpdate();

        const expectedType = 'text/csv';
        const csvBlob = wrapper.vm.getCsvBlob();

        expect(csvBlob.type).toBe(expectedType);
    });

    it('perform temporary link click executes click event', async () => {
        let clicked = false;
        let link = document.createElement('a');
        link.click = () => { clicked = true; };

        wrapper.vm.performTemporaryLinkClick(link);
        await wrapper.vm.$nextTick();

        expect(clicked).toBe(true);
    });

    it('generateCsvData returns correct string', async () => {
        wrapper.setProps({ searchResult: data });
        await wrapper.vm.$forceUpdate();

        const generatedCsv = wrapper.vm.generateCsvData();
        const expectedCsv = `Name,MBID,Url,Image_Small,Image\n"${artist.name}",${artist.mbid},"${artist.url}",${artist.image[0]['#text']},${artist.image[1]['#text']}\n`;
        expect(generatedCsv).toBe(expectedCsv);
    });

    it('calls saveCsv on button click', async () => {
        wrapper.setProps({ searchResult: data });
        const saveCsv = vi.fn();
        wrapper.vm.saveCsv = saveCsv;

        await wrapper.vm.$forceUpdate();
        const saveCsvButton = wrapper.get('#saveCsv');

        await saveCsvButton.trigger('click');
        expect(saveCsv).toHaveBeenCalled();
    });

    it('methods.getTemporaryFileLink returns anchor control with correct data', () => {
        const objectUrl = 'http://test.de';
        const expectedHtml = `<a href="${objectUrl}" download="ArtistSearchResult.csv"></a>`;

        expect(wrapper.vm.getTemporaryFileLink(objectUrl).outerHTML).toBe(expectedHtml);
    });
});