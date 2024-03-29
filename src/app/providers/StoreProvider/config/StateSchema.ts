import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ArticlesDetailsPageSchema } from '@/pages/ArticleDetailsPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';

import { LoginSchema } from '@/features/AuthByUsername';
import { ScrollSaveSchema } from '@/features/ScrollSave';
import { addCommentFormSchema } from '@/features/addNewComment';
import { ArticleEditFormSchema } from '@/features/articleEditForm';
import { articleRatingApi } from '@/features/articleRating';
import { recommendationsApi } from '@/features/articleRecommendationsList';
import { ProfileSchema } from '@/features/editableProfileCard';
import { profileRatingApi } from '@/features/profileRating';

import { ArticleDetailsSchema } from '@/entities/Article';
import { CounterSchema } from '@/entities/Counter';
import { notificationApi } from '@/entities/Notification';
import { UserSchema } from '@/entities/User';

import { rtkApi } from '@/shared/api/rtkApi';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    scrollSave: ScrollSaveSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    [profileRatingApi.reducerPath]: ReturnType<typeof profileRatingApi.reducer>;
    [notificationApi.reducerPath]: ReturnType<typeof notificationApi.reducer>;
    [articleRatingApi.reducerPath]: ReturnType<typeof articleRatingApi.reducer>;
    [recommendationsApi.reducerPath]: ReturnType<
        typeof recommendationsApi.reducer
    >;
    // Асинхронные редьюсеры
    loginForm?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsPage?: ArticlesDetailsPageSchema;
    addNewCommentForm?: addCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
    articleEditForm?: ArticleEditFormSchema;
}

export type StateShchemaKey = keyof StateSchema;

export type MountedReducers = OptionalRecord<StateShchemaKey, boolean>;
export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction,
    ) => CombinedState<StateSchema>;
    add: (key: StateShchemaKey, reducer: Reducer) => void;
    remove: (key: StateShchemaKey) => void;
    getMountedReducers: () => MountedReducers;
}
export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
