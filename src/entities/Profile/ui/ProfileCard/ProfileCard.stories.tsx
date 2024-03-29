import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
    <ProfileCard {...args} />
);

const PrimaryArgs = {
    data: {
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

export const Primary = Template.bind({});
Primary.args = PrimaryArgs;

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = PrimaryArgs;
PrimaryRedesigned.decorators = [NewDesignDecorator];

export const Error = Template.bind({});
Error.args = {
    error: 'true',
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};
