import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';

import { ArticleRating } from '@/features/articleRating';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';

import { ArticleDetails } from '@/entities/Article';

import { StickyContentLayout } from '@/shared/layout';
import { classNames } from '@/shared/libs/classNames/classNames';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/libs/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures, getFeatureFlag } from '@/shared/libs/features';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { articleDetailsPageReducer } from '../../modal/slices';
import { AdditionalInfoContainer } from '../AdditionalInfroContainer/AdditionalInfoContainer';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticlesDetailsPageHeader } from '../ArticlesDetailsPageHeader/ArticlesDetailsPageHeader';
import { DetailsConteiner } from '../DetailsContent/DetailsConteiner';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string }>();
    // Захардкоженный флаг который не меняется рефакторингом
    const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');
    if (!id) {
        return (
            <div
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                {t('Статья не найдена')}
            </div>
        );
    }
    // Захардкоженный флаг который можно изменить рефакторингом, предпочтителен
    // const counter = toggleFeatures({
    //     name: 'isCounterEnabled',
    //     // eslint-disable-next-line
    //     on: () => <div>{t('new Counter')}</div>,
    //     // eslint-disable-next-line
    //     off: () => <Counter />,
    // });

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <StickyContentLayout
                        content={
                            <Page
                                data-testid="ArticleDetailsPage"
                                className={classNames(
                                    cls.ArticleDetailsPage,
                                    {},
                                    [className],
                                )}
                            >
                                <VStack gap="16" max>
                                    <DetailsConteiner />
                                    <ArticleRating articleId={id} />
                                    <ArticleRecommendationsList />
                                    <ArticleDetailsComments
                                        className={cls.commentTitle}
                                        id={id}
                                    />
                                </VStack>
                            </Page>
                        }
                        right={<AdditionalInfoContainer />}
                    />
                }
                off={
                    <Page
                        data-testid="ArticleDetailsPage"
                        className={classNames(cls.ArticleDetailsPage, {}, [
                            className,
                        ])}
                    >
                        <VStack gap="16" max>
                            <ArticlesDetailsPageHeader />
                            <ArticleDetails id={id} />
                            {isArticleRatingEnabled && (
                                <ArticleRating articleId={id} />
                            )}
                            <ArticleRecommendationsList />
                            <ArticleDetailsComments
                                className={cls.commentTitle}
                                id={id}
                            />
                        </VStack>
                    </Page>
                }
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
