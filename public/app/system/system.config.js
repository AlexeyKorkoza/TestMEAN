config.$inject = ['cfpLoadingBarProvider', '$httpProvider', 'jwtOptionsProvider'];

function config(cfpLoadingBarProvider, $httpProvider, jwtOptionsProvider) {
    cfpLoadingBarProvider.latencyThreshold = 1000;
    jwtOptionsProvider.config({
        tokenGetter: () => window.token
    });

    $httpProvider.interceptors.push('jwtInterceptor');
}

export default config;