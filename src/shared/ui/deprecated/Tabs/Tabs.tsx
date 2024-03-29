import { ReactNode, memo, useCallback } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';

import { Card, ThemeCard } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem {
    value: string;
    content: ReactNode;
}

export interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    'data-testid'?: string;
}

/**
 * Устарел, используем компоненты из папки redesigned
 * @deprecated
 */
export const Tabs = memo((props: TabsProps) => {
    const { className, tabs, value, onTabClick } = props;

    const clickHandle = useCallback(
        (tab: TabItem) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );

    return (
        <div className={classNames(cls.Tabs, {}, [className])}>
            {tabs.map((tab) => (
                <Card
                    className={cls.tab}
                    key={tab.value}
                    theme={
                        tab.value === value
                            ? ThemeCard.NORMAL
                            : ThemeCard.OUTLINED
                    }
                    onClick={clickHandle(tab)}
                    data-testid={`${props['data-testid']}.${tab.value}`}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    );
});
