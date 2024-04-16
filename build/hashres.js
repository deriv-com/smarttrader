module.exports = {
  options: {
    encoding: "utf8",
    length: 8,
    algorithm: "md5",
    renameFiles: false,
    fileNameFormat: "${name}.${ext}?${hash}",
  },
  main: {
    src: [
      "dist/css/*.css",
      "dist/js/**/*.js",
      "!dist/js/vendor.min.js",
      "dist/images/**/*.{png,jpg,jpeg,gif,webp,svg}",
    ],
    dest: "dist/**/*.html",
  },
};
