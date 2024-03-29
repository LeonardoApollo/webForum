import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import {
    ToggleFeatures,
    getFeatureFlag,
    toggleFeatures,
    updateFeatureFlag,
} from '@/shared/libs/features';
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/Popups';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface UiDesignSwitcherProps {
    className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const { className } = props;
    const { t } = useTranslation('settings');
    const isAppRedesigned = getFeatureFlag('isAppRedesigned');
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [isLoading, setIsLoading] = useState(false);

    const items = [
        {
            content: t('Новый'),
            value: 'new',
        },
        {
            content: t('Старый'),
            value: 'old',
        },
    ];

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    const onChange = async (value: string) => {
        if (authData) {
            setIsLoading(true);
            await dispatch(
                updateFeatureFlag({
                    userId: authData.id,
                    newFeatures: {
                        isAppRedesigned: value === 'new',
                    },
                }),
            ).unwrap();
            setIsLoading(false);
        }
    };

    return (
        <HStack className={className}>
            <Text text={t('Вариант интерфейса')} />
            {isLoading ? (
                <Skeleton width={100} height={40} border="15%" />
            ) : (
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <ListBox
                            onChange={onChange}
                            direction="bottomLeft"
                            items={items}
                            value={isAppRedesigned ? 'new' : 'old'}
                        />
                    }
                    off={
                        <ListBoxDeprecated
                            defaultValue=""
                            onChange={onChange}
                            items={items}
                            value={isAppRedesigned ? 'new' : 'old'}
                        />
                    }
                />
            )}
        </HStack>
    );
});
