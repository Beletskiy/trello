module.exports = function (config) {
    config.set({

        //basePath : '../',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/lodash/dist/lodash.js',
            'app/bower_components/ng-sortable/dist/*.js',
            'app/js/*.js',
            'app/js/components/*.js',
            'app/js/factories/*.js',
            'app/js/directives/*.js',
            'test/unit/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};