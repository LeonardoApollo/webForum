import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager } from 'app/providers/StoreProvider';
import { StateShchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [name in StateShchemaKey]?: Reducer;
}

type ReducersListEntry = [StateShchemaKey, Reducer]

interface DynamicModuleLoaderProps {
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const {
        children, reducers, removeAfterUnmount,
    } = props;
    const dispatch = useDispatch();
    const store = useStore() as ReduxStoreWithManager;

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
            store.reducerManager.add(name, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
        });
        return () => {
            Object.entries(reducers).forEach(([name]: ReducersListEntry) => {
                if (removeAfterUnmount) {
                    store.reducerManager.remove(name);
                    dispatch({ type: `@DELETE ${name} reducer` });
                }
            });
        };
        // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line
        <>
            {children}
        </>
    );
};
