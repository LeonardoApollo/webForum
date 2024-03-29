import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/libs/classNames/classNames';
import { ToggleFeatures } from '@/shared/libs/features';
import { isMobile } from '@/shared/libs/isMobile/isMobile';
import {
    Button as ButtonDeprecated,
    ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();
    const curLangueage = i18n.language;
    const toggleLang = () => {
        i18n.changeLanguage(/ru/.test(curLangueage) ? 'en' : 'ru');
    };
    const mobile = isMobile();

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Button
                    className={classNames('', {}, [className])}
                    variant="clear"
                    onClick={toggleLang}
                >
                    {t(short ? 'Короткий язык' : 'Язык')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={classNames('', {}, [className])}
                    theme={
                        mobile ? ThemeButton.CLEAR_INVERTED : ThemeButton.CLEAR
                    }
                    onClick={toggleLang}
                >
                    {t(short ? 'Короткий язык' : 'Язык')}
                </ButtonDeprecated>
            }
        />
    );
});
