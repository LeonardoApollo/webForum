import { memo, useCallback } from 'react';
import { classNames } from 'shared/libs/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useAppDispatch } from 'shared/hooks/useAppDispatch';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { profileActions } from '../../model/slice/profileSlice';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(({ className }: EditableProfileCardHeaderProps) => {
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
        <HStack max justify="between" className={classNames('', {}, [className])}>
            <Text title={t('Профиль')} />
            {canEdit && (
                // eslint-disable-next-line
                <>
                    {readonly ? (
                        <Button
                            theme={ThemeButton.OUTLINE}
                            onClick={onEdit}
                        >
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <HStack gap="16">
                            <Button
                                theme={ThemeButton.OUTLINE_RED}
                                onClick={onCancelEdit}
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                theme={ThemeButton.OUTLINE}
                                onClick={onSaveEdit}
                            >
                                {t('Сохранить')}
                            </Button>
                        </HStack>
                    )}
                </>
            )}
        </HStack>
    );
});