import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

import { ListBox } from './ListBox';

export default {
    title: 'shared/redesigned/Popups/ListBox',
    component: ListBox,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 220 }}>
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
    <ListBox {...args} />
);

const options = [
    { value: '1', content: 'Lorem ipsum very long fish text' },
    { value: '12', content: 'abc', disabled: true },
    { value: '123', content: '345' },
];

export const topRight = Template.bind({});
topRight.args = {
    direction: 'topRight',
    defaultValue: 'CustomSelect',
    value: 'CustomSelect',
    label: 'CustomSelect',
    items: options,
};
topRight.decorators = [NewDesignDecorator];

export const topLeft = Template.bind({});
topLeft.args = {
    direction: 'topLeft',
    defaultValue: 'CustomSelect',
    value: 'CustomSelect',
    label: 'CustomSelect',
    items: options,
};
topLeft.decorators = [NewDesignDecorator];

export const bottomRight = Template.bind({});
bottomRight.args = {
    direction: 'bottomRight',
    defaultValue: 'CustomSelect',
    value: 'CustomSelect',
    label: 'CustomSelect',
    items: options,
};
bottomRight.decorators = [NewDesignDecorator];

export const bottomLeft = Template.bind({});
bottomLeft.args = {
    direction: 'bottomLeft',
    defaultValue: 'CustomSelect',
    value: 'CustomSelect',
    label: 'CustomSelect',
    items: options,
};
bottomLeft.decorators = [NewDesignDecorator];
