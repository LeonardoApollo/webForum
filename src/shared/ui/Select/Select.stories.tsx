import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from './Select';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'Lorem fish text',
    options: [
        { value: '123', content: 'First' },
        { value: '1234', content: 'Second' },
        { value: '12345', content: 'Third' },
    ],
};
