module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'header-max-length': [1, 'always', 120],
        'subject-case': [0]
    }
};

