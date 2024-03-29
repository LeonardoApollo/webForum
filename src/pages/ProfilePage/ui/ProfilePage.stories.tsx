import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { EditableProfileCard } from '@/features/editableProfileCard';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import ProfilePage from './ProfilePage';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => (
    <ProfilePage {...args}>
        <EditableProfileCard id="1" />
    </ProfilePage>
);

const profile = {
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
};

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    StoreDecorator({
        profile,
    }),
];

export const LightRedesigned = Template.bind({});
LightRedesigned.args = {};
LightRedesigned.decorators = [
    NewDesignDecorator,
    StoreDecorator({
        profile,
    }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Theme.DARK),
    StoreDecorator({
        profile,
    }),
];
