import { describe, it, expect, beforeEach } from 'vitest';

import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import SearchField from '../SearchField.vue';

describe('SearchFieldInput', async () => {
    let wrapper: VueWrapper<InstanceType<typeof SearchField>>;
    let searchInput: Omit<DOMWrapper<HTMLInputElement>, "exists">;
    const searchTerm = 'Test Term';

    beforeEach(() => {
        wrapper = mount(SearchField);
        searchInput = wrapper.get('input[type="text"]');
    });
    it('sets searchTerm properly', async () => {
        await searchInput.setValue(searchTerm);

        expect(wrapper.vm.searchTerm).toBe(searchTerm);
    });
    it('is set properly when setting searchTerm', async () => {
        wrapper.vm.searchTerm = searchTerm;
        await wrapper.vm.$nextTick();

        expect(searchInput.element.value).toBe(searchTerm);
    });
});