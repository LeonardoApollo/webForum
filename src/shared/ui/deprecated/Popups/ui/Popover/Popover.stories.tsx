import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Button } from '../../../Button';
import { Popover } from './Popover';

export default {
    title: 'shared/deprecated/Popups/Popover',
    component: Popover,
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
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
    <Popover {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    trigger: <Button>Open</Button>,
    direction: 'bottomLeft',
    children: <div>Lorem Ipusm text</div>,
};
