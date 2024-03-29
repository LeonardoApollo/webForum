import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    ({ className }: EditableProfileCardHeaderProps) => {
        const { t } = useTranslation('profile');

        const readonly = useSelector(getProfileReadonly);
        const dispath = useAppDispatch();
        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileData);
        const canEdit = authData?.id === profileData?.id;
        const onEdit = useCallback(() => {
            dispath(profileActions.setReadonly(false));
        }, [dispath]);

        const onCancelEdit = useCallback(() => {
            dispath(profileActions.cancelEdit());
        }, [dispath]);

        const onSaveEdit = useCallback(() => {
            dispath(updateProfileData());
        }, [dispath]);

        return (
            <HStack
                max
                justify="between"
                className={classNames('', {}, [className])}
            >
                {canEdit && (
                    // eslint-disable-next-line
                    <>
                        {readonly ? (
                            <ToggleFeatures
                                feature="isAppRedesigned"
                                on={
                                    <Button
                                        variant="filled"
                                        onClick={onEdit}
                                        data-testid="EditableProfileCardHeader.EditButton"
                                    >
                                        {t('Редактировать')}
                                    </Button>
                                }
                                off={
                                    <ButtonDeprecated
                                        theme={ThemeButton.OUTLINE}
                                        onClick={onEdit}
                                        data-testid="EditableProfileCardHeader.EditButton"
                                    >
                                        {t('Редактировать')}
                                    </ButtonDeprecated>
                                }
                            />
                        ) : (
                            <ToggleFeatures
                                feature="isAppRedesigned"
                                on={
                                    <HStack gap="16" justify="between" max>
                                        <Button
                                            colorType="error"
                                            variant="filled"
                                            onClick={onCancelEdit}
                                            data-testid="EditableProfileCardHeader.CancelButton"
                                        >
                                            {t('Отменить')}
                                        </Button>
                                        <Button
                                            colorType="success"
                                            variant="filled"
                                            onClick={onSaveEdit}
                                            data-testid="EditableProfileCardHeader.SaveButton"
                                        >
                                            {t('Сохранить')}
                                        </Button>
                                    </HStack>
                                }
                                off={
                                    <HStack gap="16">
                                        <ButtonDeprecated
                                            theme={ThemeButton.OUTLINE_RED}
                                            onClick={onCancelEdit}
                                            data-testid="EditableProfileCardHeader.CancelButton"
                                        >
                                            {t('Отменить')}
                                        </ButtonDeprecated>
                                        <ButtonDeprecated
                                            theme={ThemeButton.OUTLINE}
                                            onClick={onSaveEdit}
                                            data-testid="EditableProfileCardHeader.SaveButton"
                                        >
                                            {t('Сохранить')}
                                        </ButtonDeprecated>
                                    </HStack>
                                }
                            />
                        )}
                    </>
                )}
            </HStack>
        );
    },
);
