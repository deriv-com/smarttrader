const path   = require('path');
const fs     = require('fs');
const util   = require('util');
const expect = require('chai').expect;
const exec   = util.promisify(require('child_process').exec);
const common = require('../common');

const ignored_files = [
    'src/images/pages/regulation/map.svg',
];

let changed_files = [];

describe('check svg file format', () => {
    const fetchFiles = async (command) => {
        try {
            const { stdout, stderr } = await exec(command);
            if (stderr && !stderr.includes('Not a git repository')) {
                throw new Error(stderr);
            }
            return stdout.split('\n').filter(dir => dir.length);
        } catch (err) {
            // If git command fails, it might be a non-git environment (e.g. CI)
            // Just return an empty array in that case
            if (err.message.includes('Not a git repository')) {
                return [];
            }
            throw err;
        }
    };

    // Increase timeout to 10 seconds to give git operations more time
    it('should be valid svgs', async function() {
        this.timeout(10000); // 10 seconds

        try {
            // Get all changed SVG files using git
            // This might fail if not in a git repo, but we'll handle that
            try {
                await exec('git fetch origin master --depth 1');
                changed_files = [
                    ...await fetchFiles('git diff --name-only -- *.svg'),
                    ...await fetchFiles('git diff HEAD origin/master --name-only -- *.svg'),
                ];
            } catch (err) {
                // If git commands fail, fallback to checking all SVG files
                if (err.message.includes('Not a git repository')) {
                    // Find all SVG files in the project
                    const { stdout } = await exec('find src -name "*.svg" 2>/dev/null');
                    changed_files = stdout.split('\n').filter(dir => dir.length);
                } else {
                    expect.fail(`Error fetching changed files: ${err.message}`);
                }
            }

            // If no files were found through git, find all SVGs in source directory
            if (changed_files.length === 0) {
                const { stdout } = await exec('find src -name "*.svg" 2>/dev/null');
                changed_files = stdout.split('\n').filter(dir => dir.length);
            }

            // Filter files and check each one
            const files_to_check = changed_files.filter(item =>
                !ignored_files.some(ignored => path.resolve(common.root_path, ignored) === item) &&
                fs.existsSync(path.resolve(item))
            );

            if (files_to_check.length === 0) {
                // Skip test if no applicable files found
                this.skip();
                return;
            }

            const unoptimized_files = [];

            files_to_check.forEach(item => {
                const stats = fs.statSync(path.resolve(item));
                if (stats.isSymbolicLink()) return;
                
                const file = fs.readFileSync(path.resolve(item), 'utf-8');
                
                if (!(/(?!\n)(<svg)(.*)(>).*(<\/\s?svg)>/i).test(file)) {
                    unoptimized_files.push(item);
                }
            });

            if (unoptimized_files.length > 0) {
                const file_list = unoptimized_files.map(f => `- ${f}`).join('\n');
                const error_message = `The following SVG files need to be optimized:\n${file_list}\n\nPlease run the following command to optimize these files:\nnode scripts/optimize-svgs.js\n`;
                
                expect.fail(error_message);
            }
        } catch (err) {
            if (err.name !== 'AssertionError') {
                expect.fail(`Unexpected error: ${err.message}`);
            }
            throw err;
        }
    });
});
