#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * This script finds and optimizes SVG files that don't match the required format.
 * It helps fix the "should be valid svgs" test failures.
 */

const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const ignored_files = [
    'src/images/pages/regulation/map.svg',
];

const findSvgFiles = async () => {
    try {
        // Find all SVG files in the project
        const { stdout } = await exec('find . -name "*.svg" -not -path "*/node_modules/*" -not -path "*/\\.git/*"');
        return stdout.split('\n').filter(filepath => filepath.length);
    } catch (err) {
        console.error('Error finding SVG files:', err.message);
        return [];
    }
};

const optimizeSvg = async (filepath) => {
    try {
        console.log(`Optimizing: ${filepath}`);
        await exec(`npx svgo "${filepath}"`);
        return true;
    } catch (err) {
        console.error(`Failed to optimize ${filepath}:`, err.message);
        return false;
    }
};

const isSvgOptimized = (content) => /(?!\n)(<svg)(.*)(>).*(<\/\s?svg)>/i.test(content);

const main = async () => {
    const files = await findSvgFiles();
    const unoptimized_files = [];

    files.forEach(filepath => {
        // Skip ignored files
        if (ignored_files.some(ignored => filepath.includes(ignored))) {
            return;
        }

        try {
            const stats = fs.statSync(filepath);
            if (stats.isSymbolicLink()) return;

            const content = fs.readFileSync(filepath, 'utf-8');
            if (!isSvgOptimized(content)) {
                unoptimized_files.push(filepath);
            }
        } catch (err) {
            console.error(`Error processing ${filepath}:`, err.message);
        }
    });

    if (unoptimized_files.length === 0) {
        console.log('All SVG files are already optimized!');
        return;
    }

    console.log(`Found ${unoptimized_files.length} unoptimized SVG file(s):`);
    unoptimized_files.forEach(file => console.log(`- ${file}`));

    const answer = await promptYesNo('\nWould you like to optimize these files now? (y/n) ');
    if (answer) {
        console.log('\nOptimizing SVG files...');
        const results = await Promise.all(
            unoptimized_files.map(async file => ({
                file,
                success: await optimizeSvg(file),
            }))
        );

        const success_count = results.filter(r => r.success).length;
        console.log(`\nSuccessfully optimized ${success_count} of ${unoptimized_files.length} file(s).`);
    }
};

const promptYesNo = async (question) => {
    process.stdout.write(question);
    
    return new Promise(resolve => {
        process.stdin.once('data', (data) => {
            const answer = data.toString().trim().toLowerCase();
            resolve(answer === 'y' || answer === 'yes');
        });
    });
};

// Run the script
main().catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
});
