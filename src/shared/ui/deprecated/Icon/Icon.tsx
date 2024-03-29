import React, { memo } from 'react';

import { classNames } from '@/shared/libs/classNames/classNames';

import cls from './Icon.module.scss';

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
    NoTheme?: boolean;
}

/**
 * Устарел, используем компоненты из папки redesigned
 * @deprecated
 */
export const Icon = memo(
    ({ className, Svg, inverted, NoTheme, ...otherProps }: IconProps) => (
        <Svg
            className={classNames(
                // eslint-disable-next-line
                NoTheme ? '' : inverted ? cls.inverted : cls.Icon,
                {},
                [className],
            )}
            {...otherProps}
        />
    ),
);
