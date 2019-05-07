module.exports = (isDev) => {
    return {
        preserveWhitespace: true,
        extractCss: !isDev,
        cssModules: {
            localIdentName: '[path][name]-[hash:base64:5]',
            camelCase: true
        }
    }
};
