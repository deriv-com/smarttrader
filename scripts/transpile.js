const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const ncp = require('ncp').ncp;
const glob = require('glob');
const fse = require('fs-extra'); 

const colorConsole = (message, type) => {
    const color = '\x1b[37m'; 
    let prefixColor = '\x1b[33m'; 

    if (type === 'error') {
        prefixColor = '\x1b[31m'; 
    }

    console.log(`${prefixColor}Quill UI:\x1b[0m ${color}${message}\x1b[0m`); 
};

const srcDir = path.resolve(__dirname, '../node_modules/@deriv-com/quill-ui');
const destDir = path.resolve(__dirname, '../dist/quill-ui');

const asyncGlob = (pattern) => new Promise((resolve, reject) => {
    glob(pattern, (err, files) => {
        if (err) reject(err);
        else resolve(files);
    });
});

const asyncNcp = (source, destination) => new Promise((resolve, reject) => {
    ncp(source, destination, (err) => {
        if (err) reject(err);
        else resolve();
    });
});

const asyncWriteFile = (file, data) => new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
        if (err) reject(err);
        else resolve();
    });
});

const transpileAndCopyFiles = async (sourceDir, targetDir) => {
    const files = await asyncGlob(`${sourceDir}/**/*.js`);
    const cssFiles = await asyncGlob(`${sourceDir}/**/*.css`);
    let combinedCss = '';

    // Concatenate CSS files into one
    for (const file of cssFiles) {
        const cssContent = await fs.promises.readFile(file, 'utf8');
        combinedCss += cssContent;
    }

    // Ensure the dist/css directory exists in the root directory
    const rootDistCssDir = path.join(__dirname, '..', 'dist', 'css');
    await fse.ensureDir(rootDistCssDir);

    // Write the quill.css file to the dist/css directory
    await asyncWriteFile(path.join(rootDistCssDir, 'quill.css'), combinedCss);

    // Remove the assets folder
    await fse.remove(path.join(targetDir, 'assets'));

    // Transpile JavaScript files and remove CSS imports
    for (const file of files) {
        const content = await fs.promises.readFile(file, 'utf8');
        const result = babel.transformSync(content, {
            presets: [['@babel/preset-env', { modules: 'commonjs' }]],
            plugins: [
                [
                    'babel-plugin-transform-remove-imports',
                    {
                        test: '\\.(css|scss|sass)$',
                    },
                ],
            ],
        });

        const targetFilePath = path.join(targetDir, path.relative(sourceDir, file));
        await fs.promises.mkdir(path.dirname(targetFilePath), { recursive: true });
        await asyncWriteFile(targetFilePath, result.code);
    }
};

const updatePackageJson = async () => {
    try {
        const transpiledPackageJsonPath = path.resolve(destDir, 'package.json');

        // Read the existing package.json
        const packageJsonData = await fs.promises.readFile(transpiledPackageJsonPath, 'utf-8');
        const packageJson = JSON.parse(packageJsonData);

        // Update the necessary fields
        packageJson.type = 'commonjs'; // Change type to commonjs
        packageJson.main = 'dist/main.js'; // Update main field if needed
    
        await fs.promises.writeFile(transpiledPackageJsonPath, JSON.stringify(packageJson, null, 2));
        colorConsole('Package.json updated successfully.', 'normal');
    } catch (err) {
        colorConsole(`Error updating package.json: ${  err}`, 'error');
    }
};

const main = async () => {
    try {
        await fse.emptyDir(destDir); 
        await asyncNcp(srcDir, destDir); 
        await transpileAndCopyFiles(srcDir, destDir); 
        await updatePackageJson(); 

        colorConsole('Transpilation and file copying completed successfully.', 'normal');
    } catch (err) {
        colorConsole(`Error during transpilation and file copying: ${  err}`, 'error');
    }
};

main();
