import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getArticleDetailsData } from '@/entities/Article';
import { RatingCard } from '@/entities/Rating';
import { getUserAuthData } from '@/entities/User';

import { ToggleFeatures } from '@/shared/libs/features';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { TextAlign, Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';

import { useArticleRating, useRateArticle } from '../../api/articleRatingApi';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = (props: ArticleRatingProps) => {
    const { className, articleId } = props;
    const userData = useSelector(getUserAuthData);
    const article = useSelector(getArticleDetailsData);
    const { t } = useTranslation('article');
    const { data, isLoading } = useArticleRating({
        articleId,
        userId: userData?.id ?? '',
    });

    const [rateArticleMutation] = useRateArticle();

    const rating = data?.filter((obj) => obj.userId === userData?.id)[0];

    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    userId: userData?.id ?? '',
                    articleId,
                    rate: starsCount,
                    feedback,
                });
            } catch (e) {
                console.log(e);
            }
        },
        [rateArticleMutation, articleId, userData?.id],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount);
        },
        [handleRateArticle],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback);
        },
        [handleRateArticle],
    );

    if (isLoading) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<Skeleton width="100%" height={120} />}
                off={<SkeletonDeprecated width="100%" height={120} />}
            />
        );
    }

    if (article?.user.id === userData?.id) {
        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Card max borderRadius="round">
                        <Text
                            align="center"
                            title={t('Вы не можете оценить свою статью')}
                        />
                    </Card>
                }
                off={
                    <CardDeprecated max>
                        <TextDeprecated
                            align={TextAlign.CENTER}
                            title={t('Вы не можете оценить свою статью')}
                        />
                    </CardDeprecated>
                }
            />
        );
    }

    return (
        <RatingCard
            data-testid="ArticleDetails.RatingCard"
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            className={className}
            title={t('Оцените статью')}
            feedbackTitle={t('Оставьте свой отзыв о статье')}
            hasFeedback
        />
    );
};

export default memo(ArticleRating);
