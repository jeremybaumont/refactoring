module.exports = {
    root: true,
    env: {
        node: true,
        es6: true
    },
    extends: [
        'eslint:recommended',
        'plugin:unicorn/recommended'
    ],
    plugins: [
        'unicorn'
    ],
    parserOptions: {
        ecmaVersion: 10
    },
    ignorePatterns: ['build-output/**/*'],
    rules: {
        'prefer-spread': 'error',
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        complexity: ['error', 4],
        'linebreak-style': ['error', 'unix'],
        indent: ['error', 4],
        eqeqeq: ['error', 'always'],
        'func-style': ['error', 'expression'],
        'comma-dangle': ['error', 'never'],
        'quote-props': ['error', 'as-needed'],
        'unicorn/prefer-node-protocol': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/no-null': 'off',
        'unicorn/no-useless-undefined': ['error', {checkArguments: false}],
        'unicorn/consistent-function-scoping': ['error', {checkArrowFunctions: false}]
    },
    overrides: [{
        files: ['**/*.ts'],
        parser: '@typescript-eslint/parser',
        parserOptions: {
            project: ['./tsconfig.eslint.json']
        },
        plugins: [
            '@typescript-eslint'
        ],
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended'
        ],
        rules: {
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/member-delimiter-style': 'error',
            '@typescript-eslint/array-type': 'error',
            '@typescript-eslint/explicit-member-accessibility': 'error',
            '@typescript-eslint/method-signature-style': 'error',
            '@typescript-eslint/no-implicit-any-catch': 'error',
            '@typescript-eslint/no-require-imports': 'error',
            '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
            '@typescript-eslint/no-unnecessary-type-constraint': 'error',
            '@typescript-eslint/no-unsafe-argument': 'error',
            '@typescript-eslint/non-nullable-type-assertion-style': 'error',
            '@typescript-eslint/prefer-for-of': 'error',
            '@typescript-eslint/prefer-includes': 'error',
            '@typescript-eslint/prefer-nullish-coalescing': 'error',
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/prefer-reduce-type-parameter': 'error',
            '@typescript-eslint/prefer-string-starts-ends-with': 'error',
            '@typescript-eslint/strict-boolean-expressions': 'error',
            '@typescript-eslint/switch-exhaustiveness-check': 'error',
            '@typescript-eslint/type-annotation-spacing': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error'
        }
    }]
};
