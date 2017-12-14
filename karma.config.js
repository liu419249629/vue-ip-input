var webpack = require('webpack');
var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
delete baseConfig.entry;
console.log(baseConfig);
baseConfig.entry = './test/index.js';

// add isparta-loader to vue file
var webpackConfig = baseConfig;
webpackConfig.plugins = (baseConfig.plugins || []).concat([
    new webpack.LoaderOptionsPlugin({
        options: {
            vue: {
                loaders: {
                    js: 'isparta-loader'
                }
            }
        }
    })
]);

module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['progress', 'coverage', 'verbose'],
        // this is the entry file for all our tests.
        files: ['./test/index.js'],
        // we will pass the entry file to webpack for bundling.
        preprocessors: {
            './test/index.js': ['webpack']
        },
        coverageReporter: {
            dir: './coverage',
            reporters: [
                {type: 'html'},
                {type: 'text-summary'},
                {type: 'cobertura', subdir: '.'}
            ]
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        singleRun: true
    });
};
