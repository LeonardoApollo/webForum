module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
        'prettier',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'ulib-tv-course-plugin',
        'unused-imports',
        'import',
    ],
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/jsx-uses-react': 'off',
        'unused-imports/no-unused-imports': 'error',
        // Настройка отступов и пробелов через ESlint
        // 'react/jsx-indent': [2, 4],
        // 'react/jsx-indent-props': [2, 4],
        // indent: [2, 4],
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', 'jsx', 'tsx'] },
        ],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': ['error', { allowTernary: true }],
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: [
                    'to',
                    'data-testid',
                    'name',
                    'alt',
                    'target',
                    'justify',
                    'align',
                    'direction',
                    'gap',
                    'head',
                    'role',
                    'as',
                    'direction',
                    'border',
                    'size',
                    'feature',
                    'variant',
                    'borderRadius',
                    'wrap',
                    'colorType',
                ],
            },
        ],
        'max-len': ['error', { ignoreComments: true, code: 150 }],
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        // Настрока порядка импортов через ESlint
        // 'import/order': [
        //     'error',
        //     {
        //         pathGroups: [
        //             {
        //                 pattern: '@/**',
        //                 group: 'internal',
        //                 position: 'after',
        //             },
        //             {
        //                 pattern: './**.module.*',
        //                 group: 'internal',
        //                 position: 'after',
        //             },
        //         ],
        //         'newlines-between': 'always',
        //         alphabetize: {
        //             order: 'asc',
        //             caseInsensitive: false,
        //         },
        //     },
        // ],
        'ulib-tv-course-plugin/path-checker': ['error', { alias: '@' }],
        'ulib-tv-course-plugin/public-api-imports': [
            'error',
            {
                alias: '@',
                testFiles: [
                    '**/*.test.*',
                    '**/*.story.*',
                    '**/StoreDecorator.tsx',
                ],
            },
        ],
        'ulib-tv-course-plugin/layer-imports': [
            'error',
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
            },
        ],
        'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};
