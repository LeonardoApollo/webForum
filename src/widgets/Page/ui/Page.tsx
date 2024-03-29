import { MutableRefObject, ReactNode, UIEvent, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';

import { ScrollSaveActions, getScrollSaveByPath } from '@/features/ScrollSave';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useInitialEffect } from '@/shared/hooks/useInitialEffect';
import { useThrottle } from '@/shared/hooks/useThrottle';
import { classNames } from '@/shared/libs/classNames/classNames';
import { toggleFeatures } from '@/shared/libs/features';
import { TestProps } from '@/shared/types/tests';

import cls from './Page.module.scss';

interface PageProps extends TestProps {
    className?: string;
    children: ReactNode;
    onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = (props: PageProps) => {
    const { className, children, onScrollEnd } = props;
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) =>
        getScrollSaveByPath(state, pathname),
    );

    useInfiniteScroll({
        triggerRef,
        wrapperRef: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => undefined,
            off: () => wrapperRef,
        }),
        callback: onScrollEnd,
    });

    useInitialEffect(() => {
        if (wrapperRef.current && scrollPosition) {
            wrapperRef.current.scrollTop = scrollPosition;
            return;
        }

        document.body.scrollIntoView({ behavior: 'auto' });
    }, [pathname]);

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        console.log(e);
        dispatch(
            ScrollSaveActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            }),
        );
    }, 100);

    return (
        <main
            ref={wrapperRef}
            className={classNames(
                toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => cls.PageRedesigned,
                    off: () => cls.Page,
                }),
                {},
                [className],
            )}
            onScroll={onScroll}
            id={PAGE_ID}
            // eslint-disable-next-line
            data-testid={props['data-testid'] ?? 'Page'}
        >
            {children}
            {onScrollEnd ? (
                <div className={cls.trigger} ref={triggerRef} />
            ) : null}
        </main>
    );
};
