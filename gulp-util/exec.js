const osExec = require('child_process').exec;

const exec = (command, options = {}) => {
    const environment = { ...process.env, ...options.env };
    return new Promise((resolve, reject) => {
        console.log(`Executing command '${command}'`);
        const childProcess = osExec(command, { maxBuffer: Number.MAX_SAFE_INTEGER, env: environment }, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
    });
};


module.exports = exec;
