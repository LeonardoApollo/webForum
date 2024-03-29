import { Story } from '@storybook/react';
import { Suspense } from 'react';

import { Loader } from '@/shared/ui/deprecated/Loader';

export const SuspenceDecorator = (StoryComponent: Story) => (
    <Suspense fallback={<Loader />}>
        <StoryComponent />
    </Suspense>
);
