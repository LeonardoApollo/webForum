import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import withMock from 'storybook-addon-mock';

import { Notification } from '../../model/types/types';

import { NotificationList } from './NotificationList';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

const notification: Notification = {
    id: '1',
    title: 'Lorem Ipsum',
    description: 'Lorem Ipusm text',
    userId: '1',
};

const authData = {
    id: '1',
    username: 'abs',
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
    user: {
        authData,
    },
})];
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            method: 'GET',
            status: 200,
            response: [
                { ...notification, id: '1' },
                { ...notification, id: '2' },
                { ...notification, id: '3' },
            ],
            delay: 2000,
        },
    ],
};
