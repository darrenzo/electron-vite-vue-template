process.env.NODE_ENV = 'production';

import { join as pathJoin } from 'path';
import { say } from 'cfonts';
import { deleteAsync } from 'del';
import { build as viteBuild } from 'vite';
import chalk from 'chalk';
import { rollup, OutputOptions } from 'rollup';
import { Listr } from 'listr2';
import rollupOptions from './rollup.config';
import { okayLog, errorLog, doneLog } from './utils/chalkLog';

const mainOpt = rollupOptions(process.env.NODE_ENV);

async function clean() {
    await deleteAsync([
        'dist/electron/main/*',
        'dist/electron/renderer/*',
        'dist/web/*',
        'build/*',
        '!build/icons',
        '!build/lib',
        '!build/lib/electron-build.*',
        '!build/icons/icon.*'
    ]);
    console.log(`\n${doneLog}clear done`);
    if (process.env.BUILD_TARGET === 'onlyClean') process.exit();
}

function greeting() {

    // TODO
    const cols = process.stdout.columns;
    let text = '';

    if (cols > 85) {
        text = 'let\'s-build'
    } else if (cols > 60) {
        text = 'let\'s-|build';
    }

    if (text) {
        say(text, {
            colors: ['yellow'],
            font: 'simple3d',
            space: false
        });
    } else {
        console.log(chalk.yellow.bold('\n  let\'s-build'));
    }

    console.log();
}

async function unionBuild() {

    greeting();

    await clean();

    const tasksLister = new Listr(
        [
            {
                title: 'building main process',
                task: async () => {
                    try {
                        const rollupBuild = await rollup(mainOpt);
                        await rollupBuild.write(mainOpt.output as OutputOptions);
                    } catch (error) {
                        console.error(`\n${error}\n`);
                        console.log(`\n  ${errorLog}failed to build main process`);
                        process.exit(1);
                    }
                }
            },
            {
                title: 'building renderer process',
                task: async (_, tasks) => {
                    try {
                        await viteBuild({ configFile: pathJoin(__dirname, 'vite.config.ts') });
                        tasks.output = `${okayLog}take it away ${chalk.yellow(
                            '`electron-builder`'
                        )}\n`;
                    } catch (error) {
                        console.error(`\n${error}\n`);
                        console.log(`\n  ${errorLog}failed to build renderer process`);
                        process.exit(1);
                    }
                },
                options: { persistentOutput: true }
            }
        ],
        {
            exitOnError: false
        }
    );

    tasksLister.run();
}

unionBuild();
