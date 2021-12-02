const exec = require('./gulp-util/exec');
const execSync = require('child_process').execSync;
const gulp = require('gulp');

const runAllTests = () =>
    exec('jest --colors .');

const lintCommits = () => {
    const numberOfCommits = execSync('git rev-list --count HEAD').toString().trim().split(/\r?\n/);
    let numberOfJumpBack = 15;
    if (numberOfCommits < numberOfJumpBack) {
        numberOfJumpBack = numberOfCommits - 1;
    }
    return exec(`commitlint --from=HEAD~${numberOfJumpBack} --verbose`);
};

const lintCode = () =>
    exec('eslint .');

const lintAndFix = () =>
    exec('eslint . --fix');

const createWatchTaskForCommand = (command) => {
    // Ideally we could just use the `--watch` flag in jest without needing gulp
    // however there's currently a problem in ts-jest where types changes are not picked up by the watch loop
    // see https://github.com/kulshekhar/ts-jest/issues/943#issuecomment-952493011
    const hackToGetFunctionWithCommandAsName = { [command]: () => exec(command) }[command];
    return () => gulp.watch(
        ['src/**/*', 'test/**/*', 'spec.openapi.yml'],
        { ignoreInitial: false },
        hackToGetFunctionWithCommandAsName
    );
};
const watchAndRunUnitTests = createWatchTaskForCommand('jest test/unit/');
const watchAndRunE2ETests = createWatchTaskForCommand('jest test/e2e/');
const watchAndRunAllTests = createWatchTaskForCommand('jest test/');

const lintTest = async () =>
    gulp.series(
        gulp.series(lintCommits, lintCode),
        runAllTests
    )();


module.exports = {
    default: lintTest,
    lint: lintAndFix,
    'watch-unit': watchAndRunUnitTests,
    'watch-e2e': watchAndRunE2ETests,
    'watch-all': watchAndRunAllTests,
    'lint-commits': lintCommits
};
