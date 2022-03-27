import { describe, it, expect } from 'vitest';
import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import MessageDisplay from '../MessageDisplay.vue';

describe('MessageDisplay', () => {
    let wrapper: VueWrapper<InstanceType<typeof MessageDisplay>>;
    let messageContainer: DOMWrapper<HTMLElement>;
    const testMessage = 'Test Message';

    it('Is shown when data.message != ""', () => {
        wrapper = mount(MessageDisplay, { props: { message: testMessage } });

        messageContainer = wrapper.find('#message');

        expect(messageContainer.exists()).toBe(true);
    });

    it('Displays data.message', () => {
        wrapper = mount(MessageDisplay, { props: { message: testMessage } });

        messageContainer.find('#message');

        expect(messageContainer.text()).toBe(testMessage);
    });

    it('Does not have class error if data.error == false', () => {
        wrapper = mount(MessageDisplay, { props: { message: testMessage, error: false } });

        messageContainer.find('#message');

        expect(messageContainer.classes()).not.toContain('error');
    });

    it('Does have class error if data.error == true', () => {
        wrapper = mount(MessageDisplay, { props: { message: testMessage, error: true } });

        messageContainer.find('#message');
        expect(wrapper.classes()).toContain('error');
    });
});