module.exports = {
    app: {
        options: {
            inline: ['none'],
        },
        files: [
            {
                src: [
                    `${global.node_modules_paths.quill}/dist/assets/style.css`,
                    `${global.dist}/css/common.css`,
                    `${global.node_modules_paths.binary_style}/binary.css`,
                    `${global.node_modules_paths.binary_style}/binary.css`,
                ],
                dest: `${global.dist}/css/common.min.css`,
            },
            { src: `${global.dist}/css/app.css`,                                dest: `${global.dist}/css/app.min.css` },
            { src: `${global.dist}/css/static.css`,                             dest: `${global.dist}/css/static.min.css` },
        ],
    },
};
