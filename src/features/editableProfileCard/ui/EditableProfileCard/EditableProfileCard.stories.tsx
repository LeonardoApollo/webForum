import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { EditableProfileCard } from './EditableProfileCard';

export default {
    title: 'features/editableProfileCard/EditableProfileCard',
    component: EditableProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => (
    <EditableProfileCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
    StoreDecorator({
        profile: {
            form: {
                firstname: 'Михаил',
                lastname: 'Тяпков',
                age: 21,
                currency: Currency.RUB,
                country: Country.Russia,
                city: 'Cheboksary',
                username: 'Admin',
                avatar: 'https://i.pinimg.com/originals/2e/2e/21/2e2e2125ee53807c2d77b34773f84b5c.jpg',
            },
        },
    }),
];
