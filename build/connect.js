const rewrite     = require('connect-modrewrite');
const serveIndex  = require('serve-index');
const serveStatic = require('serve-static');
const languages   = require('../scripts/common').languages;

module.exports = function (grunt) {
    lang_regex = languages.join('|').toLowerCase();

    return {
        livereload: {
            options: {
                hostname   : '0.0.0.0',
                port       : 8090,
                protocol   : 'https',
                base       : 'dist',
                open       : {
                    appName: {
                        name: 'Google\ Chrome'
                    },
                    target : 'https://localhost:8090',
                },
                middleware: (connect, options) => {
                    const middlewares = [
                        require('connect-livereload')(),
                    ];

                    const rules = [
                        '^/smarttrader/(.*)$ /$1',
                        `^/app/(${lang_regex})/index(\\.html)?/(.*)$ /app/$1/$2 [L]`,
                        `^/app/(${lang_regex})/service-worker\\.js$ - [L]`,
                        `^/app/(${lang_regex})/manifest\\.json$ - [L]`,
                        `^/app/(${lang_regex})/.*$ /app/$1/ [L]`,
                    ];
                    middlewares.push(rewrite(rules));

                    if (!Array.isArray(options.base)) {
                        options.base = [options.base];
                    }

                    options.base.forEach((base) => {
                        middlewares.push(serveStatic(base));
                    });

                    const directory = options.directory || options.base[options.base.length - 1];
                    middlewares.push(serveIndex(directory));

                    middlewares.push((req, res) => {
                        const pathname = req.url.split('?')[0];
                        const pattern = `/(?!${lang_regex})\\w{2,5}/`;
                        if (new RegExp(`^${pattern}\\w+`).test(pathname)) {
                            const en_pathname  = pathname.replace(new RegExp(pattern), '/en/');
                            const en_file_path = `${options.base[0]}${en_pathname}`;
                            if (grunt.file.exists(en_file_path)) {
                                require('fs').createReadStream(en_file_path).pipe(res);
                                return;
                            }
                        }
                        const path_404 = `${options.base[0]}/404.html`;
                        if (grunt.file.exists(path_404)) {
                            require('fs').createReadStream(path_404).pipe(res);
                            return;
                        }
                        res.statusCode(404); // 404.html not found
                        res.end();
                    });

                    return middlewares;
                }
            }
        },
    };
};
